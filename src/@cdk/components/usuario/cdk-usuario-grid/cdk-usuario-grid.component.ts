import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ComponentFactoryResolver,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output, SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {merge, of} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {MatPaginator, MatSort} from '@cdk/angular/material';
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from 'rxjs/operators';

import {Usuario} from '@cdk/models';
import {UsuarioDataSource} from '@cdk/data-sources/usuario-data-source';
import {FormControl} from '@angular/forms';
import {TableColumn} from '../../table-definitions/table-column';
import {
    ColumnWidthChangeEvent
} from '@cdk/directives/cdk-header-cell-resizable/cdk-table-column-resizable.directive';
import {CdkUsuarioGridColumns} from './cdk-usuario-grid.columns';
import {_BaseTableDefinitionsProviderService} from '../../table-definitions/table-definitions-provider.service';
import {TableDefinitionsService} from '../../table-definitions/table-definitions.service';
import {TableDefinitions} from '../../table-definitions/table-definitions';

@Component({
    selector: 'cdk-usuario-grid',
    templateUrl: './cdk-usuario-grid.component.html',
    styleUrls: ['./cdk-usuario-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkUsuarioGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    usuarios: Usuario[];

    @Input()
    externo: boolean;

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    @Input()
    deletingErrors: any = {};

    @Input()
    pageSize = 10;

    @Input()
    actions: string[] = ['edit', 'delete', 'select', 'lotacoes', 'afastamentos', 'vincularPessoa', 'distribuirTarefas'];

    @Input('displayedColumns') set displayedColumns(columns: string[]) {
        columns.forEach((id: string, toIndex: number) => {
            let fromIndex = this._tableColumns.findIndex((tableColumn: TableColumn) => tableColumn.id == id);
            if (fromIndex != -1) {
                this._tableColumns.splice(toIndex, 0, this._tableColumns.splice(fromIndex, 1)[0]);
            }
        });

        let orderSum = 0;
        this._tableColumns.forEach((tableColumn: TableColumn) => {
            tableColumn.definitions.selected = columns.includes(tableColumn.id);
            tableColumn.definitions.excluded = !columns.includes(tableColumn.id) && tableColumn.definitions.fixed;
            orderSum += 10;
            if (tableColumn.definitions.order != -1 && tableColumn.definitions.ordable) {
                tableColumn.definitions.order = orderSum;
            }
        });
        this._checkColumnsOrder();
    };

    @Input() tableColumns: TableColumn[] = [];

    @Input() tableDefinitionsProvider: _BaseTableDefinitionsProviderService;

    @Input() parentIdentifier: string;

    @Input() resizableColumns: string[] = ['!allTableColumns'];

    @Input() ordableColumns: string[] = ['!allTableColumns'];

    @Output()
    create = new EventEmitter<any>();

    @Output()
    excluded = new EventEmitter<any>();
    
    @Output()
    reload = new EventEmitter<any>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    edit = new EventEmitter<number>();

    @Output()
    lotacoes = new EventEmitter<number>();

    @Output()
    afastamentos = new EventEmitter<number>();

    @Output()
    resetaSenhaColaborador = new EventEmitter<number>();

    @Output()
    resetaSenha = new EventEmitter<number>();

    @Output()
    coordenadores = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    deleteBlocoEmmitter = new EventEmitter<number[]>();

    @Output()
    vincular = new EventEmitter<number>();

    @Output()
    vincularRole = new EventEmitter<number>();

    @Output()
    distribuirTarefas = new EventEmitter<Usuario>();

    @Output()
    selected = new EventEmitter<Usuario>();

    @Output()
    selectedIds: number[] = [];

    @Output() columnsDefinitionsChange: EventEmitter<TableColumn[]> = new EventEmitter<TableColumn[]>();

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    columns = new FormControl();
    dataSource: UsuarioDataSource;
    showFilter = false;
    gridFilter: any;
    hasSelected = false;
    isIndeterminate = false;
    hasExcluded = false;
    temDistribuidor = false;
    _tableColumns: TableColumn[] = [...CdkUsuarioGridColumns.columns];
    resizing: boolean = false;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _tableDefinitionsService: TableDefinitionsService,
        public componentFactoryResolver: ComponentFactoryResolver
    ) {
        this.gridFilter = {};
        this.usuarios = [];
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.dataSource = new UsuarioDataSource(of(this.usuarios));
        this.paginator.length = this.total;

        if (changes['tableColumns'] && this.tableColumns) {
            let tableColumns = [];
            this._tableColumns.forEach((tableColumn: TableColumn) => {
                let changeColumn = this.tableColumns.find((column) => column.id == tableColumn.id);
                let mergedValues = tableColumn;
                if (changeColumn) {
                    mergedValues = {
                        ...tableColumn,
                        definitions: {
                            ...tableColumn.definitions,
                            ...changeColumn.definitions
                        }
                    };
                }
                tableColumns.push(mergedValues);
            });

            this._tableColumns = tableColumns;

            this._checkColumnsOrder();
            this.columns.setValue(
                this.getDisplayableTableColumns()
                    .filter((tableColumn: TableColumn) => tableColumn.definitions.selected)
                    .map((tableColumn: TableColumn) => tableColumn.id)
            );
        }

        if (changes['resizableColumns']) {
            this._checkResizableDefinitions();
        }

        if (changes['ordableColumns']) {
            this._checkOrdableDefinitions();
        }

        if (changes['tableDefinitionsProvider'] && this.tableDefinitionsProvider) {
            this._tableDefinitionsService.provider = this.tableDefinitionsProvider;
        }
    }

    ngOnInit(): void {
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';
        this.paginator._intl.firstPageLabel = 'Primeiro';
        this.paginator._intl.lastPageLabel = 'Último';

        this.paginator.pageSize = this.pageSize;
        this._checkColumnsOrder();

        this.dataSource = new UsuarioDataSource(of(this.usuarios));

        this.columns.setValue(
            this.getDisplayableTableColumns()
                .filter((tableColumn: TableColumn) => tableColumn.definitions.selected)
                .map((tableColumn: TableColumn) => tableColumn.id)
        );

        this.columns.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((values: string[]) => {
                this.getAllTableColumns().forEach((tableColumn: TableColumn) => {
                    tableColumn.definitions.selected = values
                        .includes(tableColumn.id) || (tableColumn.definitions.selected && (tableColumn.definitions.fixed || tableColumn.definitions.slave));
                });
                this._columnsDefinitionsChange(this._tableColumns);
                this.columnsDefinitionsChange.emit(this._tableColumns);
                this._changeDetectorRef.markForCheck();
                return of([]);
            })
        ).subscribe();

        if (this.parentIdentifier) {
            this._tableDefinitionsService
                .getTableDefinitions(
                    this._tableDefinitionsService
                        .generateTableDeinitionIdentifier([this.parentIdentifier, this.constructor.name])
                )
                .pipe(filter((definitions: TableDefinitions) => !!definitions))
                .subscribe((definitions: TableDefinitions) => {
                    if (definitions.version != CdkUsuarioGridColumns.version) {
                        this._processTableDefinitionsVersionChange(definitions);
                    } else {
                        this._tableColumns.forEach((tableColumn: TableColumn) => {
                            const cachedTableColumn = definitions.columns.find((column) => column.id == tableColumn.id);
                            if (cachedTableColumn) {
                                tableColumn.definitions = {
                                    ...tableColumn.definitions,
                                    ...cachedTableColumn.definitions
                                }
                            }
                        });
                    }
                    this.columns.setValue(
                        this.getDisplayableTableColumns()
                            .filter((tableColumn: TableColumn) => tableColumn.definitions.selected)
                            .map((tableColumn: TableColumn) => tableColumn.id)
                    );
                    this._checkResizableDefinitions();
                    this._checkOrdableDefinitions();
                    this._checkColumnsOrder();
                    this._changeDetectorRef.markForCheck();
                });
        }
        this._checkResizableDefinitions();
        this._checkOrdableDefinitions();
    }

    ngAfterViewInit(): void {
        // reset the paginator after sorting
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        merge(
            this.sort.sortChange,
            this.paginator.page
        ).pipe(
            tap(() => this.loadPage())
        ).subscribe();
    }

    toggleFilter(): void {
        this._cdkSidebarService.getSidebar('cdk-usuario-filter').toggleOpen();
        this.showFilter = !this.showFilter;
    }

    loadPage(): void {
        const filter = this.gridFilter.filters;
        const contexto = this.gridFilter.contexto ? this.gridFilter.contexto : null;
        this.reload.emit({
            gridFilter: filter,
            limit: this.paginator.pageSize,
            offset: (this.paginator.pageSize * this.paginator.pageIndex),
            sort: this.sort.active ? {[this.sort.active]: this.sort.direction} : {},
            context: contexto
        });
        this.hasExcluded = false;
    }

    loadExcluded(): void {
        this.hasExcluded = !this.hasExcluded;
        if (this.hasExcluded) {
            const filter = this.gridFilter.filters;
            this.excluded.emit({
                gridFilter: filter,
                limit: this.paginator.pageSize,
                offset: (this.paginator.pageSize * this.paginator.pageIndex),
                sort: this.sort.active ? {[this.sort.active]: this.sort.direction} : {},
                context: {mostrarApagadas: true}
            });
        }
        else {
            this.loadPage();
        }
    }

    editUsuario(usuarioId): void {
        this.edit.emit(usuarioId);
    }

    lotacoesUsuario(usuarioId): void {
        this.lotacoes.emit(usuarioId);
    }

    afastamentosUsuario(usuarioId): void {
        this.afastamentos.emit(usuarioId);
    }

    coordenacoesUsuario(usuarioId): void {
        this.coordenadores.emit(usuarioId);
    }

    vincularPessoa(usuarioId): void {
        this.vincular.emit(usuarioId);
    }

    selectUsuario(usuario: Usuario): void {
        this.selected.emit(usuario);
    }

    deleteUsuario(usuarioId): void {
        this.delete.emit(usuarioId);
    }

    redefineSenha(usuarioId): void {
        this.resetaSenha.emit(usuarioId);
    }

    redefineSenhaColaborador(usuarioId): void {
        this.resetaSenhaColaborador.emit(usuarioId);
    }

    deleteBloco(ids): void {
        this.deleteBlocoEmmitter.emit(ids);
    }

    vincularUsuarioRole(usuarioId): void {
        this.vincularRole.emit(usuarioId);
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
        const arr = Object.keys(this.usuarios).map(k => this.usuarios[k]);
        this.selectedIds = arr.map(usuario => usuario.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(usuarioId): void {
        const selectedUsuarioIds = [...this.selectedIds];

        if (selectedUsuarioIds.find(id => id === usuarioId) !== undefined) {
            this.selectedIds = selectedUsuarioIds.filter(id => id !== usuarioId);
        } else {
            this.selectedIds = [...selectedUsuarioIds, usuarioId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.usuarios.length && this.selectedIds.length > 0);
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

    doDistribuirTarefas(usuario: Usuario): void {
        this.distribuirTarefas.emit(usuario);
    }

    private _columnsDefinitionsChange(tableColumns: TableColumn[]): void {
        if (this.parentIdentifier) {
            const tableDefinitions = new TableDefinitions();

            tableDefinitions.identifier = this._tableDefinitionsService
                .generateTableDeinitionIdentifier([
                    this.parentIdentifier,
                    this.constructor.name
                ]);
            tableDefinitions.version = CdkUsuarioGridColumns.version;
            tableDefinitions.columns = tableColumns;

            this._tableDefinitionsService.saveTableDefinitions(tableDefinitions);
        }
    }

    private _checkResizableDefinitions(): void {
        this._tableColumns.forEach((tableColumn: TableColumn) => {
            if (this.resizableColumns.indexOf('allTableColumns') > -1 || this.resizableColumns.indexOf(tableColumn.id) > -1) {
                tableColumn.definitions.resizable = true;
            }
            if (this.resizableColumns.indexOf('!allTableColumns') > -1 || this.resizableColumns.indexOf('!'+tableColumn.id) > -1) {
                tableColumn.definitions.resizable = false;
                tableColumn.definitions.width = 0;
            }
        });
    }

    private _checkOrdableDefinitions(): void {
        this._tableColumns.forEach((tableColumn: TableColumn) => {
            if ((this.ordableColumns.indexOf('allTableColumns') > -1 || this.ordableColumns.indexOf(tableColumn.id) > -1)) {
                tableColumn.definitions.ordable = true;
            }
            if (this.ordableColumns.indexOf('!allTableColumns') > -1 || this.ordableColumns.indexOf('!'+tableColumn.id) > -1 || tableColumn.positionFixed) {
                tableColumn.definitions.ordable = false;
            }
        });
    }

    private _processTableDefinitionsVersionChange(tableDefinitions: TableDefinitions): void {
        //processes version change...
    }

    private _checkColumnsOrder(): void {
        this._tableColumns = this._tableColumns.sort((columnA: TableColumn, columnB: TableColumn) => {
            if (columnA.definitions.order > columnB.definitions.order) {
                return 1;
            }

            if (columnA.definitions.order < columnB.definitions.order) {
                return -1;
            }

            return 0;
        })
        this._changeDetectorRef.markForCheck();
    }

    getDisplayableTableColumns(): TableColumn[] {
        return this.getAllTableColumns()
            .filter((column: TableColumn) => !column.definitions.slave && !column.definitions.fixed);
    }

    getDisplayColumns(): string[] {
        return this.getAllTableColumns()
            .filter((column: TableColumn) => column.definitions.selected)
            .map((tableColumn: TableColumn) => tableColumn.id);
    }

    getTableColumnsList(): TableColumn[] {
        return this.getAllTableColumns()
            .filter((column: TableColumn) => column.definitions.selected && !column.definitions.slave);
    }

    getAllTableColumns(): TableColumn[] {
        return this._tableColumns
            .filter((column: TableColumn) => !column.definitions.excluded);
    }

    getColumnTableColumn(id: string): TableColumn {
        return this._tableColumns
            .find((tableColumn: TableColumn) => tableColumn.id == id) || null;
    }

    columnChageWidth(event: ColumnWidthChangeEvent): void {
        this._columnsDefinitionsChange(this._tableColumns);
        this.columnsDefinitionsChange.emit(this._tableColumns);
    }

    resizingColumn(resizing: boolean): void {
        this.resizing = resizing;
    }

    onDrop(tableColumnTarget: TableColumn, tableColumnOrigin: TableColumn): void {
        if (tableColumnTarget.id != tableColumnOrigin.id) {
            const fromIndex = this._tableColumns.findIndex((tableColumn: TableColumn) => tableColumn.id == tableColumnOrigin.id);
            const toIndex = this._tableColumns.findIndex((tableColumn: TableColumn) => tableColumn.id == tableColumnTarget.id);
            this._tableColumns.splice(toIndex, 0, this._tableColumns.splice(fromIndex, 1)[0]);
            let orderSum = 0;
            this._tableColumns.forEach((tableColumn: TableColumn) => {
                orderSum += 10;
                if (tableColumn.definitions.order != -1 && tableColumn.definitions.ordable) {
                    tableColumn.definitions.order = orderSum;
                }
            });
            this._checkColumnsOrder();
            this._columnsDefinitionsChange(this._tableColumns);
            this.columnsDefinitionsChange.emit(this._tableColumns);
        }
    }

    dndDisable(tableColumn: TableColumn): boolean {
        console.log('dnd disable?', this.resizing, tableColumn.headerLabel, tableColumn.definitions)
        return this.resizing || !tableColumn.definitions.ordable || tableColumn.positionFixed;
    }
}
