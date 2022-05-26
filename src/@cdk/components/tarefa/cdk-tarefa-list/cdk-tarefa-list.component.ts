import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ComponentRef,
    EventEmitter, HostBinding,
    Input,
    OnChanges,
    OnInit,
    Output, QueryList, Renderer2,
    SimpleChange,
    ViewChild, ViewChildren,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {Tarefa} from '@cdk/models/tarefa.model';
import {DynamicService} from '../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../modules/modules-config';
import {CdkTarefaListService, ViewMode} from './cdk-tarefa-list.service';
import {Documento, Etiqueta, Pagination, Usuario, VinculacaoEtiqueta} from '../../../models';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {DndDragImageOffsetFunction} from 'ngx-drag-drop';
import {SearchBarEtiquetasFiltro} from '../../search-bar-etiquetas/search-bar-etiquetas-filtro';
import {CdkTarefaListItemComponent} from './cdk-tarefa-list-item/cdk-tarefa-list-item.component';
import * as moment from 'moment';
import {LoginService} from 'app/main/auth/login/login.service';
import {
    CdkComponenteDigitalCardListComponent
} from '../../componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.component';
import {MatMenuTrigger} from '@angular/material/menu';
import {TarefaDataSource} from '@cdk/data-sources/tarefa-data-source';
import {MatPaginator, MatSort} from '@cdk/angular/material';
import {CdkUtils} from '@cdk/utils';
import {MatSortable} from '@angular/material/sort';
import {CdkTarefaListGridColumn} from './plugins/cdk-tarefa-list-grid-column';
import {CdkTableGridComponent} from '../../table-definitions/cdk-table-grid.component';
import {TableDefinitionsService} from '../../table-definitions/table-definitions.service';
import {CdkTarefaListColumns} from './cdk-tarefa-list.columns';
import * as _ from 'lodash';

@Component({
    selector: 'cdk-tarefa-list',
    templateUrl: './cdk-tarefa-list.component.html',
    styleUrls: ['./cdk-tarefa-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'dragTarefaList'
})
export class CdkTarefaListComponent extends CdkTableGridComponent implements OnInit, AfterViewInit, OnChanges {

    @ViewChildren('tarefaListItems', {read: CdkTarefaListItemComponent}) tarefaListItems: QueryList<CdkTarefaListItemComponent>;
    @ViewChildren('cdkUpload', {read: CdkComponenteDigitalCardListComponent}) componenteDigitalListItems: QueryList<CdkComponenteDigitalCardListComponent>;
    @ViewChildren(MatMenuTrigger, {read: MatMenuTrigger}) matMenuTriggersList: QueryList<MatMenuTrigger>;
    @ViewChild(MatPaginator, {static: false}) set _paginator(paginator: MatPaginator) {
        if (paginator) {
            if (!this.paginator) {
                this.paginator = paginator;
                this.paginator.pageSize = this.pageSize;
                this.paginator.page
                    .pipe(
                        tap(() => this.loadPage(
                            {
                                limit: this.paginator.pageSize,
                                offset: (this.paginator.pageSize * this.paginator.pageIndex)
                            }
                        ))
                    ).subscribe();
            }
            this.paginator.length = this.pagination.total;
            this.paginator.pageSize = this.pagination.limit;
            this.paginator.pageIndex = this.pagination.offset / this.pagination.limit
        } else {
            this.paginator = paginator;
        }
        this._changeDetectorRef.detectChanges();
    };

    @ViewChild(MatSort, {static: false}) set _sort(sort: MatSort) {
        if (sort && !this.sort) {
            this.sort = sort;
            if (this.sortOrder) {
                this.sort.sort(<MatSortable> {id: this.sortField, start: this.sortOrder.toLowerCase(), disableClear: false});
            } else {
                this.sort.active = null;
            }

            // reset the paginator after sorting
            this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
            this.sort.sortChange
                .pipe(
                tap(() => this.doSort(
                    this.sort.active ? {[this.sort.active]: this.sort.direction} : {},
                    this.paginator ? {
                        limit: this.paginator.pageSize,
                        offset: (this.paginator.pageSize * this.paginator.pageIndex)
                    } : {}
                ))
            ).subscribe();
        } else {
            this.sort = sort;
        }
    };

    @ViewChildren('tdTarefaContainer', {read: ViewContainerRef}) set _dynamicComponent(list: QueryList<ViewContainerRef>) {
        list.forEach((viewContainerRef: ViewContainerRef) => {
            const td = this._render.parentNode(viewContainerRef.element.nativeElement);
            if (td) {
                const columns = this.dynamicColumnInstancesList.filter((col) => col.getMatColumnDef() == td.getAttribute('column-ref') && col.tarefa.id == td.getAttribute('tarefa-id'));
                columns.forEach((column) => {
                    viewContainerRef.createEmbeddedView(column.tdTemplateRef());
                });
            }
        });
    }

    @Input()
    loading: boolean;

    @Input()
    togglingUrgenteIds: number[] = [];

    @Input()
    assinandoTarefasIds: number[] = [];

    @Input()
    savingComponentesDigitaisIds: number[] = [];

    @Input()
    savingVinculacaoEtiquetaId: number;

    @Input()
    arraySearchTypes: SearchBarEtiquetasFiltro[] = [];

    @Input()
    vinculacaoEtiquetaPagination: Pagination;

    @Input()
    tarefas: Tarefa[] = [];

    @Input()
    usuarioAtual: Usuario;

    @Input()
    currentTarefaId: number;

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    @Input()
    unDeletingIds: number[] = [];

    @Input()
    selectedIds: number[] = [];

    @Input()
    alterandoDocumentosId: number[] = [];

    @Input()
    assinandoDocumentosId: number[] = [];

    @Input()
    convertendoDocumentosId: number[] = [];

    @Input()
    deletingDocumentosId: number[] = [];

    @Input()
    downloadP7SDocumentoIds: number[] = [];

    @Input()
    removendoAssinaturaDocumentosId: number[] = [];

    @Output()
    changeSelectedIds = new EventEmitter();

    @Input()
    error: any;

    @Input()
    pagination: any;

    @Input()
    folders: any;

    @Input()
    actions: string[] = ['edit', 'delete', 'select'];

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    scrolled = new EventEmitter<any>();

    @Output()
    delete = new EventEmitter<Tarefa>();

    @Output()
    gerenciarMinutasBloco = new EventEmitter<any>();

    @Output()
    restauraTarefa = new EventEmitter<Tarefa>();

    @Output()
    deleteBloco = new EventEmitter<Tarefa[]>();

    @Output()
    cienciaBloco = new EventEmitter<Tarefa[]>();

    @Output()
    folder = new EventEmitter<any>();

    @Output()
    selected = new EventEmitter<{tarefa: Tarefa; event: any}>();

    @Output()
    compartilhar = new EventEmitter<number>();

    @Output()
    createDocumentoAvulso = new EventEmitter<number>();

    @Output()
    createTarefa = new EventEmitter<any>();

    @Output()
    movimentar = new EventEmitter<Tarefa>();

    @Output()
    editProcesso = new EventEmitter<any>();

    @Output()
    editTarefa = new EventEmitter<Tarefa>();

    @Output()
    redistribuirTarefa = new EventEmitter<Tarefa>();

    @Output()
    cienciaTarefa = new EventEmitter<any>();

    @Output()
    gerarRelatorioExcel = new EventEmitter<any>();

    @Output()
    toggleUrgente = new EventEmitter<Tarefa>();

    @Output()
    removeTarefa = new EventEmitter<Tarefa>();

    @Output()
    compartilharBloco = new EventEmitter<any>();

    @Output()
    createTarefaBloco = new EventEmitter<any>();

    @Output()
    createDocumentoAvulsoBloco = new EventEmitter<any>();

    @Output()
    editTarefaBloco = new EventEmitter<any>();

    @Output()
    editRedistribuirBloco = new EventEmitter<any>();

    @Output()
    movimentarBloco = new EventEmitter<any>();

    @Output()
    etiquetarBloco = new EventEmitter<any>();

    @Output()
    uploadBloco = new EventEmitter<any>();

    @Output()
    editorBloco = new EventEmitter<any>();

    @Output()
    loadAssuntos = new EventEmitter<any>();

    @Output()
    loadInteressados = new EventEmitter<any>();

    @Output()
    criaRelatorio = new EventEmitter<boolean>();

    @Output()
    etiquetaClickHandler = new EventEmitter<{vinculacaoEtiqueta: VinculacaoEtiqueta; tarefa: Tarefa, event: any}>();

    @Output()
    outraAbaHandler = new EventEmitter<{vinculacaoEtiqueta: VinculacaoEtiqueta; tarefa: Tarefa}>();

    @Output()
    setDraggedTarefasIds = new EventEmitter<number[]>();

    @Output()
    salvarObservacao = new EventEmitter<any>();

    @Output()
    alterarTipoDocumento = new EventEmitter<any>();

    @Output()
    assinaMinutas = new EventEmitter<any>();

    @Output()
    vinculacaoEtiquetaCreate = new EventEmitter<any>();

    @Output()
    vinculacaoEtiquetaDelete = new EventEmitter<any>();

    @Output()
    vinculacaoEtiquetaEdit = new EventEmitter<any>();

    @Output()
    aprovaDocumento = new EventEmitter<number>();

    @Output()
    assinaDocumento = new EventEmitter<VinculacaoEtiqueta>();

    @Output()
    converteHtml = new EventEmitter<number>();

    @Output()
    convertePdf = new EventEmitter<number>();

    @Output()
    deleteDocumento = new EventEmitter<{ documentoId: number; tarefaId: number; documentoAvulsoUuid?: string }>();

    @Output()
    downloadP7S = new EventEmitter<VinculacaoEtiqueta>();

    @Output()
    removeAssinaturaDocumento = new EventEmitter<number>();

    @Output()
    uploadAnexos = new EventEmitter<{ vinculacaoEtiqueta: VinculacaoEtiqueta; tarefa: Tarefa }>();

    @Output()
    verResposta = new EventEmitter<{ documentoRespostaId: number; tarefa: Tarefa }>();

    @Output()
    completed = new EventEmitter<{ tarefaId: number; documento: Documento }>();

    @Output()
    addEtiqueta = new EventEmitter<{ tarefa: Tarefa; etiqueta: Etiqueta }>();

    @Output()
    editarObservacao: EventEmitter<number> = new EventEmitter<number>();

    /**
     * Disparado quando o upload de todos os componentes digitais for concluído, ou quando restarem apenas uploads com erro na fila
     */
    @Output()
    completedAll = new EventEmitter<number>();

    @Output()
    erroUpload = new EventEmitter<string>();

    @Output()
    pencencies: EventEmitter<{tarefa: Tarefa, vinculacaoEtiqueta: VinculacaoEtiqueta}> = new EventEmitter<{tarefa: Tarefa; vinculacaoEtiqueta: VinculacaoEtiqueta}>();

    @Input()
    loadingAssuntosProcessosId: number[];

    @Input()
    loadingInteressadosProcessosId: number[];

    @Input()
    totalInteressadosProcessosId: any[];

    @Input()
    cienciaIds: number[] = [];

    @Input()
    errorDelete: number[] = [];

    @Input()
    errorDistribuir: number[] = [];

    @Input()
    targetHandle: any;

    @Input()
    typeHandle: any;

    @Input()
    editandoObservacaoIds: number[] = [];

    @Input()
    savingObservacaoIds: number[] = [];

    @Input()
    observacaoEdit: number[] = [];

    @Input()
    hiddenFilters: string[] = [];

    @ViewChild('dynamicComponent', {static: false, read: ViewContainerRef})
    container: ViewContainerRef;

    @Input()
    novaTarefa = false;

    @Input()
    mobileMode: boolean = false;

    @Input()
    draggingIds: number[] = [];

    @Input()
    viewMode: ViewMode = 'list';

    @Input()
    pageSize = 10;

    @HostBinding('class') classes = '';

    columns = new FormControl();

    listFilter: any;
    listSort: Record<string, string> = {};
    sortField: string = 'dataHoraFinalPrazo';
    sortOrder: string = 'ASC';
    isIndeterminate = false;
    etiquetasList: any[] = [];
    etiquetasMinutaList: any[] = [];
    formTipoDocumento: FormGroup;
    habilitarTipoDocumentoSalvar = false;
    tarefaDataSource: TarefaDataSource;
    cdkUtils: CdkUtils = CdkUtils;
    paginator: MatPaginator;
    sort: MatSort;

    dynamicColumnList: CdkTarefaListGridColumn[] = [];
    dynamicColumnInstancesList: CdkTarefaListGridColumn[] = [];

    /**
     * Constructor
     */
    constructor(
        private _dynamicService: DynamicService,
        private _viewContainerRef: ViewContainerRef,
        private _cdkSidebarService: CdkSidebarService,
        private _cdkTarefaListService: CdkTarefaListService,
        private _formBuilder: FormBuilder,
        public loginService: LoginService,
        private _render: Renderer2,
        protected _changeDetectorRef: ChangeDetectorRef,
        protected _tableDefinitionsService: TableDefinitionsService
    ) {
        super(_tableDefinitionsService, _changeDetectorRef);
        this.listFilter = {};
        this.formTipoDocumento = this._formBuilder.group({
            tipoDocumentoMinutas: [null]
        });

        this.displayedColumns = [
            'select',
            'id',
            'processo.NUP',
            'processo.modalidadeMeio.valor',
            'especieTarefa.nome',
            'setorResponsavel.nome',
            'dataHoraFinalPrazo',
            'vinculacoesEtiquetas',
            'vinculacoesEtiquetasMinutas',
            'observacao',
            'urgente',
        ];

        this._tableColumns = _.cloneDeep(CdkTarefaListColumns.columns);
        this._tableColumnsOriginal = _.cloneDeep(CdkTarefaListColumns.columns);
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.novaTarefa = false;
        super.ngOnInit();
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();

        this.tarefaDataSource = new TarefaDataSource(of(this.tarefas));
    }

    ngAfterViewInit(): void {
        if (this.container !== undefined) {
            this.container.clear();
        }
        const path = '@cdk/components/tarefa/cdk-tarefa-list';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    if (this.container !== undefined) {
                        this._dynamicService.loadComponent(c)
                            .then(componentFactory => this.container.createComponent(componentFactory));
                    }
                }));
            }
        });

        this._changeDetectorRef.markForCheck();
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        super.ngOnChanges(changes);
        if (changes['tarefas']) {
            this._cdkTarefaListService.tarefas = this.tarefas;
            this.etiquetasList = [];
            this.etiquetasMinutaList = [];

            this.tarefas.forEach((tarefa) => {
                this.etiquetasList[tarefa.id] = tarefa.vinculacoesEtiquetas ? tarefa.vinculacoesEtiquetas.filter(
                    vinculacaoEtiqueta => vinculacaoEtiqueta?.objectClass !== 'SuppCore\\AdministrativoBackend\\Entity\\Documento'
                ) : [];

                this.etiquetasMinutaList[tarefa.id] = tarefa.vinculacoesEtiquetas ? tarefa.vinculacoesEtiquetas.filter(
                    // eslint-disable-next-line max-len
                    vinculacaoEtiqueta => vinculacaoEtiqueta?.objectClass === 'SuppCore\\AdministrativoBackend\\Entity\\Documento'
                ) : [];
            });
            this.tarefaDataSource = new TarefaDataSource(of(this.tarefas));

            if (changes['pagination'] && changes.pagination.currentValue) {
                this.listSort = changes.pagination.currentValue.sort;
                this.sortField = Object.keys(this.listSort)[0];
                this.sortOrder = Object.values(this.listSort)[0];
            }

            if (this.paginator) {
                this.paginator.length = this.pagination.total;
                this.paginator.pageSize = this.pagination.limit;
                this.paginator.pageIndex = this.pagination.offset / this.pagination.limit;
                this._changeDetectorRef.detectChanges();
            }

            if (this.viewMode == 'grid' && !this.dynamicColumnList.length) {
                this.dynamicColumnList = this.dynamicColumnInstancesList = [];
                const gridColumnPath = '@cdk/components/tarefa/cdk-tarefa-list#gridcolumn';
                modulesConfig.forEach((module) => {
                    if (module.components.hasOwnProperty(gridColumnPath)) {
                        module.components[gridColumnPath].forEach(((c) => {
                            this._dynamicService.loadComponent(c)
                                .then(componentFactory => {
                                    this.tarefas.forEach((tarefa) => {
                                        const component: ComponentRef<CdkTarefaListGridColumn> = this._viewContainerRef.createComponent(componentFactory);
                                        component.instance.tarefa = tarefa;
                                        if (component.instance.isVisible()) {
                                            this.dynamicColumnList = [
                                                ...this.dynamicColumnList.filter((column) => column.getMatColumnDef() !== component.instance.getMatColumnDef()),
                                                component.instance
                                            ];
                                            this.dynamicColumnInstancesList.push(component.instance);
                                            this.displayedColumns = [
                                                ...this.displayedColumns.filter((campo) => campo !== component.instance.getMatColumnDef()),
                                                component.instance.getMatColumnDef()
                                            ];
                                        }
                                    });
                                });
                        }));
                    }
                });
            } else if (this.viewMode != 'grid') {
                this.dynamicColumnList = this.dynamicColumnInstancesList = [];
            }
        }

        this.classes = `view-mode-${this.viewMode}`;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    onStartDrag(event: DragEvent, tarefa: Tarefa): void {
        if (this.selectedIds.length > 0) {
            this.setDraggedTarefasIds.emit(this.selectedIds);
            const tarefas = [];
            this.tarefas.forEach((aTarefa) => {
                if (this.selectedIds.indexOf(aTarefa.id) > -1) {
                    const tmpTarefa: any = {};
                    tmpTarefa.id = aTarefa.id;
                    tmpTarefa.usuario = aTarefa.usuarioResponsavel.id;
                    tmpTarefa.setor = aTarefa.setorResponsavel.id;
                    tmpTarefa.distribuicao = aTarefa.distribuicaoAutomatica;
                    tarefas.push(tmpTarefa);
                }
            });
            const type = JSON.stringify(tarefas);
            event.dataTransfer.setData(type, '');
        } else {
            const customTarefa = JSON.stringify({
                id: tarefa.id,
                usuario: tarefa.usuarioResponsavel.id,
                setor: tarefa.setorResponsavel.id,
                distribuicao: tarefa.distribuicaoAutomatica
            });
            event.dataTransfer.setData(customTarefa, '');
            this.setDraggedTarefasIds.emit([tarefa.id]);
        }
    }

    offsetFunction: DndDragImageOffsetFunction = (event: DragEvent, dragImage: Element) => ({x: 0, y: 0});

    onCancelDrag(event: DragEvent): void {
        this.setDraggedTarefasIds.emit([]);
    }

    onCopied(event: DragEvent, tarefa: Tarefa): void {
        this.setDraggedTarefasIds.emit([]);
    }

    toggleFilter(): void {
        this.toggleSidebar();
    }

    loadPage(params: {} = {}): void {
        this.reload.emit({
            ...params,
            listFilter: this.listFilter.filters,
            listSort: this.listSort,
            tipoBusca: this.listFilter.tipoBusca
        });
    }

    doSort(sort: any, params: {} = {}): void {
        this.listSort = sort;
        this.sortField = Object.keys(this.listSort)[0];
        this.sortOrder = Object.values(this.listSort)[0];
        this.loadPage(params);
    }

    selectTarefa(event, tarefa: Tarefa): void {
        this.selected.emit({tarefa: tarefa, event: event});
    }

    doToggleUrgente(tarefa: Tarefa): void {
        this.toggleUrgente.emit(tarefa);
    }

    doDeleteTarefa(tarefa: Tarefa): void {
        this.delete.emit(tarefa);
    }

    doRestauraTarefa(tarefa: Tarefa): void {
        this.restauraTarefa.emit(tarefa);
    }

    doDeleteTarefaBloco(): void {
        const tarefasBloco = [];
        this.tarefas.forEach((tarefa: Tarefa) => {
            if (this.selectedIds.indexOf(tarefa.id) > -1) {
                tarefasBloco.push(tarefa);
            }
        });
        this.deleteBloco.emit(tarefasBloco);
    }

    setFolder(folder): void {
        this.folder.emit(folder);
    }

    doRemoveTarefa(tarefa: Tarefa): void {
        this.removeTarefa.emit(tarefa);
    }

    onScroll(): void {
        if (this.viewMode != 'grid') {
            this.scrolled.emit();
        }
    }

    /**
     * Toggle select all
     *
     * @param ev
     */
    toggleSelectAll(ev): void {
        ev.preventDefault();

        if (this.selectedIds.length && this.selectedIds.length > 0) {
            this.deselectAll();
        } else {
            this.selectAll();
        }
    }

    /**
     * Select all
     */
    selectAll(): void {
        const arr = Object.keys(this.tarefas).map(k => this.tarefas[k]);
        this.selectedIds = arr.map(tarefa => tarefa.id);
        this._cdkTarefaListService.selectedIds = this.selectedIds;
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this._cdkTarefaListService.selectedIds = this.selectedIds;
        this.recompute();
    }

    toggleInSelected(tarefaId): void {
        const selectedTarefaIds = [...this.selectedIds];

        if (selectedTarefaIds.find(id => id === tarefaId) !== undefined) {
            this.selectedIds = selectedTarefaIds.filter(id => id !== tarefaId);
        } else {
            this.selectedIds = [...selectedTarefaIds, tarefaId];
        }
        this._cdkTarefaListService.selectedIds = this.selectedIds;
        this.recompute();
    }

    recompute(): void {
        this.isIndeterminate = (this.selectedIds.length !== this.tarefas.length && this.selectedIds.length > 0);
        this.changeSelectedIds.emit(this.selectedIds);
    }

    setListFilter(listFilter): void {
        this.listFilter = listFilter;
        if (this.paginator) {
            this.paginator.length = 0;
        }

        this.loadPage();
    }

    doMovimentar(tarefaId): void {
        this.movimentar.emit(tarefaId);
    }

    doMovimentarBloco(): void {
        this.movimentarBloco.emit();
    }

    doCompartilhar(tarefaId): void {
        this.compartilhar.emit(tarefaId);
    }

    doCompartilharBloco(): void {
        this.compartilharBloco.emit();
    }

    doCreateDocumentoAvulso(tarefaId): void {
        this.createDocumentoAvulso.emit(tarefaId);
    }

    doAlterarTipoDocumento(event): void {
        this.matMenuTriggersList?.forEach((trigger) => trigger.closeMenu());
        this.alterarTipoDocumento.emit(event);
        this.formTipoDocumento.reset();
        this.habilitarTipoDocumentoSalvar = false;
    }

    doAssinaMinutas(): void {
        this.assinaMinutas.emit(true);
    }

    doCreateDocumentoAvulsoBloco(): void {
        this.createDocumentoAvulsoBloco.emit();
    }

    doCreateTarefa(params): void {
        this.createTarefa.emit(params);
    }

    doCreateTarefaBloco(): void {
        this.createTarefaBloco.emit();
    }

    doEditTarefa(tarefaId): void {
        this.editTarefa.emit(tarefaId);
    }

    doRedistribuirTarefa(tarefaId): void {
        this.redistribuirTarefa.emit(tarefaId);
    }

    doCienciaTarefa(tarefaId): void {
        this.cienciaTarefa.emit(tarefaId);
    }

    doEditTarefaBloco(): void {
        this.editTarefaBloco.emit();
    }

    doRedistribuirBloco(): void {
        this.editRedistribuirBloco.emit();
    }

    doCienciaBloco(): void {
        const tarefasBloco = [];
        this.tarefas.forEach((tarefa: Tarefa) => {
            if (this.selectedIds.indexOf(tarefa.id) > -1) {
                tarefasBloco.push(tarefa);
            }
        });

        this.cienciaBloco.emit(tarefasBloco);
    }

    doEditProcesso(params): void {
        this.editProcesso.emit(params);
    }

    doEtiquetarBloco(): void {
        this.etiquetarBloco.emit(true);
    }

    doMinutas(): void {
        this.gerenciarMinutasBloco.emit(true);
    }

    doUploadBloco(): void {
        this.uploadBloco.emit(true);
    }

    doEditorBloco(): void {
        this.editorBloco.emit(true);
    }

    doRestaurarBloco(): void {
        this.selectedIds.forEach((tarefaId) => {
            const tarefa = new Tarefa();
            tarefa.id = tarefaId;
            this.doRestauraTarefa(tarefa);
        });
    }

    /**
     * Toggle the sidebar
     */
    toggleSidebar(): void {
        this._cdkSidebarService.getSidebar('cdk-tarefa-filter').toggleOpen();
    }

    doLoadAssuntos(processoId): void {
        this.loadAssuntos.emit(processoId);
    }

    doLoadInteressados(processoId): void {
        this.loadInteressados.emit(processoId);
    }

    getTotalInteressados(processoId: number): number {
        const objeto = this.totalInteressadosProcessosId.find(total => total.id === processoId);
        return objeto ? objeto.total : 0;
    }

    doGerarRelatorioExcel(): void {
        this.gerarRelatorioExcel.emit();
    }

    prazoVenceHoje(tarefa: Tarefa): boolean {
        if (tarefa.dataHoraFinalPrazo) {
            const currDate = moment().startOf('day');
            const vencimentoPrazo = tarefa.dataHoraFinalPrazo.clone().startOf('day');
            const diff = vencimentoPrazo.diff(currDate, 'days');
            if (diff === 0) {
                return true;
            }
        }
        return false;
    }

    prazoVenceu(tarefa: Tarefa): boolean {
        if (tarefa.dataHoraFinalPrazo) {
            const currDate = moment().startOf('day');
            const vencimentoPrazo = tarefa.dataHoraFinalPrazo.clone().startOf('day');
            const diff = vencimentoPrazo.diff(currDate, 'days');
            if (diff < 0) {
                return true;
            }
        }
        return false;
    }

    doCopiarParaAreaTrabalho(val: any): void {
        document.addEventListener('copy', (e: ClipboardEvent) => {
            e.clipboardData.setData('text/plain', (val));
            e.preventDefault();
            document.removeEventListener('copy', null);
        });
        document.execCommand('copy');
    }

    getTarefaVinculacoesEtiquetas(tarefa: Tarefa): VinculacaoEtiqueta[] {
        return tarefa.vinculacoesEtiquetas ? tarefa.vinculacoesEtiquetas.filter(
            vinculacaoEtiqueta => vinculacaoEtiqueta?.objectClass !== 'SuppCore\\AdministrativoBackend\\Entity\\Documento'
        ) : [];
    }

    getTarefaVinculacoesEtiquetasMinuta(tarefa: Tarefa): VinculacaoEtiqueta[] {
        return tarefa.vinculacoesEtiquetas ? tarefa.vinculacoesEtiquetas.filter(
            // eslint-disable-next-line max-len
            vinculacaoEtiqueta => vinculacaoEtiqueta?.objectClass === 'SuppCore\\AdministrativoBackend\\Entity\\Documento'
        ) : [];
    }

    criarRelatorio(): void {
        this.criaRelatorio.emit(true);
    }

    doSalvarObservacao(observacao: any): void {
        this.salvarObservacao.emit(observacao);
    }

    doClickEtiqueta(event): void {
        this.etiquetaClickHandler.emit(event);
    }

    doAbrirOutraAba(event): void {
        this.matMenuTriggersList?.forEach((trigger) => trigger.closeMenu());
        this.outraAbaHandler.emit(event);
    }

    doEditarObservacao(tarefaId: number): void {
        this.editarObservacao.emit(tarefaId);
    }

    doAddEtiqueta(params: { tarefa: Tarefa; etiqueta: Etiqueta }): void {
        this.addEtiqueta.emit(params);
    }

    doVinculacaoEtiquetaCreate(params): void {
        this.vinculacaoEtiquetaCreate.emit(params);
    }

    doVinculacaoEtiquetaDelete(params): void {
        this.vinculacaoEtiquetaDelete.emit(params);
    }

    doVinculacaoEtiquetaEdit(params): void {
        this.vinculacaoEtiquetaEdit.emit(params);
    }

    doAprovaDocumento(documentoId: number): void {
        this.matMenuTriggersList?.forEach((trigger) => trigger.closeMenu());
        this.aprovaDocumento.emit(documentoId);
    }

    doAssinaDocumento(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this.matMenuTriggersList?.forEach((trigger) => trigger.closeMenu());
        this.assinaDocumento.emit(vinculacaoEtiqueta);
    }

    doConverteHtml(documentoId: number): void {
        this.matMenuTriggersList?.forEach((trigger) => trigger.closeMenu());
        this.converteHtml.emit(documentoId);
    }

    doConvertePdf(documentoId: number): void {
        this.matMenuTriggersList?.forEach((trigger) => trigger.closeMenu());
        this.convertePdf.emit(documentoId);
    }

    doDeleteDocumento(event: { documentoId: number; tarefaId: number; documentoAvulsoUuid?: string }): void {
        this.matMenuTriggersList?.forEach((trigger) => trigger.closeMenu());
        this.deleteDocumento.emit(event);
    }

    doDownloadP7S(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this.matMenuTriggersList?.forEach((trigger) => trigger.closeMenu());
        this.downloadP7S.emit(vinculacaoEtiqueta);
    }

    doRemoveAssinaturaDocumento(documentoId: number): void {
        this.matMenuTriggersList?.forEach((trigger) => trigger.closeMenu());
        this.removeAssinaturaDocumento.emit(documentoId);
    }

    doUploadAnexos(event: { vinculacaoEtiqueta: VinculacaoEtiqueta; tarefa: Tarefa }): void {
        this.matMenuTriggersList?.forEach((trigger) => trigger.closeMenu());
        this.uploadAnexos.emit(event);
    }

    doVerResposta(event: { documentoRespostaId: number; tarefa: Tarefa }): void {
        this.matMenuTriggersList?.forEach((trigger) => trigger.closeMenu());
        this.verResposta.emit(event);
    }

    onComplete(uploaded: {tarefaId: number; documento: Documento}): void {
        this.completed.emit(uploaded);
    }

    onCompleteAll(tarefaId: number): void {
        this.completedAll.emit(tarefaId);
    }

    onErroUpload(mensagem: string): void {
        this.erroUpload.emit(mensagem);
    }

    doCheckTipoDocumento(): void {
        const value = this.formTipoDocumento.get('tipoDocumentoMinutas').value;
        if (!value || typeof value !== 'object') {
            this.habilitarTipoDocumentoSalvar = false;
            this.formTipoDocumento.get('tipoDocumentoMinutas').setValue(null);
        } else {
            this.habilitarTipoDocumentoSalvar = true;
        }
        this._changeDetectorRef.detectChanges();
    }

    doPendencies(event: {vinculacaoEtiqueta: VinculacaoEtiqueta, tarefa: Tarefa}): void {
        this.pencencies.emit(event);
    }
}
