import {FlatTreeControl} from '@angular/cdk/tree';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNode} from '@angular/material/tree';
import {catchError, finalize} from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';
import {
    AssuntoAdministrativoNode,
    CdkAssuntoAdministrativoTreeService
} from './services/cdk-assunto-administrativo-tree.service';
import {SelectionModel} from '@angular/cdk/collections';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AssuntoAdministrativo, Pagination} from '../../../models';
import {AssuntoAdministrativoService} from '../../../services/assunto-administrativo.service';
import {cdkAnimations} from '../../../animations';

export class FlatNode {
    expandable: boolean;
    nome: string;
    id: number;
    level: number;
    children?: AssuntoAdministrativoNode[];
    selected?: boolean;
    visible?: boolean;
    hasChild: boolean;
    item: string;

    constructor(
        public isLoading = false
    ) {
    }
}

@Component({
    selector: 'cdk-assunto-administrativo-tree',
    templateUrl: './cdk-assunto-administrativo-tree.component.html',
    styleUrls: ['./cdk-assunto-administrativo-tree.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkAssuntoAdministrativoTreeComponent implements OnInit {

    @Input()
    assuntoAdministrativo: AssuntoAdministrativo;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<any>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    assuntoAdministrativoPagination: Pagination;

    @Input()
    flatNodeMap = new Map<FlatNode, AssuntoAdministrativoNode>();
    nestedNodeMap = new Map<AssuntoAdministrativoNode, FlatNode>();
    treeControl: FlatTreeControl<FlatNode>;
    treeFlattener: MatTreeFlattener<AssuntoAdministrativoNode, FlatNode>;
    dataSource: MatTreeFlatDataSource<AssuntoAdministrativoNode, FlatNode>;
    checklistSelection = new SelectionModel<FlatNode>(true /* multiple */);

    @ViewChildren(MatTreeNode, {read: ElementRef}) treeNodes: ElementRef[];

    loading: boolean;
    pesquisando: boolean;
    activeCard: string;
    formPesquisa: FormGroup;
    formAssuntoAdministrativo: FormGroup;

    classSelect: string;
    searchFilter: Subject<string> = new Subject<string>();

    innerWidth: any;
    mobileMode: boolean;
    tamanhoIdentacao = 40;
    tamanhoIdentacaoForm = 40;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.verificarModoMobile();
    }

    constructor(
        private _serviceTree: CdkAssuntoAdministrativoTreeService,
        private _assuntoAdministrativoService: AssuntoAdministrativoService,
        private _formBuilder: FormBuilder,
    ) {
        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
            this.isExpandable, this.getChildren);
        this.treeControl = new FlatTreeControl<FlatNode>(this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
        this.initTree();
        _serviceTree.dataChange.subscribe((data) => {
            this.dataSource.data = data;
        });
        this.loadForms();

    }

    ngOnInit(): void {
        this.verificarModoMobile();
    }

    verificarModoMobile() {
        this.innerWidth = window.innerWidth;
        this.mobileMode = innerWidth <= 600;
        if(this.mobileMode) {
            this.tamanhoIdentacao = 15;
            this.tamanhoIdentacaoForm = 0;
        }
        else {
            this.tamanhoIdentacao = 40;
            this.tamanhoIdentacaoForm = 40;
        }
    }

    loadForms(): void {
        this.formAssuntoAdministrativo = this._formBuilder.group({
            id: [null],
            nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
            parent: [null],
            dispositivoLegal: [null, [Validators.maxLength(255)]],
            codigoCNJ: [null, [Validators.minLength(3), Validators.maxLength(25)]],
            glossario: [null, [Validators.maxLength(255)]],
            ativo: [null],
        });
        this.formPesquisa = this._formBuilder.group({
            pesquisa: ['', Validators.required]
        });
    }

    getLevel = (node: FlatNode) => node.level;
    isExpandable = (node: FlatNode) => node.expandable;
    getChildren = (node: AssuntoAdministrativoNode): AssuntoAdministrativoNode[] => node.children;
    hasChild = (_: number, nodeData: FlatNode) => nodeData.hasChild == true;
    hasNoContent = (_: string, _nodeData: FlatNode) => _nodeData.nome === '';

    transformer = (node: AssuntoAdministrativoNode, level: number) => {
        const existingNode = this.nestedNodeMap.get(node);
        const flatNode = existingNode && existingNode.nome === node.nome
            ? existingNode
            : new FlatNode();
        flatNode.nome = node.nome;
        flatNode.id = node.id;
        flatNode.children = node.children;
        flatNode.level = level;
        flatNode.expandable = !!node.children;
        flatNode.hasChild = node.hasChild;
        flatNode.item = node.item;
        this.flatNodeMap.set(flatNode, node);
        this.nestedNodeMap.set(node, flatNode);
        return flatNode;
    };

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

    openChild(node: FlatNode): void {
        node.isLoading = true;
        const parentNode = this.flatNodeMap.get(node);
        const assuntosAdministrativosChild = this.getAssuntoAdministrativo('eq:' + node.id);
        assuntosAdministrativosChild.subscribe((assuntosAdministrativos) => {
            const data = this.montarArrayAssuntoAdministrativo(assuntosAdministrativos);
            this._serviceTree.insertChilds(parentNode, data);
            this.treeControl.expand(node);
            node.isLoading = false;
        });
    }

    /** Select the category so we can insert the new item. */
    addNewItem(node: FlatNode) {
        node.isLoading = true;
        const parentNode = this.flatNodeMap.get(node);

        const assuntosAdministrativosChild = this.getAssuntoAdministrativo('eq:' + node.id);
        assuntosAdministrativosChild.subscribe((assuntosAdministrativos) => {
            const data = this.montarArrayAssuntoAdministrativo(assuntosAdministrativos);
            this._serviceTree.insertItem(parentNode, data, true);
            this.treeControl.expand(node);
            node.isLoading = false;
        });

        const parentAssuntoAdministrativo = new AssuntoAdministrativo();

        parentAssuntoAdministrativo.id = node.id;
        this.formAssuntoAdministrativo.get('parent').setValue(parentAssuntoAdministrativo);

        this.treeControl.expand(node);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    submit(node: FlatNode): void {
        const nestedNode = this.flatNodeMap.get(node);
        this._serviceTree.updateItem(nestedNode!, this.formAssuntoAdministrativo.value);

        if (this.formAssuntoAdministrativo.valid) {
            this.save.emit(this.formAssuntoAdministrativo.value);
            this.formAssuntoAdministrativo.reset();
            this.openChild(node);
        }
    }


    /**
     * Inicializar o tree de classificação com todos as classificações pai.
     */
    initTree(): void {
        const assuntoAdministrativoPai = this.getAssuntoAdministrativo('isNull');
        assuntoAdministrativoPai.subscribe((assuntosAdministrativos) => {
            const data = this.montarArrayAssuntoAdministrativo(assuntosAdministrativos);
            this._serviceTree.initialize(data);
        });
    }

    montarArrayAssuntoAdministrativo(assuntosAdministrativos): any {
        const arrayAssuntosAdministrativos = [];
        assuntosAdministrativos.entities.forEach((value, indexItem) => {
            const assuntoAdministrativoItem = new AssuntoAdministrativoNode();
            assuntoAdministrativoItem.id = value.id;
            assuntoAdministrativoItem.nome = value.nome;
            assuntoAdministrativoItem.children = [];
            assuntoAdministrativoItem.hasChild = value.hasChild;
            arrayAssuntosAdministrativos.push(assuntoAdministrativoItem);
        });
        return arrayAssuntosAdministrativos;
    }

    getAssuntoAdministrativo(parent): Observable<any> {
        this.loading = true;
        const params = {
            filter: {
                'parent.id': parent,
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

        return this._assuntoAdministrativoService.query(
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


    pesquisa(filterText: any): void {

    }

    setInputAssuntoAdministrativo(node: FlatNode): void {

        this.formAssuntoAdministrativo.get('assuntoAdministrativo').setValue(node.id);
        this.classSelect = 'selectedItem';
        this.nestedNodeMap.forEach((value) => {
            value.selected = false;
        });
        node.selected = !node.selected;
    }

    getNodeSelected(node: FlatNode): string {
        if (node.selected) {
            return 'selectedItem';
        }
        if (node.visible == false) {
            return 'display-none';
        }
        return '';
    }

    filterChanged(filter: string): void {
        if (filter && filter.length >= 3) {
            this.filterByName(filter);
        } else {
            this.clearFilter();
        }
    }

    private filterByName(term: string): void {
        const filteredItems = this.treeControl.dataNodes.filter(
            x => x.nome.toLowerCase().indexOf(term.toLowerCase()) === -1
        );
        filteredItems.map((x) => {
            x.visible = false;
        });

        const visibleItems = this.treeControl.dataNodes.filter(
            x => x.children &&
                x.nome.toLowerCase().indexOf(term.toLowerCase()) > -1
        );
        visibleItems.map((x) => {
            x.visible = true;
            this.getChildren(x);
        });
    }

    private clearFilter(): void {
        this.treeControl.dataNodes.forEach(x => x.visible = true);
    }

    doAbort(node): void {
        this.treeControl.collapseAll();
    }
}
