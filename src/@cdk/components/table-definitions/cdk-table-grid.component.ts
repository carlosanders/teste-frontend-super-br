import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, EventEmitter, Input,
    OnChanges,
    OnInit, Output, QueryList,
    SimpleChanges, ViewChild, ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '../../animations';
import * as _ from 'lodash';
import {TableColumn} from './table-column';
import {CdkUsuarioGridColumns} from '../usuario/cdk-usuario-grid/cdk-usuario-grid.columns';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {TableDefinitions} from './table-definitions';
import {
    CdkTableColumnResizableDirective,
    ColumnWidthChangeEvent
} from '../../directives/cdk-header-cell-resizable/cdk-table-column-resizable.directive';
import {of, Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';
import {MatPaginator, MatSort} from '../../angular/material';

@Component({
    selector: '',
    template: '',
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export abstract class CdkTableGridComponent implements OnInit, OnChanges, AfterViewInit {

    @Input() set displayedColumns(displayedColumns: string[]) {
        this._displayedColumns = displayedColumns;
        this._originalDisplayedColumns = displayedColumns;
        this._processDisplayableDefinitions();
        this._processOrderDefinitions();
        this.processAllColumnsDefinitions();
    }
    @Input('tableColumns') set tableColumns(tableColumns: TableColumn[]) {
        this._tableColumns = _.cloneDeep(tableColumns);
        this._originalTableColumns = _.cloneDeep(tableColumns);
        this.processAllColumnsDefinitions();
    }
    @Input() tableDefinitions: TableDefinitions = new TableDefinitions();
    @Input() resizableColumns: string[] = ['!allTableColumns'];
    @Input() ordableColumns: string[] = ['!allTableColumns'];
    @Input() pageSize: number = 10;

    @Output() tableDefinitionsChange: EventEmitter<TableDefinitions> = new EventEmitter<TableDefinitions>();
    @Output() resetTableDefinitions: EventEmitter<void> = new EventEmitter<void>();

    @ViewChildren(CdkTableColumnResizableDirective, {read: CdkTableColumnResizableDirective}) cdkTableColumnsResizableList: QueryList<CdkTableColumnResizableDirective>;
    @ViewChild(MatPaginator, {static: false}) set _paginator(paginator: MatPaginator) {
        if (paginator) {
            if (!this.paginator) {
                this.paginator = paginator;
                this.paginator.pageSize = this.pageSize || 10;
                this.paginator.page
                    .pipe(
                        tap(() => this._tablePaginatorPageChange(paginator))
                    ).subscribe();
            }
            this.setTablePaginatorData(this.paginator);
        } else {
            this.paginator = paginator;
        }
        this._changeDetectorRef.detectChanges();
    };
    @ViewChild(MatSort, {static: false}) set _sort(sort: MatSort) {
        if (sort && !this.sort) {
            this.sort = sort;
            this.setTableSortData(this.sort);
            // reset the paginator after sorting
            this.sort.sortChange
                .pipe(
                    tap(() => this._tableColumnSortChange(this.sort, this.paginator))
                )
                .subscribe(() => this.paginator.pageIndex = 0);
        } else {
            this.sort = sort;
        }
    };

    protected _resizing: boolean = false;
    protected _columnsSubscriber: Subscription;
    protected _tableColumns: TableColumn[] = []
    protected _displayedColumns: string[] = [];
    protected _originalDisplayedColumns: string[] = [];
    protected _originalTableColumns: TableColumn[] = []
    protected _autoCleanNotDefaultColumns: boolean = true;

    paginator: MatPaginator;
    sort: MatSort;
    columns = new FormControl();

    protected constructor(protected _changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['resizableColumns'] || changes['ordableColumns'] || changes['displayedColumns'] || changes['tableColumns'] || changes['tableDefinitions']) {
            this.processAllColumnsDefinitions();
        }

        this._changeDetectorRef.markForCheck();
    }

    ngAfterViewInit(): void {
    }

    ngOnInit(): void {
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

                this.tableDefinitions.columns = _.cloneDeep(this._tableColumns);
                this._tableDefinitionsChange(this.tableDefinitions);

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
                                this.tableDefinitions.columns = _.cloneDeep(this._tableColumns);
                                this._tableDefinitionsChange(this.tableDefinitions);
                                this._changeDetectorRef.markForCheck();
                            }
                        });
                    });
            }

            this._changeDetectorRef.markForCheck();
        });

        this.processAllColumnsDefinitions();
    }

    /**
     * Methor called every time pagination change page event
     * Override and implement data load, in child component.
     * ### Example:
     * ```typescript
     * export class ChildComponent extends CdkTableGridComponent {
     *      protected _tablePaginatorPageChange(paginator: MatPaginator): void {
     *          super._tablePaginatorPageChange(paginator);
     *          this.loadPage(
     *              {
     *                 limit: paginator.pageSize,
     *                 offset: (paginator.pageSize * paginator.pageIndex)
     *              }
     *          );
     *      }
     * }
     *  ```
     * @param paginator
     */
    protected _tablePaginatorPageChange(paginator: MatPaginator): void {
        this.tableDefinitions.limit = paginator.pageSize;
        this._tableDefinitionsChange(this.tableDefinitions);
    }

    /**
     * Methor called first time pagination loaded in view (prevent dynamic loading)
     * Override and implement set paginator data, in child component.
     * ### Example:
     * ```typescript
     * export class ChildComponent extends CdkTableGridComponent {
     *      setTablePaginatorData(paginator: MatPaginator): void {
     *          super.setTablePaginatorData(paginator: MatPaginator);
     *          paginator.length = this.pagination.total;
     *          paginator.pageSize = this.pagination.limit;
     *          paginator.pageIndex = this.pagination.offset / this.pagination.limit;
     *      }
     * }
     *  ```
     * @param paginator
     */
    setTablePaginatorData(paginator: MatPaginator): void {
    }

    /**
     * Methor called every time pagination change page event
     * Override and implement data load, in child component.
     * ### Example:
     * ```typescript
     * export class ChildComponent extends CdkTableGridComponent {
     *      protected _tableColumnSortChange(sort: MatSort, paginator: MatPaginator): void {
     *          super._tableColumnSortChange(sort, paginator);
     *          this.loadPage(
     *              {
     *                 limit: paginator.pageSize,
     *                 offset: (paginator.pageSize * paginator.pageIndex),
     *                 sort: this.tableDefinitions.sort
     *                 //OR sort.active ? {[sort.active]: sort.direction} : {};
     *              }
     *          );
     *      }
     * }
     *  ```
     * @param sort
     * @param paginator
     */
    protected _tableColumnSortChange(sort: MatSort, paginator: MatPaginator): void {
        this.tableDefinitions.sort = this.sort.active ? {[this.sort.active]: this.sort.direction} : null;
        this.tableDefinitions.limit = this.paginator?.pageSize || 10;
        this.tableDefinitions.version = CdkUsuarioGridColumns.version;
        this._tableDefinitionsChange(this.tableDefinitions);
    }

    setTableSortData(sort: MatSort): void {
        this.sort.active = null;
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

    protected _tableDefinitionsChange(tableDefinitions: TableDefinitions): void {
        this.tableDefinitionsChange.emit(tableDefinitions);
    }

    protected _processTableColumns(): void {
        this.columns.setValue(
            this.getDisplayableTableColumns()
                .filter((tableColumn: TableColumn) => tableColumn.definitions.selected)
                .map((tableColumn: TableColumn) => tableColumn.id),
            {emitEvent: false}
        );
    }

    protected _processResizableDefinitions(): void {
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

    protected _processOrdableDefinitions(): void {
        this._tableColumns.forEach((tableColumn: TableColumn) => {
            if ((this.ordableColumns.indexOf('allTableColumns') > -1 || this.ordableColumns.indexOf(tableColumn.id) > -1)) {
                tableColumn.definitions.ordable = true;
            }
            if (this.ordableColumns.indexOf('!allTableColumns') > -1 || this.ordableColumns.indexOf('!'+tableColumn.id) > -1 || tableColumn.positionFixed) {
                tableColumn.definitions.ordable = false;
            }
        });
    }

    protected _processOrderDefinitions(columnsOrder = this._displayedColumns): void {
        columnsOrder.forEach((id: string, toIndex: number) => {
            let fromIndex = this._tableColumns.findIndex((tableColumn: TableColumn) => tableColumn.id == id);
            if (fromIndex != -1) {
                this._tableColumns.splice(toIndex, 0, this._tableColumns.splice(fromIndex, 1)[0]);
            }
        });

        let orderSum = 0;
        this._tableColumns.forEach((tableColumn: TableColumn) => {
            orderSum += 10;
            if (tableColumn.definitions.order != -1 && (tableColumn.definitions.ordable || this._displayedColumns.indexOf(tableColumn.id) != -1) && !tableColumn.positionFixed) {
                tableColumn.definitions.order = orderSum;
            }
        });

        this._tableColumns = this._tableColumns.sort((columnA: TableColumn, columnB: TableColumn) => {
            if (columnA.definitions.order > columnB.definitions.order) {
                return 1;
            }

            if (columnA.definitions.order < columnB.definitions.order) {
                return -1;
            }

            return 0;
        });
    }

    protected _processDisplayableDefinitions(): void {
        this._tableColumns.forEach((tableColumn: TableColumn) => {
            tableColumn.definitions.selected = this._displayedColumns.includes(tableColumn.id);
        });
    }

    processAllColumnsDefinitions(): void {
        this._processResizableDefinitions();
        this._processOrdableDefinitions();
        this._processMergeTableDefinitions();
        this._processOrderDefinitions(
            this.tableDefinitions.columns
                .sort((columnA: TableColumn, columnB: TableColumn) => {
                    if (columnA.definitions.order > columnB.definitions.order) {
                        return 1;
                    }

                    if (columnA.definitions.order < columnB.definitions.order) {
                        return -1;
                    }

                    return 0;
                })
                .map((tableColumn) => tableColumn.id)
        );
        this._processTableColumns();
        this._changeDetectorRef.markForCheck();
    }

    protected _processMergeTableDefinitions(): void {
        if (this.tableDefinitions.version != CdkUsuarioGridColumns.version) {
            this._processTableDefinitionsVersionChange(this.tableDefinitions);
        }

        this.tableDefinitions.columns.forEach((userColumnDefinitions, index) => {
            const defaultColumnDefinitions = this._tableColumns
                .find((tableColumn) => tableColumn.id === userColumnDefinitions?.id);

            if (this._autoCleanNotDefaultColumns && !defaultColumnDefinitions) {
                delete this.tableDefinitions.columns[index];
            }

            if (defaultColumnDefinitions) {
                defaultColumnDefinitions.definitions.selected = userColumnDefinitions.definitions.selected && this._displayedColumns.includes(userColumnDefinitions.id);

                if (defaultColumnDefinitions.definitions.order != -1 && (defaultColumnDefinitions.definitions.ordable
                    || this._displayedColumns.indexOf(defaultColumnDefinitions.id) != -1) && !defaultColumnDefinitions.positionFixed) {

                    defaultColumnDefinitions.definitions.order = userColumnDefinitions.definitions.order;
                }

                defaultColumnDefinitions.definitions.width = (defaultColumnDefinitions.definitions.resizable ? userColumnDefinitions.definitions.width : defaultColumnDefinitions.definitions.width) || 0;
                defaultColumnDefinitions.definitions.selected = userColumnDefinitions.definitions.selected;
            }
        });
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
        const index = this._tableColumns.findIndex((tableColumn: TableColumn) => tableColumn.id == event.tableColumn.id);
        this._tableColumns[index] = event.tableColumn;
        this.tableDefinitions.columns = _.cloneDeep(this._tableColumns);
        this._tableDefinitionsChange(this.tableDefinitions);
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

            this._processOrderDefinitions(
                this._tableColumns
                    .sort((columnA: TableColumn, columnB: TableColumn) => {
                        if (columnA.definitions.order > columnB.definitions.order) {
                            return 1;
                        }

                        if (columnA.definitions.order < columnB.definitions.order) {
                            return -1;
                        }

                        return 0;
                    })
                    .map((tableColumn) => tableColumn.id)
            );
            this.tableDefinitions.columns = _.cloneDeep(this._tableColumns);
            this._tableDefinitionsChange(this.tableDefinitions);
        }
    }

    dndDisable(tableColumn: TableColumn): boolean {
        return this._resizing || !tableColumn.definitions.ordable || tableColumn.positionFixed;
    }

    resetTableColumns(): void {
        this._displayedColumns = this._originalDisplayedColumns;
        this.tableDefinitions.columns = [];
        this.tableColumns = _.cloneDeep(this._originalTableColumns);
        this.cdkTableColumnsResizableList.forEach((column) => {
            column.resizeColumnTo(0);
        })
        this._processDisplayableDefinitions();
        this._processOrderDefinitions();
        this.processAllColumnsDefinitions();
        this.tableDefinitions.sort = null;
        this.tableDefinitions.limit = null;
        this.tableDefinitions.data = null;
        if (this.sort) {
            this.setTableSortData(this.sort);
        }
        this.tableDefinitions.columns = _.cloneDeep(this._tableColumns);
        this._tableDefinitionsChange(this.tableDefinitions);
        this.resetTableDefinitions.emit();
        this._changeDetectorRef.markForCheck();
    }
}
