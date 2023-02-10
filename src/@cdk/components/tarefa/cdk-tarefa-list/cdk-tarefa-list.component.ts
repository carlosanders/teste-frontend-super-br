import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ComponentFactory, ComponentRef,
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
import {of, Subject, Subscription, zip} from 'rxjs';
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
import {CdkTarefaListColumns} from './cdk-tarefa-list.columns';
import {CdkTarefaFilterService} from '../sidebars/cdk-tarefa-filter/cdk-tarefa-filter.service';
import {CdkTarefaGroupDataInterface, CdkTarefaSortOptionsInterface} from './cdk-tarefa-sort-group.interface';
import {CdkPerfectScrollbarDirective} from '../../../directives/cdk-perfect-scrollbar/cdk-perfect-scrollbar.directive';
import {TableDefinitions} from '../../table-definitions/table-definitions';
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
    @ViewChildren('tdTarefaContainer', {read: ViewContainerRef}) set _dynamicComponent(list: QueryList<ViewContainerRef>) {
        list.forEach((viewContainerRef: ViewContainerRef) => {
            const td = this._render.parentNode(viewContainerRef.element.nativeElement);
            if (td) {
                viewContainerRef.clear();
                const columns = this.dynamicSlaveTableColumns
                    .filter((col) => col.tableColumn.id == td.getAttribute('column-ref') && col?.tarefa?.id == td.getAttribute('tarefa-id'));
                columns.forEach((column) => {
                    const templateRef = column.getTemplateRef(column.tableColumn);
                    if (templateRef) {
                        viewContainerRef.createEmbeddedView(templateRef);
                    }
                });
            }
        });
    }

    @ViewChild('contentScroll', {read: CdkPerfectScrollbarDirective}) contentScroll: CdkPerfectScrollbarDirective;

    @Input()
    loading: boolean;

    @Input()
    togglingUrgenteIds: number[] = [];

    @Input()
    doLimparFiltros: Subject<boolean> = new Subject<boolean>();

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

    @Output()
    limparFiltros = new EventEmitter();

    @Input()
    error: any;

    @Input()
    pagination: any;

    @Input()
    folders: any;

    @Input()
    actions: string[] = ['edit', 'delete', 'select'];

    @Input()
    collapsedGroups: string[] = [];

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

    @Output()
    toggleGroup: EventEmitter<CdkTarefaGroupDataInterface> = new EventEmitter<CdkTarefaGroupDataInterface>();

    @Output()
    groupOptionChange: EventEmitter<CdkTarefaSortOptionsInterface|null> = new EventEmitter<CdkTarefaSortOptionsInterface|null>();

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
    generoHandle: any;

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

    @HostBinding('class') classes = '';

    agruparFormControl = new FormControl<boolean>(false);

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

    filterProcesso: any = null;
    filterEtiquetas: Etiqueta[] = [];
    groupedTarefas: CdkTarefaGroupDataInterface[] = [];
    sortOptions: CdkTarefaSortOptionsInterface[] = CdkTarefaListComponent.getSortOptions();

    dynamicColumnList: CdkTarefaListGridColumn[] = [];
    dynamicSlaveTableColumns: CdkTarefaListGridColumn[] = []

    private _dynamicColumnsLoaderSubscription: Subscription;

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
        private _cdkTarefaFilterService: CdkTarefaFilterService
    ) {
        super(_changeDetectorRef);
        this.listFilter = {};
        this.formTipoDocumento = this._formBuilder.group({
            tipoDocumentoMinutas: [null]
        });

        this._autoCleanNotDefaultColumns = false;
        this.tableColumns = CdkTarefaListColumns.columns;

        this.displayedColumns = [
            'select',
            'id',
            'processo.NUP',
            'processo.modalidadeMeio.valor',
            'especieTarefa.nome',
            'setorResponsavel.nome',
            'dataHoraFinalPrazo',
            'vinculacoesEtiquetas',
            'vinculacoesEtiquetas.objectClass',
            'observacao',
            'urgente',
        ];
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

        this._cdkTarefaFilterService.clear.subscribe(() => {
            this.filterEtiquetas = [];
            this.listFilter.filters = {};
        });

        this.tarefaDataSource = new TarefaDataSource(of(this.tarefas));
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
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
        if (changes['tableDefinitions'] && this.viewMode === 'list' && this.agruparFormControl) {
            this.agruparFormControl.setValue(this.tableDefinitions.data?.agrupar || false);
            this.doAgrupar();
        }
        if (changes['tarefas']) {
            this._cdkTarefaListService.tarefas = this.tarefas;
            this.tarefaDataSource = new TarefaDataSource(of(this.tarefas));
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

            if (changes['pagination'] && changes.pagination.currentValue) {
                this.listSort = changes.pagination.currentValue.sort;
                this.sortField = Object.keys(this.listSort)[0];
                this.sortOrder = Object.values(this.listSort)[0];
            }

            if (changes['generoHandle'] || changes['targetHandle'] || changes['typeHandle']) {
                if (this.contentScroll?.enabled) {
                    this.contentScroll.scrollToTop();
                }
            }

            if (this.paginator) {
                this.paginator.length = this.pagination.total;
                this.paginator.pageSize = this.pagination.limit;
                this.paginator.pageIndex = this.pagination.offset / this.pagination.limit;
                this._changeDetectorRef.detectChanges();
            }


            this.dynamicColumnList = this.dynamicSlaveTableColumns = [];
            if (this.viewMode == 'grid') {
                const gridColumnPath = '@cdk/components/tarefa/cdk-tarefa-list#gridcolumn';
                let tableColumns = [...this._tableColumns];
                let displayColumns = [...this._displayedColumns];
                let dynamicColumns = [];
                if (this._dynamicColumnsLoaderSubscription) {
                    this._dynamicColumnsLoaderSubscription.unsubscribe();
                    this._dynamicColumnsLoaderSubscription = null;
                }

                modulesConfig.forEach((module) => {
                    if (module.components.hasOwnProperty(gridColumnPath)) {
                        this._dynamicColumnsLoaderSubscription = zip(module.components[gridColumnPath].map((component) => this._dynamicService.loadComponent(component)))
                            .subscribe((components) => {
                                components.forEach((componentFactory: ComponentFactory<CdkTarefaListGridColumn>) => {
                                    this.tarefas.forEach((tarefa) => {
                                        const component: ComponentRef<CdkTarefaListGridColumn> = this._viewContainerRef.createComponent(componentFactory);
                                        component.instance.tarefa = tarefa;
                                        this.dynamicColumnList = [
                                            ...this.dynamicColumnList.filter((column) => column.tableColumn.id !== column.tableColumn.id),
                                            component.instance
                                        ];
                                        if (component.instance.tableColumn.definitions.slave) {
                                            this.dynamicSlaveTableColumns = [
                                                ...this.dynamicSlaveTableColumns.filter((column) => column.tableColumn.id !== column.tableColumn.id),
                                                component.instance
                                            ];
                                        }

                                        tableColumns = [
                                            ...tableColumns.filter((tableColumn) => tableColumn.id !== component.instance.tableColumn.id),
                                        ];
                                        if (!!component.instance.tableColumn.definitions.selected) {
                                            displayColumns = [
                                                ...displayColumns.filter((campo) => campo !== component.instance.tableColumn.id),
                                                component.instance.tableColumn.id
                                            ];
                                        }
                                        dynamicColumns = [
                                            ...dynamicColumns.filter((column) => column.id !== component.instance.tableColumn.id),
                                            component.instance.tableColumn
                                        ];
                                    });
                                })
                                if (this.dynamicColumnList.length) {
                                    this.tableColumns = [
                                        ...tableColumns,
                                        ...dynamicColumns
                                    ];
                                    this.displayedColumns = displayColumns;
                                    this.tableDefinitions.columns = _.cloneDeep(this._tableColumns);
                                    this._tableDefinitionsChange(this.tableDefinitions);
                                }
                            })
                    }
                });
            } else {
                this.doAgrupar();
            }
        }

        if (changes['collapsedGroups'] && this.viewMode === 'list' && this.groupedTarefas) {
            this.groupedTarefas.forEach((optionData) => {
                optionData.expanded = !this.collapsedGroups.includes(`${optionData.identifier}`);
            });
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
        this.groupOptionChange.emit(this.getSortOptionSelected());
        if (this.contentScroll.enabled) {
            this.contentScroll.scrollToTop();
        }

        if (this.viewMode === 'list') {
            this.tableDefinitions.sort = sort;
            this.tableDefinitions.limit = this.pagination?.limit || 10;
            if (this.agruparFormControl) {
                this.tableDefinitions.data = {agrupar: this.agruparFormControl.value};
            }
            this._tableDefinitionsChange(this.tableDefinitions);
        }

        this.loadPage(params);
    }

    protected _tableDefinitionsChange(tableDefinitions: TableDefinitions) {
        tableDefinitions.version = CdkTarefaListColumns.version;
        super._tableDefinitionsChange(tableDefinitions);
    }

    doAgrupar(): void {
        const sortOption = this.getSortOptionSelected();
        if (sortOption) {
            this.groupOptionChange.emit(this.getSortOptionSelected());
        }

        this.agruparFormControl.setValue(this.tableDefinitions.data?.agrupar || false);

        if (sortOption && this.agruparFormControl.value === true && sortOption.groupable === true && sortOption.groupDataFactory) {
            this.groupedTarefas = sortOption.groupDataFactory(
                this.tarefas,
                sortOption,
                {expanded: (groupData: CdkTarefaGroupDataInterface) => !this.collapsedGroups.includes(`${groupData.identifier}`)}
            );
        } else {
            if (this.agruparFormControl) {
                this.agruparFormControl.setValue(false);
            }

            this.groupedTarefas = [
                {
                    identifier: 'list',
                    mode: 'list',
                    tarefaList: this.tarefas,
                    expanded: true,
                }
            ];
        }
    }

    toggleGroupDataExpanded(optionData: CdkTarefaGroupDataInterface): void {
        this.toggleGroup.emit(
            {
                ...optionData,
                expanded: !optionData.expanded
            }
        );
    }

    //Overriding
    protected _tablePaginatorPageChange(paginator: MatPaginator) {
        super._tablePaginatorPageChange(paginator);
        this.loadPage(
            {
                limit: paginator.pageSize,
                offset: (paginator.pageSize * paginator.pageIndex)
            }
        );
    }

    //Overriding
    setTablePaginatorData(paginator: MatPaginator) {
        super.setTablePaginatorData(paginator);
        paginator.length = this.pagination.total;
        paginator.pageSize = this.pagination.limit;
        paginator.pageIndex = this.pagination.offset / this.pagination.limit
    }

    //Overriding
    protected _tableColumnSortChange(sort: MatSort, paginator: MatPaginator) {
        super._tableColumnSortChange(sort, paginator);
        this.doSort(
            sort.active ? {[sort.active]: sort.direction} : {},
            paginator ? {
                limit: paginator.pageSize,
                offset: (paginator.pageSize * paginator.pageIndex)
            } : {}
        )
    }

    //Overriding
    setTableSortData(sort: MatSort) {
        super.setTableSortData(sort);
        if (this.sortOrder) {
            this.sort.sort(<MatSortable> {id: this.sortField, start: this.sortOrder.toLowerCase(), disableClear: false});
        } else {
            this.sort.active = null;
        }
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

    limpaFiltros(listFilter): void {
        this.listFilter = listFilter;
        this.limparFiltros.emit();
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

    doDeleteDocumento(event: { documentoId: any; tarefaId: any; documentoAvulsoUuid?: any }): void {
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

    doFilterNup(processo): void {
        if (this.filterProcesso?.id === processo?.id) {
            this.filterProcesso = null;
            this.listFilter.filters = {};
            this.loadPage();
        } else {
            this.filterProcesso = null;
            this.filterEtiquetas = [];
            this.filterProcesso = processo;
            this.listFilter.filters = {'processo.id': `eq:${processo.id}`};
            this.loadPage();
        }
    }

    doFilterEtiqueta(etiqueta): void {
        if (this.filterEtiquetas.find(et => etiqueta.id === et.id)) {
            this.filterEtiquetas = [];
            this.listFilter.filters = {};
            this.loadPage();
        } else {
            this.filterProcesso = null;
            this.filterEtiquetas = [];
            this.listFilter.filters = {'vinculacoesEtiquetas.etiqueta.id': `eq:${etiqueta.id}`};
            this.filterEtiquetas.push(etiqueta);
            this.loadPage();
        }
    }

    tarefaTrackBy(index, tarefa: Tarefa): number {
        return tarefa.id;
    }

    vinculacaoEtiquetaTrackBy(index, vinculacaoEtiqueta: VinculacaoEtiqueta): number {
        return vinculacaoEtiqueta.id;
    }

    groupDataTrackBy(index, groupData: CdkTarefaGroupDataInterface): number|string {
        return groupData.identifier;
    }

    getSortOptionListSort(sortOption: CdkTarefaSortOptionsInterface): any {
        const sortField = {};
        sortField[sortOption.field] = this.sortField === sortOption.field && this.sortOrder === 'DESC' ? 'ASC' : 'DESC';

        return sortField;
    }

    getSortOptionSelected(): CdkTarefaSortOptionsInterface {
        return this.sortOptions.find((option) => option.field === this.sortField);
    }

    public static getSortOptions() : CdkTarefaSortOptionsInterface[] {
        return [
            {
                label: 'Final do Prazo',
                field: 'dataHoraFinalPrazo',
                groupable: true,
                groupDataFactory(tarefas: Tarefa[], tarefaSortOption: CdkTarefaSortOptionsInterface, options): CdkTarefaGroupDataInterface[] {
                    const dateNow = moment();
                    const list: CdkTarefaGroupDataInterface[] = [];

                    tarefas.forEach((tarefa) => {
                        let key = null;
                        let label = null;
                        let mode = null;
                        if (tarefa.dataHoraFinalPrazo && tarefa.dataHoraFinalPrazo.isBefore(dateNow, 'day')) {
                            key = 1;
                            label = 'Vencidas';
                            mode = 'group';
                        } else if (tarefa.dataHoraFinalPrazo && tarefa.dataHoraFinalPrazo.isSame(dateNow, 'day')) {
                            key = 2;
                            label = 'Vencem hoje';
                            mode = 'group';
                        } else if (tarefa.dataHoraFinalPrazo && tarefa.dataHoraFinalPrazo.isSame(moment().add(1, 'days'), 'day')) {
                            key = 3;
                            label = 'Vencem amanhã';
                            mode = 'group';
                        } else if (tarefa.dataHoraFinalPrazo && tarefa.dataHoraFinalPrazo.isSame(dateNow, 'week')) {
                            key = 4;
                            label = 'Vencem essa semana';
                            mode = 'group';
                        } else if (tarefa.dataHoraFinalPrazo && tarefa.dataHoraFinalPrazo.isSame(dateNow, 'month')) {
                            key = 5;
                            label = 'Vencem esse mês';
                            mode = 'group';
                        } else {
                            key = 6;
                            label = 'Vencem posteriormente';
                            mode = 'group';
                        }

                        const identifier = `${key}-${tarefaSortOption.label}`;
                        let groupData = list.find((groupData) => groupData.identifier === identifier);

                        if (!groupData) {
                            let expanded = true;

                            groupData = {
                                identifier: identifier,
                                tarefaSortOption: tarefaSortOption,
                                tarefaList: [],
                                dataLabel: label,
                                mode: mode,
                                expanded: expanded,
                            };

                            if (options && options?.expanded) {
                                if (typeof options.expanded === 'boolean') {
                                    expanded = options.expanded;
                                }
                                if (typeof options.expanded === 'function') {
                                    expanded = options.expanded(groupData);
                                }
                            }

                            groupData.expanded = expanded;
                            list.push(groupData);
                        }

                        groupData.tarefaList.push(tarefa);
                    });

                    return list;
                }
            },
            {
                label: 'Data da Distribuição',
                field: 'dataHoraDistribuicao',
                groupable: true,
                groupDataFactory(tarefas: Tarefa[], tarefaSortOption: CdkTarefaSortOptionsInterface, options): CdkTarefaGroupDataInterface[] {
                    const dateNow = moment();
                    const list: CdkTarefaGroupDataInterface[] = [];

                    tarefas.forEach((tarefa) => {
                        let key = null;
                        let label = null;
                        let mode = null;
                        if (tarefa.dataHoraDistribuicao.isSame(dateNow, 'day')) {
                            key = 1;
                            label = 'Distribuídas hoje';
                            mode = 'group';
                        } else if (tarefa.dataHoraDistribuicao.isSame(moment().subtract(1, 'day'), 'day')) {
                            key = 2;
                            label = 'Distribuidas ontem';
                            mode = 'group';
                        } else if (tarefa.dataHoraDistribuicao.isSame(dateNow, 'week')) {
                            key = 3;
                            label = 'Distribuidas essa semana';
                            mode = 'group';
                        } else if (tarefa.dataHoraDistribuicao.isSame(dateNow, 'month')) {
                            key = 4;
                            label = 'Distribuidas esse mês';
                            mode = 'group';
                        } else {
                            key = 5;
                            label = 'Distribuidas anteriormente';
                            mode = 'group';
                        }

                        const identifier = `${key}-${tarefaSortOption.label}`;
                        let groupData = list.find((groupData) => groupData.identifier === identifier);

                        if (!groupData) {
                            let expanded = true;

                            groupData = {
                                identifier: identifier,
                                tarefaSortOption: tarefaSortOption,
                                tarefaList: [],
                                dataLabel: label,
                                mode: mode,
                                expanded: expanded,
                            };

                            if (options && options?.expanded) {
                                if (typeof options.expanded === 'boolean') {
                                    expanded = options.expanded;
                                }
                                if (typeof options.expanded === 'function') {
                                    expanded = options.expanded(groupData);
                                }
                            }

                            groupData.expanded = expanded;
                            list.push(groupData);
                        }

                        groupData.tarefaList.push(tarefa);
                    });

                    return list;
                }
            },
            {
                label: 'Última Atualização',
                field: 'atualizadoEm',
                groupable: true,
                groupDataFactory(tarefas: Tarefa[], tarefaSortOption: CdkTarefaSortOptionsInterface, options): CdkTarefaGroupDataInterface[] {
                    const dateNow = moment.now();
                    const list: CdkTarefaGroupDataInterface[] = [];

                    tarefas.forEach((tarefa) => {
                        let key = null;
                        let label = null;
                        let mode = null;
                        if (tarefa.atualizadoEm.isSame(dateNow, 'day')) {
                            key = 1;
                            label = 'Atualizadas hoje';
                            mode = 'group';
                        } else if (tarefa.atualizadoEm.isSame(moment().subtract(1, 'days'), 'day')) {
                            key = 2;
                            label = 'Atualizadas ontem';
                            mode = 'group';
                        } else if (tarefa.atualizadoEm.isSame(dateNow, 'week')) {
                            key = 3;
                            label = 'Atualizadas essa semana';
                            mode = 'group';
                        } else if (tarefa.atualizadoEm.isSame(dateNow, 'month')) {
                            key = 4;
                            label = 'Atualizadas esse mês';
                            mode = 'group';
                        } else {
                            key = 5;
                            label = 'Atualizadas anteriormente';
                            mode = 'group';
                        }

                        const identifier = `${key}-${tarefaSortOption.label}`;
                        let groupData = list.find((groupData) => groupData.identifier === identifier);

                        if (!groupData) {
                            let expanded = true;

                            groupData = {
                                identifier: identifier,
                                tarefaSortOption: tarefaSortOption,
                                tarefaList: [],
                                dataLabel: label,
                                mode: mode,
                                expanded: expanded,
                            };

                            if (options && options?.expanded) {
                                if (typeof options.expanded === 'boolean') {
                                    expanded = options.expanded;
                                }
                                if (typeof options.expanded === 'function') {
                                    expanded = options.expanded(groupData);
                                }
                            }

                            groupData.expanded = expanded;
                            list.push(groupData);
                        }

                        groupData.tarefaList.push(tarefa);
                    });

                    return list;
                }
            },
            {
                label: 'Processo',
                field: 'processo.NUP',
                groupable: true,
                groupDataFactory(tarefas: Tarefa[], tarefaSortOption: CdkTarefaSortOptionsInterface, options): CdkTarefaGroupDataInterface[] {
                    const list: CdkTarefaGroupDataInterface[] = [];
                    tarefas.forEach((tarefa) => {
                        const identifier = tarefa.processo['@id'];
                        let groupData = list.find((groupData) => groupData.identifier === identifier);

                        if (!groupData) {
                            let expanded = true;

                            groupData = {
                                identifier: identifier,
                                tarefaSortOption: tarefaSortOption,
                                tarefaList: [],
                                dataLabel: tarefa.processo.NUPFormatado,
                                mode: 'group',
                                expanded: expanded,
                            };

                            if (options && options?.expanded) {
                                if (typeof options.expanded === 'boolean') {
                                    expanded = options.expanded;
                                }
                                if (typeof options.expanded === 'function') {
                                    expanded = options.expanded(groupData);
                                }
                            }

                            groupData.expanded = expanded;
                            list.push(groupData);
                        }

                        groupData.tarefaList.push(tarefa);
                    });

                    return list;
                }
            },
            {
                label: 'Espécie Tarefa',
                field: 'especieTarefa.nome',
                groupable: true,
                groupDataFactory(tarefas: Tarefa[], tarefaSortOption: CdkTarefaSortOptionsInterface, options): CdkTarefaGroupDataInterface[] {
                    const list: CdkTarefaGroupDataInterface[] = [];
                    tarefas.forEach((tarefa) => {
                        const identifier = tarefa.especieTarefa['@id'];
                        let groupData = list.find((groupData) => groupData.identifier === identifier);

                        if (!groupData) {
                            let expanded = true;

                            groupData = {
                                identifier: identifier,
                                tarefaSortOption: tarefaSortOption,
                                tarefaList: [],
                                dataLabel: tarefa.especieTarefa.nome,
                                mode: 'group',
                                expanded: expanded,
                            };

                            if (options && options?.expanded) {
                                if (typeof options.expanded === 'boolean') {
                                    expanded = options.expanded;
                                }
                                if (typeof options.expanded === 'function') {
                                    expanded = options.expanded(groupData);
                                }
                            }

                            groupData.expanded = expanded;
                            list.push(groupData);
                        }

                        groupData.tarefaList.push(tarefa);
                    });

                    return list;
                }
            },
            {
                label: 'Minutas',
                field: 'vinculacoesEtiquetas.objectClass',
                groupable: true,
                groupDataFactory(tarefas: Tarefa[], tarefaSortOption: CdkTarefaSortOptionsInterface, options): CdkTarefaGroupDataInterface[] {
                    const list: CdkTarefaGroupDataInterface[] = [];

                    tarefas.forEach((tarefa) => {
                        const minutasTarefa = !tarefa.vinculacoesEtiquetas ? [] : tarefa.vinculacoesEtiquetas.filter(
                            vinculacaoEtiqueta => vinculacaoEtiqueta?.objectClass === 'SuppCore\\AdministrativoBackend\\Entity\\Documento'
                        );

                        let key = null;
                        let label = null;
                        let mode = null;

                        if (minutasTarefa.length > 0) {
                            key = 1;
                            label = 'Tarefas com minutas';
                            mode = 'group';
                        } else {
                            key = 2;
                            label = 'Tarefas sem minutas';
                            mode = 'group';
                        }

                        const identifier = `${key}-${tarefaSortOption.label}`;
                        let groupData = list.find((groupData) => groupData.identifier === identifier);

                        if (!groupData) {
                            let expanded = true;

                            groupData = {
                                identifier: identifier,
                                tarefaSortOption: tarefaSortOption,
                                tarefaList: [],
                                dataLabel: label,
                                mode: mode,
                                expanded: expanded,
                            };

                            if (options && options?.expanded) {
                                if (typeof options.expanded === 'boolean') {
                                    expanded = options.expanded;
                                }
                                if (typeof options.expanded === 'function') {
                                    expanded = options.expanded(groupData);
                                }
                            }

                            groupData.expanded = expanded;
                            list.push(groupData);
                        }

                        groupData.tarefaList.push(tarefa);
                    });

                    return list;
                }
            },
        ];
    }

}
