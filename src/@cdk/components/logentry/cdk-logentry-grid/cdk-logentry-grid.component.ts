import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit, ViewChild, AfterViewInit,
    ViewEncapsulation, Input, OnChanges, Output, EventEmitter
} from '@angular/core';
import {merge, of} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';

import {MatPaginator, MatSort} from '@cdk/angular/material';

import {LogEntry} from '@cdk/models/logentry.model';
import {LogEntryDataSource} from '@cdk/data-sources/logentry-data-source';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';

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

    allColumns: any[] = [
        {
            id: 'select',
            label: '',
            fixed: true
        },
        {
            id: 'id',
            label: 'Id',
            fixed: true
        },
        {
            id: 'username',
            label: 'Usuário',
            fixed: true
        },
        {
            id: 'loggedAt',
            label: 'Logado Em',
            fixed: false
        },
        {
            id: 'valor',
            label: 'Valor',
            fixed: false
        },
        {
            id: 'action',
            label: 'Ação',
            fixed: false
        },
        {
            id: 'objectClass',
            label: 'Classe de Objeto',
            fixed: false
        },
        {
            id: 'data',
            label: 'Dados',
            fixed: false
        },
        {
            id: 'criadoPor.nome',
            label: 'Criado Por',
            fixed: false
        },
        {
            id: 'criadoEm',
            label: 'Criado Em',
            fixed: false
        },
        {
            id: 'atualizadoPor.nome',
            label: 'Atualizado Por',
            fixed: false
        },
        {
            id: 'atualizadoEm',
            label: 'Atualizado Em',
            fixed: false
        },
        {
            id: 'apagadoPor.nome',
            label: 'Apagado Por',
            fixed: false
        },
        {
            id: 'apagadoEm',
            label: 'Apagado Em',
            fixed: false
        },
        {
            id: 'actions',
            label: '',
            fixed: true
        }
    ];

    columns = new FormControl();

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    @Input()
    pageSize = 5;

    @Input()
    actions: string[] = ['edit', 'delete', 'select'];

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
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
    selected = new EventEmitter<LogEntry>();

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
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseSidebarService: FuseSidebarService
    ) {
        this.gridFilter = {};
        this.logEntrys = [];
    }

    ngOnChanges(): void {
        this.dataSource = new LogEntryDataSource(of(this.logEntrys));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
        const ElementQueries = require('css-element-queries/src/ElementQueries');
        ElementQueries.listen();
        ElementQueries.init();

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new LogEntryDataSource(of(this.logEntrys));

        this.columns.setValue(this.allColumns.map(c => c.id).filter(c => this.displayedColumns.indexOf(c) > -1));

        this.columns.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((values) => {
                this.displayedColumns = [];
                this.allColumns.forEach(c => {
                    if (c.fixed || (values.indexOf(c.id) > -1)) {
                        this.displayedColumns.push(c.id);
                    }
                });
                this._changeDetectorRef.markForCheck();
                return of([]);
            })
        ).subscribe();

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
        this._fuseSidebarService.getSidebar('cdk-logentry-main-sidebar').toggleOpen();
        this.showFilter = !this.showFilter;
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
        this.selected.emit(logEntry);
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
        this.gridFilter = gridFilter;
        this.paginator.pageIndex = 0;
        this.loadPage();
    }

    doCancel(): void {
        this.cancel.emit();
    }
}
