import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChildren} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNode} from '@angular/material/tree';
import {ClassificacaoService} from '../../../services/classificacao.service';
import {catchError, finalize} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {CdkClassificacaoTreeService, ClassificacaoNode} from './services/cdk-classificacao-tree.service';
import {SelectionModel} from '@angular/cdk/collections';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Processo} from '../../../models';

export class FlatNode {
    expandable: boolean;
    name: string;
    id: number;
    level: number;
    children?: ClassificacaoNode[];
    selected?: boolean;

    constructor(
        public isLoading = false
    ) {
    }
}

@Component({
    selector: 'cdk-classificacao-tree',
    templateUrl: './cdk-classificacao-tree.component.html',
    styleUrls: ['./cdk-classificacao-tree.component.scss']
})
export class CdkClassificacaoTreeComponent {

    @Input()
    processoId: number;

    flatNodeMap = new Map<FlatNode, ClassificacaoNode>();
    nestedNodeMap = new Map<ClassificacaoNode, FlatNode>();
    treeControl: FlatTreeControl<FlatNode>;
    treeFlattener: MatTreeFlattener<ClassificacaoNode, FlatNode>;
    dataSource: MatTreeFlatDataSource<ClassificacaoNode, FlatNode>;
    checklistSelection = new SelectionModel<FlatNode>(true /* multiple */);

    @ViewChildren(MatTreeNode, {read: ElementRef}) treeNodes: ElementRef[];


    @Input()
    saving: boolean;

    /**
     * Outputs
     */
    @Output()
    save = new EventEmitter<Processo>();
    loading: boolean;
    pesquisando: boolean;
    activeCard: string;
    formPesquisa: FormGroup;
    formClassificacao: FormGroup;

    classSelect: string;

    constructor(
        private _serviceTree: CdkClassificacaoTreeService,
        private _classificacaoService: ClassificacaoService,
        private _formBuilder: FormBuilder,
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
            processo: [null]
        });
        this.formPesquisa = this._formBuilder.group({
            pesquisa: ['', Validators.required]
        });
    }

    getLevel = (node: FlatNode) => node.level;
    isExpandable = (node: FlatNode) => node.expandable;
    getChildren = (node: ClassificacaoNode): ClassificacaoNode[] => node.children;
    hasChild = (_: number, nodeData: FlatNode) => nodeData.children.length >= 0;

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

    /**
     *
     * Configuraçoes do checkbox
     */
    descendantsAllSelected(node: FlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
        return descAllSelected;
    }

    descendantsPartiallySelected(node: FlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const result = descendants.some(child => this.checklistSelection.isSelected(child));
        return result && !this.descendantsAllSelected(node);
    }

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

    todoLeafItemSelectionToggle(node: FlatNode): void {
        this.checklistSelection.toggle(node);
        this.checkAllParentsSelection(node);
    }

    checkAllParentsSelection(node: FlatNode): void {
        let parent: FlatNode | null = this.getParentNode(node);
        while (parent) {
            this.checkRootNodeSelection(parent);
            parent = this.getParentNode(parent);
        }
    }

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

    getClassificacao(parent): Observable<any> {
        this.loading = true;
        const params = {
            filter: {
                parent: parent,
                permissaoUso: 'eq:1'
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

    setProcesso(): void {
        const processoId = parseInt(String(this.processoId), 10);
        const processo = new Processo();
        processo.id = processoId;
        processo.classificacao = this.formClassificacao.value.classificacao;

        this.formClassificacao.get('processo').setValue(processo);
    }

    submit(): void {
        if (this.formClassificacao.valid) {
            this.setProcesso();
            this.save.emit(this.formClassificacao.value);
        }
    }

    pesquisa(): void {

    }

    setInputClassificacao(node: FlatNode): void {

        this.formClassificacao.get('classificacao').setValue(node.id);
        this.classSelect = 'selectedItem';
        this.nestedNodeMap.forEach(value => {
            value.selected = false;
        });
        node.selected = !node.selected;
    }

    getNodeSelected(node: FlatNode): string {
        if (node.selected) {
            return 'selectedItem';
        }
        return '';
    }

}
