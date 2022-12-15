import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {merge, of} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';

import {MatPaginator, MatSort} from '@cdk/angular/material';

import {LogEntry} from '@cdk/models';
import {LogEntryDataSource} from '@cdk/data-sources/logentry-data-source';
import {tap} from 'rxjs/operators';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';

@Component({
    selector: 'cdk-versao-grid',
    templateUrl: './cdk-versao-grid.component.html',
    styleUrls: ['./cdk-versao-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVersaoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    logEntrys: LogEntry[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['id', 'loggedAt', 'username', 'actions'];

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    @Input()
    deletingErrors: any = {};

    @Input()
    pageSize = 10;

    @Input()
    mode = 'list';

    @Input()
    actions: string[] = ['reverter', 'visualizar', 'comparar'];

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    reverter = new EventEmitter<number>();

    @Output()
    visualizar = new EventEmitter<number>();

    @Output()
    comparar = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    selected = new EventEmitter<LogEntry>();

    @Output()
    selectedIds: number[] = [];

    @Output()
    create = new EventEmitter<any>();

    dataSource: LogEntryDataSource;

    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService
    ) {
        this.gridFilter = {};
        this.logEntrys = [];
    }

    ngOnChanges(): void {
        this.dataSource = new LogEntryDataSource(of(this.logEntrys));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();

        this.paginator.pageSize = this.pageSize;
        this.dataSource = new LogEntryDataSource(of(this.logEntrys));
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
        this._cdkSidebarService.getSidebar('cdk-versao-main-sidebar').toggleOpen();
        this.showFilter = !this.showFilter;
    }

    loadPage(): void {
        this.reload.emit({
            gridFilter: this.gridFilter.filters,
            limit: this.paginator.pageSize,
            offset: (this.paginator.pageSize * this.paginator.pageIndex),
            sort: {logId: 'DESC'}
        });
    }

    doReverter(valor): void {
        this.reverter.emit(valor);
    }

    doVisualizar(valor): void {
        this.visualizar.emit(valor);
    }

    doComparar(valor): void {
        this.comparar.emit(valor);
    }

    deleteLogEntry(logEntryId): void {
        this.delete.emit(logEntryId);
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
        const arr = Object.keys(this.logEntrys).map(k => this.logEntrys[k]);
        this.selectedIds = arr.map(logEntry => logEntry.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(logEntryId): void {
        const selectedLogEntryIds = [...this.selectedIds];

        if (selectedLogEntryIds.find(id => id === logEntryId) !== undefined) {
            this.selectedIds = selectedLogEntryIds.filter(id => id !== logEntryId);
        } else {
            this.selectedIds = [...selectedLogEntryIds, logEntryId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.logEntrys.length && this.selectedIds.length > 0);
    }

    setGridFilter(gridFilter): void {
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
}
