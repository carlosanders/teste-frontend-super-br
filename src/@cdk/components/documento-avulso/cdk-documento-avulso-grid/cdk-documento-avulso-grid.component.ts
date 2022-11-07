import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ComponentFactory, ComponentRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    QueryList, Renderer2, SimpleChanges,
    ViewChild,
    ViewChildren,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {of, Subscription, zip} from 'rxjs';
import {cdkAnimations} from '@cdk/animations';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {MatPaginator, MatSort} from '@cdk/angular/material';
import {ComponenteDigital, Documento, DocumentoAvulso} from '@cdk/models';
import {DocumentoAvulsoDataSource} from '@cdk/data-sources/documento-avulso-data-source';
import {modulesConfig} from '../../../../modules/modules-config';
import {DynamicService} from '../../../../modules/dynamic.service';
import {CdkConfigService} from "../../../services/config.service";
import * as _ from "lodash";
import {TableDefinitions} from "../../table-definitions/table-definitions";
import {CdkTableGridComponent} from "../../table-definitions/cdk-table-grid.component";
import {MatSortable} from "@angular/material/sort";
import {CdkDocumentoAvulsoGridColumns} from "./cdk-documento-avulso-grid.columns";
import {CdkDocumentoAvulsoGridColumn} from "./plugins/cdk-documento-avulso-grid-column";

@Component({
    selector: 'cdk-documento-avulso-grid',
    templateUrl: './cdk-documento-avulso-grid.component.html',
    styleUrls: ['./cdk-documento-avulso-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkDocumentoAvulsoGridComponent extends CdkTableGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    documentosAvulsos: DocumentoAvulso[];

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Output()
    create = new EventEmitter<any>();

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    @Input()
    remeterIds: number[] = [];

    @Input()
    deletingErrors: any = {};

    @Input()
    actions: string[] = ['edit', 'delete', 'select', 'visualizar'];

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    excluded = new EventEmitter<any>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    edit = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    deleteBlocoEmmitter = new EventEmitter<number[]>();

    @Output()
    selected = new EventEmitter<DocumentoAvulso>();

    @Output()
    selectedIds: number[] = [];

    @Output()
    responder = new EventEmitter<number[]>();

    @Output()
    remeterLote: EventEmitter<number[]> = new EventEmitter<number[]>();

    @Output()
    visualizar = new EventEmitter<DocumentoAvulso>();

    @Output()
    visualizarDocumento = new EventEmitter<Documento>();

    dataSource: DocumentoAvulsoDataSource;

    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;
    hasExcluded = false;

    dynamicColumnList: CdkDocumentoAvulsoGridColumn[] = [];
    dynamicSlaveTableColumns: CdkDocumentoAvulsoGridColumn[] = []

    private _dynamicColumnsLoaderSubscription: Subscription;

    @Output()
    statusBarramento = new EventEmitter<number[]>();

    @ViewChildren('buttonModule', {read: ViewContainerRef}) btContainer: QueryList<ViewContainerRef>;
    @ViewChildren('tdDocumentoAvulsoContainer', {read: ViewContainerRef}) set _dynamicComponent(list: QueryList<ViewContainerRef>) {
        list.forEach((viewContainerRef: ViewContainerRef) => {
            const td = this._render.parentNode(viewContainerRef.element.nativeElement);
            if (td) {
                viewContainerRef.clear();
                const columns = this.dynamicSlaveTableColumns
                    .filter((col) => col.tableColumn.id == td.getAttribute('column-ref') && col?.documentoAvulso?.id == td.getAttribute('documentoAvulso-id'));
                columns.forEach((column) => {
                    const templateRef = column.getTemplateRef(column.tableColumn);
                    if (templateRef) {
                        viewContainerRef.createEmbeddedView(templateRef);
                    }
                });
            }
        });
    }

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _dynamicService
     * @param _cdkConfigService
     * @param _viewContainerRef
     * @param _render
     */
    constructor(
        protected _changeDetectorRef: ChangeDetectorRef,
        protected _cdkSidebarService: CdkSidebarService,
        private _dynamicService: DynamicService,
        public _cdkConfigService: CdkConfigService,
        private _viewContainerRef: ViewContainerRef,
        private _render: Renderer2,
    ) {
        super(_changeDetectorRef);
        this.gridFilter = {};
        this.documentosAvulsos = [];
        this.tableColumns = _.cloneDeep(CdkDocumentoAvulsoGridColumns.columns);
        const tableDefinitions = new TableDefinitions();
        tableDefinitions.version = CdkDocumentoAvulsoGridColumns.version;
        this.tableDefinitions = tableDefinitions;

        this._autoCleanNotDefaultColumns = false;
    }

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        this.dataSource = new DocumentoAvulsoDataSource(of(this.documentosAvulsos));
        if (changes['documentosAvulsos']) {
            this.carregaModulo();
        }
    }

    ngOnInit(): void {
        super.ngOnInit();
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();
        this.dataSource = new DocumentoAvulsoDataSource(of(this.documentosAvulsos));
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    //Overriding
    setTablePaginatorData(paginator: MatPaginator) {
        super.setTablePaginatorData(paginator);
        paginator.length = this.total;
        paginator.pageSize = this.tableDefinitions.limit;
    }

    //Overriding
    setTableSortData(sort: MatSort) {
        super.setTableSortData(sort);
        const sortKeys = Object.keys(this.tableDefinitions.sort || {});
        if (sortKeys.length > 0) {
            this.sort.sort(<MatSortable> {id: sortKeys[0], start: this.tableDefinitions.sort[sortKeys[0]], disableClear: true});
        } else {
            this.sort.active = null;
        }
    }

    //Overriding
    protected _tablePaginatorPageChange(paginator: MatPaginator) {
        super._tablePaginatorPageChange(paginator);
        this.loadPage();
    }

    //Overriding
    protected _tableColumnSortChange(sort:MatSort, paginator:MatPaginator) {
        super._tableColumnSortChange(sort, paginator);
        this.loadPage();
    }

    carregaModulo(): void {
        if (this.btContainer) {
            this.btContainer.reset([]);
        }
        const path = '@cdk/components/documento-avulso/cdk-documento-avulso-grid/cdk-documento-avulso-grid#button';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then((componentFactory) => {
                            this.btContainer.forEach((button, index) => {
                                const componentRef = button.createComponent(componentFactory);
                                componentRef.instance['documentoAvulsoId'] = this.documentosAvulsos[index]['id'];
                                componentRef.instance['mecanismoRemessa'] = this.documentosAvulsos[index]['mecanismoRemessa'];
                                componentRef.instance['apagadoEm'] = !!this.documentosAvulsos[index]['apagadoEm'];
                            });
                            this._changeDetectorRef.detectChanges();
                        });
                }));
            }

            this.dynamicColumnList = this.dynamicSlaveTableColumns = [];
            const gridColumnPath = '@cdk/components/documento-avulso/cdk-documento-avulso-grid/cdk-documento-avulso-grid#gridcolumn';
            let tableColumns = [...this._tableColumns];
            let displayColumns = [...this._displayedColumns];
            let dynamicColumns = [];
            if (this._dynamicColumnsLoaderSubscription) {
                this._dynamicColumnsLoaderSubscription.unsubscribe();
                this._dynamicColumnsLoaderSubscription = null;
            }
            if (module.components.hasOwnProperty(gridColumnPath)) {
                this._dynamicColumnsLoaderSubscription = zip(module.components[gridColumnPath].map((component) => this._dynamicService.loadComponent(component)))
                    .subscribe((components) => {
                        components.forEach((componentFactory: ComponentFactory<CdkDocumentoAvulsoGridColumn>) => {
                            if (this.documentosAvulsos) {
                                this.documentosAvulsos.forEach((documentoAvulso) => {
                                    const component: ComponentRef<CdkDocumentoAvulsoGridColumn> = this._viewContainerRef.createComponent(componentFactory);
                                    component.instance.documentoAvulso = documentoAvulso;
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
                            }
                        })
                        if (this.dynamicColumnList.length) {
                            this.tableColumns = [
                                ...tableColumns,
                                ...dynamicColumns
                            ];
                            this.displayedColumns = displayColumns;
                        }
                    })
            }
        });
    }

    toggleFilter(): void {
        this._cdkSidebarService.getSidebar('cdk-documento-avulso-filter').toggleOpen();
        this.showFilter = !this.showFilter;
    }

    loadPage(): void {
        const filter = this.gridFilter.filters;
        const contexto = this.gridFilter.contexto ? this.gridFilter.contexto : {};
        const limit = this.tableDefinitions.limit || 10;
        const sort = this.tableDefinitions.sort || {};
        contexto['mostrarApagadas'] = this.hasExcluded;
        this.reload.emit({
            gridFilter: filter,
            limit: limit,
            offset: (limit * this.paginator.pageIndex),
            sort: sort,
            context: contexto
        });
    }

    loadExcluded(): void {
        this.hasExcluded = !this.hasExcluded;
        if (this.hasExcluded) {
            const filter = this.gridFilter.filters;
            this.excluded.emit({
                gridFilter: filter,
                limit: this.tableDefinitions.limit,
                offset: (this.tableDefinitions.limit * this.paginator.pageIndex),
                sort: this.tableDefinitions.sort,
                context: {mostrarApagadas: true}
            });
        }
        else {
            this.loadPage();
        }
    }

    editDocumentoAvulso(documentoAvulsoId): void {
        this.edit.emit(documentoAvulsoId);
    }

    selectDocumentoAvulso(documentoAvulso: DocumentoAvulso): void {
        this.selected.emit(documentoAvulso);
    }

    deleteDocumentoAvulso(documentoAvulsoId): void {
        this.delete.emit(documentoAvulsoId);
    }

    deleteBloco(ids): void {
        this.deleteBlocoEmmitter.emit(ids);
    }

    responderDocumentosAvulsos(documentosAvulsosId: number[]): void {
        this.responder.emit(documentosAvulsosId);
    }

    remeterDocumentosAvulsos(documentosAvulsosId: number[]): void {
        this.remeterLote.emit(documentosAvulsosId);
    }

    verificaStatusBarramento(documentosAvulsosId: number[]): void {
        this.statusBarramento.emit(documentosAvulsosId);
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
        const arr = Object.keys(this.documentosAvulsos).map(k => this.documentosAvulsos[k]);
        this.selectedIds = arr.map(documentoAvulso => documentoAvulso.id);
        this.recompute();
    }

    /**
     * Deselect all documentoAvulso
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(documentoAvulsoId): void {
        const selectedDocumentoAvulsoIds = [...this.selectedIds];

        if (selectedDocumentoAvulsoIds.find(id => id === documentoAvulsoId) !== undefined) {
            this.selectedIds = selectedDocumentoAvulsoIds.filter(id => id !== documentoAvulsoId);
        } else {
            this.selectedIds = [...selectedDocumentoAvulsoIds, documentoAvulsoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.documentosAvulsos.length && this.selectedIds.length > 0);
    }

    setFilter(gridFilter): void {
        this.gridFilter = gridFilter;
        this.paginator.pageIndex = 0;
        this.loadPage();
    }

    doCancel(): void {
        this.cancel.emit();
    }

    doCreate(): void {
        this.create.emit();
    }

    getProp(obj, prop): any|boolean {
        if (obj && obj.hasOwnProperty(prop)) {
            return obj[prop];
        }
        return false;
    }

    getMessageError(obj): any {
        return obj?.error?.error?.message;
   }

    visualizarDocumentoAvulso(documentoAvulso: DocumentoAvulso): void {
        this.visualizar.emit(documentoAvulso);
    }

    visualizarDocumentoEditor(doc: Documento): void {
        this.visualizarDocumento.emit(doc);
    }
}
