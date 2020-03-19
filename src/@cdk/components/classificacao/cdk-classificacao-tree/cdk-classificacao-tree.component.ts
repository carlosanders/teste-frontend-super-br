import {FlatTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {ClassificacaoService} from '../../../services/classificacao.service';
import {catchError, finalize} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {CdkClassificacaoTreeService, ClassificacaoNode} from './services/cdk-classificacao-tree.service';
import {SelectionModel} from '@angular/cdk/collections';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import validate = WebAssembly.validate;


/** Flat node with expandable and level information */
export class FlatNode {
    expandable: boolean;
    name: string;
    id: number;
    level: number;
    children?: ClassificacaoNode[];

    constructor(public isLoading = false) {
    }
}

@Component({
    selector: 'cdk-classificacao-tree',
    templateUrl: './cdk-classificacao-tree.component.html',
    styleUrls: ['./cdk-classificacao-tree.component.scss']
})
export class CdkClassificacaoTreeComponent {

    flatNodeMap = new Map<FlatNode, ClassificacaoNode>();

    /** Map from nested node to flattened node. This helps us to keep the same object for selection */
    nestedNodeMap = new Map<ClassificacaoNode, FlatNode>();
    loading: boolean;
    /** A selected parent node to be inserted */
    selectedParent: FlatNode | null = null;

    /** The new item's name */
    newItemName = '';

    treeControl: FlatTreeControl<FlatNode>;

    treeFlattener: MatTreeFlattener<ClassificacaoNode, FlatNode>;

    dataSource: MatTreeFlatDataSource<ClassificacaoNode, FlatNode>;

    saving: boolean;

    activeCard: string;

    formPesquisa: FormGroup;
    private formClassificacao: FormGroup;
    pesquisando: boolean;


    /** The selection for checklist */
    checklistSelection = new SelectionModel<FlatNode>(true /* multiple */);

    constructor(
        private _serviceTree: CdkClassificacaoTreeService,
        private _classificacaoService: ClassificacaoService,
        private _formBuilder: FormBuilder
    ) {
        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
            this.isExpandable, this.getChildren);
        this.treeControl = new FlatTreeControl<FlatNode>(this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

        this.initTree();

        _serviceTree.dataChange.subscribe(data => {
            this.dataSource.data = data;
        });
        this.activeCard = 'form';
        this.loadForms();
    }

    loadForms(): void {
        this.formClassificacao = this._formBuilder.group({
            classificacao: [null, Validators.required],
        });

        this.formPesquisa = this._formBuilder.group({
            pesquisa: ['', Validators.required]
        });
    }

    getLevel = (node: FlatNode) => node.level;

    isExpandable = (node: FlatNode) => node.expandable;

    getChildren = (node: ClassificacaoNode): ClassificacaoNode[] => node.children;

    hasChild = (_: number, nodeData: FlatNode) => nodeData.children.length >= 0;

    hasNoContent = (_: number, _nodeData: FlatNode) => _nodeData.name === '';

    /**
     * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
     */
    transformer = (node: ClassificacaoNode, level: number) => {
        const existingNode = this.nestedNodeMap.get(node);
        const flatNode = existingNode && existingNode.name === node.name
            ? existingNode
            : new FlatNode();
        flatNode.name = node.name;
        flatNode.id = node.id;
        flatNode.children = node.children;
        flatNode.level = level;
        flatNode.expandable = !!node.children;
        this.flatNodeMap.set(flatNode, node);
        this.nestedNodeMap.set(node, flatNode);
        return flatNode;
    }

    /** Whether all the descendants of the node are selected. */
    descendantsAllSelected(node: FlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
        return descAllSelected;
    }

    /** Whether part of the descendants are selected */
    descendantsPartiallySelected(node: FlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const result = descendants.some(child => this.checklistSelection.isSelected(child));
        return result && !this.descendantsAllSelected(node);
    }

    /** Toggle the to-do item selection. Select/deselect all the descendants node */
    todoItemSelectionToggle(node: FlatNode): void {
        this.checklistSelection.toggle(node);
        const descendants = this.treeControl.getDescendants(node);
        this.checklistSelection.isSelected(node)
            ? this.checklistSelection.select(...descendants)
            : this.checklistSelection.deselect(...descendants);

        // Force update for the parent
        descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
        this.checkAllParentsSelection(node);
    }

    /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
    todoLeafItemSelectionToggle(node: FlatNode): void {
        this.checklistSelection.toggle(node);
        this.checkAllParentsSelection(node);
    }

    /* Checks all the parents when a leaf node is selected/unselected */
    checkAllParentsSelection(node: FlatNode): void {
        let parent: FlatNode | null = this.getParentNode(node);
        while (parent) {
            this.checkRootNodeSelection(parent);
            parent = this.getParentNode(parent);
        }
    }

    /** Check root node checked state and change it accordingly */
    checkRootNodeSelection(node: FlatNode): void {
        const nodeSelected = this.checklistSelection.isSelected(node);
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
        if (nodeSelected && !descAllSelected) {
            this.checklistSelection.deselect(node);
        } else if (!nodeSelected && descAllSelected) {
            this.checklistSelection.select(node);
        }
    }

    /* Get the parent node of a node */
    getParentNode(node: FlatNode): FlatNode | null {
        const currentLevel = this.getLevel(node);

        if (currentLevel < 1) {
            return null;
        }

        const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

        for (let i = startIndex; i >= 0; i--) {
            const currentNode = this.treeControl.dataNodes[i];

            if (this.getLevel(currentNode) < currentLevel) {
                return currentNode;
            }
        }
        return null;
    }

    /** Select the category so we can insert the new item. */
    addNewItem(node: FlatNode): void {
        node.isLoading = true;
        const parentNode = this.flatNodeMap.get(node);
        const classificacoesChild = this.getClassificacao('eq:' + node.id);
        classificacoesChild.subscribe((classificacoes) => {
            const data = this.montarArrayClassificacao(classificacoes);
            this._serviceTree.insertItem(parentNode, data);
            this.treeControl.expand(node);
            node.isLoading = false;
        });
    }

    /**
     * Inicializar o tree de classificação com todos as classificações pai.
     */
    initTree(): void {
        const classificacaoPai = this.getClassificacao('isNull');
        classificacaoPai.subscribe(classificacoes => {
            const data = this.montarArrayClassificacao(classificacoes);
            this._serviceTree.initialize(data);
        });
    }


    montarArrayClassificacao(classificacoes): any {
        const arrayClassificoes = [];
        classificacoes.entities.forEach((value, indexItem) => {
            const classificacaoItem = new ClassificacaoNode();
            classificacaoItem.id = value.id;
            classificacaoItem.name = value.nome;
            classificacaoItem.children = [];
            arrayClassificoes.push(classificacaoItem);
        });
        return arrayClassificoes;
    }

    /** Save the node to database */
    saveNode(node: FlatNode, itemValue: string): void {
        const nestedNode = this.flatNodeMap.get(node);
        // this._database.updateItem(nestedNode!, itemValue);
    }

    getClassificacao(parent): Observable<any> {

        this.loading = true;

        const params = {
            filter: {
                parent: parent
            },
            sort: {
                nome: 'ASC'
            },
            limit: 1000,
            offset: 0,
            populate: [
                'populateAll'
            ]
        };

        return this._classificacaoService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate)
        ).pipe(
            finalize(() => this.loading = false),
            catchError(() => of([]))
        );

    }

    submit(): void {

    }

    pesquisa() {

    }
}
