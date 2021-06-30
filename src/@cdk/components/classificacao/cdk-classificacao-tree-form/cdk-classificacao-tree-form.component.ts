import {FlatTreeControl} from '@angular/cdk/tree';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
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
import {CdkClassificacaoTreeFormService, ClassificacaoNode} from './services/cdk-classificacao-tree-form.service';
import {SelectionModel} from '@angular/cdk/collections';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Classificacao, ModalidadeDestinacao, Pagination} from '../../../models';
import {ClassificacaoService} from '../../../services/classificacao.service';
import {cdkAnimations} from '../../../animations';

export class FlatNode {
    expandable: boolean;
    nome: string;
    codigo: string;
    id: number;
    level: number;
    children?: ClassificacaoNode[];
    selected?: boolean;
    visible = true;
    hasChild: boolean;
    item: string;

    constructor(
        public isLoading = false
    ) {
    }
}

@Component({
    selector: 'cdk-classificacao-tree-form',
    templateUrl: './cdk-classificacao-tree-form.component.html',
    styleUrls: ['./cdk-classificacao-tree-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkClassificacaoTreeFormComponent implements OnInit {

    @Input()
    classificacao: Classificacao[];

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<any>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    classificacaoPagination: Pagination;

    @Input()
    logEntryPagination: Pagination;

    @Input()
    modalidadeDestinacaoPagination: Pagination;

    @Input()
    flatNodeMap = new Map<FlatNode, ClassificacaoNode>();
    nestedNodeMap = new Map<ClassificacaoNode, FlatNode>();
    treeControl: FlatTreeControl<FlatNode>;
    treeFlattener: MatTreeFlattener<ClassificacaoNode, FlatNode>;
    dataSource: MatTreeFlatDataSource<ClassificacaoNode, FlatNode>;
    checklistSelection = new SelectionModel<FlatNode>(true /* multiple */);

    dataTree = [];

    @ViewChildren(MatTreeNode, {read: ElementRef}) treeNodes: ElementRef[];

    loading: boolean;
    pesquisando: boolean;
    formPesquisa: FormControl;

    @Input()
    formClassificacao: FormGroup;

    activeCard = 'form';

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
        private _changeDetectorRef: ChangeDetectorRef,
        private _serviceTree: CdkClassificacaoTreeFormService,
        private _classificacaoService: ClassificacaoService,
        private _formBuilder: FormBuilder,
    ) {
        this.loadForms();

        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
            this.isExpandable, this.getChildren);
        this.treeControl = new FlatTreeControl<FlatNode>(this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
        this.initTree();
        _serviceTree.dataChange.subscribe((data) => {
            this.dataSource.data = data;
        });
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
        this.formClassificacao = this._formBuilder.group({
            id: [null],
            codigo: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            modalidadeDestinacao: [null, [Validators.required]],
            parent: [null],
            ativo: [null],
            permissaoUso: [null],
            prazoGuardaFaseCorrenteDia: [null],
            prazoGuardaFaseCorrenteMes: [null],
            prazoGuardaFaseCorrenteAno: [null],
            prazoGuardaFaseCorrenteEvento: [null],
            prazoGuardaFaseIntermediariaDia: [null],
            prazoGuardaFaseIntermediariaMes: [null],
            prazoGuardaFaseIntermediariaAno: [null],
            prazoGuardaFaseIntermediariaEvento: [null],
            observacao: [null, [Validators.maxLength(255)]]
        });
        this.modalidadeDestinacaoPagination = new Pagination();
        this.classificacaoPagination = new Pagination();
    }

    getLevel = (node: FlatNode) => node.level;
    isExpandable = (node: FlatNode) => node.expandable;
    getChildren = (node: ClassificacaoNode): ClassificacaoNode[] => node.children;
    hasChild = (_: number, nodeData: FlatNode) => nodeData.hasChild == true;
    hasNoContent = (_: string, _nodeData: FlatNode) => _nodeData.nome === '';

    transformer = (node: ClassificacaoNode, level: number) => {
        const existingNode = this.nestedNodeMap.get(node);
        const flatNode = existingNode && existingNode.nome === node.nome
            ? existingNode
            : new FlatNode();
        flatNode.nome = node.nome;
        flatNode.codigo = node.codigo;
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
        const classificacoesChild = this.getClassificacao('eq:' + node.id);
        classificacoesChild.subscribe((classificacoes) => {
            const data = this.montarArrayClassificacao(classificacoes);
            this._serviceTree.insertChilds(parentNode, data);
            this.treeControl.expand(node);
            node.isLoading = false;
        });
    }

    /** Select the category so we can insert the new item. */
    addNewItem(node: FlatNode) {
        node.isLoading = true;
        const parentNode = this.flatNodeMap.get(node);

        const classificacoesChild = this.getClassificacao('eq:' + node.id);
        classificacoesChild.subscribe((classificacoes) => {
            const data = this.montarArrayClassificacao(classificacoes);
            this._serviceTree.insertItem(parentNode, data, true);
            this.treeControl.expand(node);
            node.isLoading = false;
        });

        const parentClassificacao = new Classificacao();

        parentClassificacao.id = node.id;
        this.formClassificacao.get('parent').setValue(parentClassificacao);

        this.treeControl.expand(node);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    submit(node: FlatNode): void {
        const nestedNode = this.flatNodeMap.get(node);
        this._serviceTree.updateItem(nestedNode!, this.formClassificacao.value);

        if (this.formClassificacao.valid) {
            this.save.emit(this.formClassificacao.value);
            this.formClassificacao.reset();
            this.openChild(node);
        }
    }

    /**
     * Inicializar o tree de classificação com todos as classificações pai.
     */
    initTree(): void {
        const classificacaoPai = this.getClassificacao('isNull');
        classificacaoPai.subscribe((classificacoes) => {
            const data = this.montarArrayClassificacao(classificacoes);
            this._serviceTree.initialize(data);
        });
    }

    montarArrayClassificacao(classificacoes): any {
        const arrayAssuntosAdministrativos = [];
        classificacoes.entities.forEach((value, indexItem) => {
            const classificacaoItem = new ClassificacaoNode();
            classificacaoItem.id = value.id;
            classificacaoItem.nome = value.nome;
            classificacaoItem.codigo = value.codigo;
            classificacaoItem.children = [];
            classificacaoItem.hasChild = value.hasChild;
            arrayAssuntosAdministrativos.push(classificacaoItem);
        });
        return arrayAssuntosAdministrativos;
    }

    getClassificacao(parent): Observable<any> {
        this.loading = true;
        const params = {
            filter: {
                'parent.id': parent,
            },
            sort: {
                codigo: 'ASC'
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
            finalize(() => {
                this.loading = false;
                this._changeDetectorRef.detectChanges();
            }),
            catchError(() => of([]))
        );

    }


    setInputClassificacao(node: FlatNode): void {

        this.formClassificacao.get('classificacao').setValue(node.id);
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
        if (filter && filter.length >= 2) {
            this.loading = true;
            this.filterByName(filter);
        } else {
            this.clearFilter();
        }
    }

    private filterByName(term: string): void {      
        const classificacaoPai = this.getClassificacaoNameLike(term);
        classificacaoPai.subscribe((classificacoes) => {
            const data = this.montarArrayClassificacao(classificacoes);
            this._serviceTree.initialize(data);
        });
    }

    private clearFilter(): void {
        this.treeControl.dataNodes.forEach(x => x.visible = true);
        this.initTree();
    }


    doAbort(node): void {
        this.treeControl.collapseAll();
    }

    showLogEntryGrid(target: string): void {
        const campo = {target: target};
        Object.assign(this.logEntryPagination.filter, campo);
        this.activeCard = 'logentry-gridsearch';
    }

    checkModalidadeDestinacao(): void {
        const value = this.formClassificacao.get('modalidadeDestinacao').value;
        if (!value || typeof value !== 'object') {
            this.formClassificacao.get('modalidadeDestinacao').setValue(null);
        }
    }


    checkClassificacao(): void {
        const value = this.formClassificacao.get('classificacao').value;
        if (!value || typeof value !== 'object') {
            this.formClassificacao.get('classificacao').setValue(null);
        }
    }

    selectModalidadeDestinacao(modalidadeDestinacao: ModalidadeDestinacao): void {
        if (modalidadeDestinacao) {
            this.formClassificacao.get('modalidadeDestinacao').setValue(modalidadeDestinacao);
        }
        this.activeCard = 'form';
    }

    showModalidadeDestinacaoGrid(): void {
        this.activeCard = 'modalidade-destinacao-gridsearch';
    }

    selectClassificacao(classificacao: Classificacao): void {
        if (classificacao) {
            this.formClassificacao.get('parent').setValue(classificacao);
        }
        this.activeCard = 'form';
    }

    showClassificacaoGrid(): void {
        this.activeCard = 'classificacao-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    getClassificacaoNameLike(name): Observable<any> {
        const params = {
            filter: {
                'nome': 'like:%' + name +'%',
            },
            sort: {
                codigo: 'ASC'
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
            finalize(() => {
                this.loading = false;
                this._changeDetectorRef.detectChanges();
            }),
            catchError(() => of([]))
        );
    }
}
