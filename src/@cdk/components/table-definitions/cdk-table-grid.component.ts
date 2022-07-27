import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, EventEmitter, Input,
    OnChanges,
    OnInit, Output, QueryList,
    SimpleChanges, ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '../../animations';
import * as _ from 'lodash';
import {TableColumn} from './table-column';
import {_BaseTableDefinitionsProviderService} from './table-definitions-provider.service';
import {TableDefinitionsService} from './table-definitions.service';
import {CdkUsuarioGridColumns} from '../usuario/cdk-usuario-grid/cdk-usuario-grid.columns';
import {debounceTime, distinctUntilChanged, filter, switchMap} from 'rxjs/operators';
import {TableDefinitions} from './table-definitions';
import {
    CdkTableColumnResizableDirective,
    ColumnWidthChangeEvent
} from '../../directives/cdk-header-cell-resizable/cdk-table-column-resizable.directive';
import {of, Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';


@Component({
    selector: '',
    template: '',
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export abstract class CdkTableGridComponent implements OnInit, OnChanges, AfterViewInit {

    @Input() displayedColumns: string[] = [];

    @Input('tableColumns') tableColumns(tableColumns: TableColumn[]) {
        this._tableColumns = tableColumns;
        this._tableColumnsOriginal = _.cloneDeep(tableColumns);
    };

    @Input() tableDefinitionsProvider: _BaseTableDefinitionsProviderService;

    @Input() parentIdentifier: string;

    @Input() resizableColumns: string[] = ['!allTableColumns'];

    @Input() ordableColumns: string[] = ['!allTableColumns'];

    @Output() columnsDefinitionsChange: EventEmitter<TableColumn[]> = new EventEmitter<TableColumn[]>();
    @Output() resetTableDefinitions: EventEmitter<void> = new EventEmitter<void>();
    @ViewChildren(CdkTableColumnResizableDirective, {read: CdkTableColumnResizableDirective}) cdkTableColumnsResizableList: QueryList<CdkTableColumnResizableDirective>;

    protected _tableColumns: TableColumn[] = []
    protected _tableColumnsOriginal: TableColumn[] = [];
    protected _resizing: boolean = false;
    protected _columnsSubscriber: Subscription;

    columns = new FormControl();

    initialized: boolean = false;

    protected constructor(
        protected _tableDefinitionsService: TableDefinitionsService,
        protected _changeDetectorRef: ChangeDetectorRef
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['resizableColumns']) {
            this._processResizableDefinitions();
        }

        if (changes['ordableColumns']) {
            this._processOrdableDefinitions();
        }

        if (changes['displayedColumns']) {
            this._processDisplayableColumns();
        }

        if (changes['tableColumns']) {
            this._processTableColumns();
            this._processColumnsOrder();
        }

        if (changes['tableDefinitionsProvider'] && this.tableDefinitionsProvider) {
            this._tableDefinitionsService.provider = this.tableDefinitionsProvider;
        }
    }

    ngAfterViewInit(): void {
    }

    ngOnInit(): void {
        if (!this.initialized) {
            if (this._columnsSubscriber) {
                this._columnsSubscriber.unsubscribe();
            }
            this._columnsSubscriber = this.columns.valueChanges.pipe(
                debounceTime(300),
                distinctUntilChanged(),
                switchMap((values: string[]) => {
                    const columns = this.getDisplayColumns();
                    const tableWidth = (this.cdkTableColumnsResizableList.toArray() || [])[0]?.getTableWidth();

                    this.getAllTableColumns()
                        .forEach((tableColumn: TableColumn) => tableColumn.definitions.selected = (
                                values.includes(tableColumn.id)
                                || (tableColumn.definitions.selected && tableColumn.definitions.fixed)
                            )
                        );

                    this._columnsDefinitionsChange(this._tableColumns);

                    return of({
                        tableWidth: tableWidth,
                        columns: columns,
                        values: values
                    });
                })
            ).subscribe(({tableWidth, columns, values}) => {
                if (tableWidth) {
                    this.getDisplayColumns()
                        .filter((id) => !columns.includes(id))
                        .forEach((id) => {
                            setTimeout(() => {
                                const column = (this.cdkTableColumnsResizableList.toArray() || [])
                                    .find((col) => col.tableColumn.id === id);

                                if (column) {
                                    column.tableColumn.definitions.width = 0;
                                    this._processPreventOverflow({
                                        ...column.resizeColumnTo(column.tableColumn.definitions.width),
                                        tableOldWidth: tableWidth
                                    });
                                    this._columnsDefinitionsChange(this._tableColumns);
                                    this._changeDetectorRef.markForCheck();
                                }
                            });
                        });
                }

                this._changeDetectorRef.markForCheck();
            });

            this._processResizableDefinitions();
            this._processOrdableDefinitions();
            this._processDisplayableColumns();
            this._processTableColumns();
            this._processColumnsOrder();

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
                                    tableColumn.definitions = {...cachedTableColumn.definitions}
                                }
                            });
                        }
                        this._processResizableDefinitions();
                        this._processOrdableDefinitions();
                        this._processTableColumns();
                        this._processColumnsOrder();
                        this._changeDetectorRef.markForCheck();
                    });
            }
            this.initialized = true;
        }
    }

    protected _processTableDefinitionsVersionChange(tableDefinitions: TableDefinitions): void {
        //processes version change...
    }

    protected _processPreventOverflow(event: ColumnWidthChangeEvent): void {
        if (event.tableOldWidth < event.tableNewWitdh) {
            let widthDiff = event.tableNewWitdh - event.tableOldWidth;
            let columns = (this.cdkTableColumnsResizableList?.toArray() ?? []);
            const index = columns.findIndex((col) => col.tableColumn.id === event.tableColumn.id);
            let breakExecution = false;

            [
                // fordward
                ...columns
                .slice(index+1) //not me
                .filter((col) => col.tableColumn.definitions.resizable && col.tableColumn.definitions.width > 0),
                //backward
                ...columns
                    .slice(0, index)
                    .filter((col) => col.tableColumn.definitions.resizable && col.tableColumn.definitions.width > 0)
                    .reverse()
            ]
                .forEach((col) => {
                    col.tableColumn.definitions.width = widthDiff > col.tableColumn.definitions.width
                        ? 0 : col.tableColumn.definitions.width - widthDiff;

                    const data = col.resizeColumnTo(col.tableColumn.definitions.width);
                    if (data.tableOldWidth > data.tableNewWitdh) {
                        breakExecution = true;
                        return;
                    }
                });

            if (!breakExecution) {
                event.tableColumn.definitions.width = event.newWidth - widthDiff;
                event.scope.resizeColumnTo(event.tableColumn.definitions.width);
            }
            this._changeDetectorRef.markForCheck();
        }
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
        this.columnsDefinitionsChange.emit(this._tableColumns);
    }

    private _processTableColumns(): void {
        this.columns.setValue(
            this.getDisplayableTableColumns()
                .filter((tableColumn: TableColumn) => tableColumn.definitions.selected)
                .map((tableColumn: TableColumn) => tableColumn.id),
            {emitEvent: false}
        );
    }

    private _processResizableDefinitions(): void {
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

    private _processOrdableDefinitions(): void {
        this._tableColumns.forEach((tableColumn: TableColumn) => {
            if ((this.ordableColumns.indexOf('allTableColumns') > -1 || this.ordableColumns.indexOf(tableColumn.id) > -1)) {
                tableColumn.definitions.ordable = true;
            }
            if (this.ordableColumns.indexOf('!allTableColumns') > -1 || this.ordableColumns.indexOf('!'+tableColumn.id) > -1 || tableColumn.positionFixed) {
                tableColumn.definitions.ordable = false;
            }
        });
    }

    private _processDisplayableColumns(): void {
        this.displayedColumns.forEach((id: string, toIndex: number) => {
            let fromIndex = this._tableColumns.findIndex((tableColumn: TableColumn) => tableColumn.id == id);
            if (fromIndex != -1) {
                this._tableColumns.splice(toIndex, 0, this._tableColumns.splice(fromIndex, 1)[0]);
            }
        });

        let orderSum = 0;
        this._tableColumns.forEach((tableColumn: TableColumn) => {
            tableColumn.definitions.selected = this.displayedColumns.includes(tableColumn.id);
            tableColumn.definitions.excluded = !this.displayedColumns.includes(tableColumn.id) && tableColumn.definitions.fixed;
            orderSum += 10;
            if (tableColumn.definitions.order != -1 && (tableColumn.definitions.ordable || this.displayedColumns.indexOf(tableColumn.id) != -1) && !tableColumn.positionFixed) {
                tableColumn.definitions.order = orderSum;
            }
        });
    }

    private _processColumnsOrder(): void {
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
            .filter((column: TableColumn) => !column.definitions.fixed);
    }

    getDisplayColumns(): string[] {
        return this.getTableSelectedColumns()
            .map((tableColumn: TableColumn) => tableColumn.id);
    }

    getTableSelectedColumns(): TableColumn[] {
        return this.getAllTableColumns()
            .filter((column: TableColumn) => column.definitions.selected);
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
    }

    resizingColumn(event: ColumnWidthChangeEvent|null): void {
        this._resizing = event !== null;
        if (this._resizing) {
            this._processPreventOverflow(event);
        }
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
            this._processColumnsOrder();
            this._columnsDefinitionsChange(this._tableColumns);
        }
    }

    dndDisable(tableColumn: TableColumn): boolean {
        return this._resizing || !tableColumn.definitions.ordable || tableColumn.positionFixed;
    }

    resetTableColumns(): void {
        this._tableColumns.map((tableColumn: TableColumn) => tableColumn.definitions = {...(this._tableColumnsOriginal.find((column: TableColumn) => column.id == tableColumn.id))?.definitions});
        this._processResizableDefinitions();
        this._processOrdableDefinitions();
        this._processDisplayableColumns();
        this._processTableColumns();
        this._processColumnsOrder();
        this._columnsDefinitionsChange(this._tableColumns);
        this._changeDetectorRef.markForCheck();
        this.resetTableDefinitions.emit();
    }
}
