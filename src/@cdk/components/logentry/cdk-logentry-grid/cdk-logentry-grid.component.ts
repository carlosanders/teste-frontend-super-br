import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit, ViewChild, AfterViewInit,
    ViewEncapsulation, Input, OnChanges, Output, EventEmitter
} from '@angular/core';
import {merge, of} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';

import {MatPaginator, MatSort} from '@angular/material';

import {tap} from 'rxjs/operators';

import {LogEntry} from '@cdk/models/logentry.model';
import {LogEntryDataSource} from '@cdk/data-sources/logentry-data-source';

@Component({
    selector: 'cdk-logentry-grid',
    templateUrl: './cdk-logentry-grid.component.html',
    styleUrls: ['./cdk-logentry-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkLogentryGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    logEntrys: LogEntry[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['id', 'loggedAt', 'username', 'valor'];

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    @Input()
    pageSize = 5;

    @Input()
    actions: string[] = ['edit', 'delete', 'select'];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    edit = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    select = new EventEmitter<LogEntry>();

    @Output()
    selectedIds: number[] = [];

    dataSource: LogEntryDataSource;

    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;

    /**
     * @param _changeDetectorRef
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.gridFilter = {};
        this.logEntrys = [];
    }

    ngOnChanges(): void {
        this.dataSource = new LogEntryDataSource(of(this.logEntrys));
    }

    ngOnInit(): void {

        this.dataSource = new LogEntryDataSource(of(this.logEntrys));
    }

    ngAfterViewInit(): void {

    }

    toggleFilter(): void {
        this.showFilter = !this.showFilter;
        if (!this.showFilter) {
            this.gridFilter = {};
            this.setGridFilter(this.gridFilter);
        }
    }

    loadPage(): void {
        this.reload.emit({
            gridFilter: this.gridFilter,
            limit: this.paginator.pageSize,
            offset: (this.paginator.pageSize * this.paginator.pageIndex),
            sort: this.sort.active ? {[this.sort.active]: this.sort.direction} : {}
        });
    }

    editLogEntry(logEntryId): void {
        this.edit.emit(logEntryId);
    }

    selectLogEntry(logEntry: LogEntry): void {
        this.select.emit(logEntry);
    }

    deleteLogEntry(logEntryId): void {
        this.delete.emit(logEntryId);
    }

    deleteLogsentry(logsentryId): void {
        logsentryId.forEach(logEntryId => this.deleteLogEntry(logEntryId));
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
        this.gridFilter = {
            ...this.gridFilter,
            ...gridFilter
        };

        this.paginator.pageIndex = 0;
        this.loadPage();
    }

    doCancel(): void {
        this.cancel.emit();
    }
}
