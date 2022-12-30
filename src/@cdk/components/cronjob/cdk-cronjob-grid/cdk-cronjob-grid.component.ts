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
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {MatPaginator, MatSort} from '@cdk/angular/material';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {CronjobDataSource} from '@cdk/data-sources/cronjob-data-source';
import {Cronjob} from '@cdk/models';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'cdk-cronjob-grid',
    templateUrl: './cdk-cronjob-grid.component.html',
    styleUrls: ['./cdk-cronjob-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkCronjobGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input() loading: boolean = false;
    @Input() cronjobs: Cronjob[];
    @Input() total: number = 0;
    @Input() mode: string = 'list';
    @Input() displayedColumns: string[] = ['select', 'id', 'nome', 'textoStatusUltimaExecucao', 'actions'];
    @Input() deletingIds: number[] = [];
    @Input() executingIds: number[] = [];
    @Input() deletedIds: number[] = [];
    @Input() deletingErrors: any = {};
    @Input() pageSize: number = 10;
    @Input() actions: string[] = ['edit', 'delete', 'select', 'execute'];

    @Output() reload: EventEmitter<any> = new EventEmitter<any>();
    @Output() excluded: EventEmitter<any> = new EventEmitter<any>();
    @Output() edit: EventEmitter<number> = new EventEmitter<number>();
    @Output() delete: EventEmitter<number> = new EventEmitter<number>();
    @Output() deleteBlocoEmmitter: EventEmitter<number[]> = new EventEmitter<number[]>();
    @Output() selected: EventEmitter<Cronjob> = new EventEmitter<Cronjob>();
    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
    @Output() create: EventEmitter<void> = new EventEmitter<void>();
    @Output() selectedIds: number[] = [];
    @Output() execute: EventEmitter<number> = new EventEmitter<number>();

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

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
            id: 'nome',
            label: 'Nome',
            fixed: true
        },
        {
            id: 'descricao',
            label: 'Descricao',
            fixed: true
        },
        {
            id: 'periodicidade',
            label: 'Periodicidade',
            fixed: false
        },
        {
            id: 'comando',
            label: 'Comando',
            fixed: false
        },
        {
            id: 'textoStatusUltimaExecucao',
            label: 'Status Última Execução',
            fixed: false
        },
        {
            id: 'usuarioUltimaExecucao.nome',
            label: 'Usuário Última Execução',
            fixed: false
        },
        {
            id: 'dataHoraUltimaExecucao',
            label: 'Data Última Execução',
            fixed: false
        },
        {
            id: 'dataHoraProximaExecucao',
            label: 'Data Próxima Execução',
            fixed: false
        },
        {
            id: 'ultimoPid',
            label: 'PID Última Execução',
            fixed: false
        },
        {
            id: 'percentualExecucao',
            label: 'Percentual Execução',
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

    columns: FormControl = new FormControl();

    dataSource: CronjobDataSource;

    showFilter: boolean = false;

    gridFilter: any;

    hasSelected: boolean = false;
    isIndeterminate: boolean = false;
    hasExcluded: boolean = false;

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService
    ) {
        this.gridFilter = {};
    }

    ngOnChanges(): void {
        this.dataSource = new CronjobDataSource(of(this.cronjobs));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();

        this.paginator.pageSize = this.pageSize;
        this.dataSource = new CronjobDataSource(of(this.cronjobs));

        this.columns.setValue(this.allColumns.map(c => c.id).filter(c => this.displayedColumns.indexOf(c) > -1));

        this.columns.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((values) => {
                this.displayedColumns = [];
                this.allColumns.forEach((c) => {
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
        this._cdkSidebarService.getSidebar('cdk-cronjob-filter').toggleOpen();
        this.showFilter = !this.showFilter;
    }

    loadPage(): void {
        const filter = this.gridFilter.filters;
        const contexto = this.gridFilter.contexto ? this.gridFilter.contexto : {};
        contexto['mostrarApagadas'] = this.hasExcluded;
        this.reload.emit({
            gridFilter: filter,
            limit: this.paginator.pageSize,
            offset: (this.paginator.pageSize * this.paginator.pageIndex),
            sort: this.sort.active ? {[this.sort.active]: this.sort.direction} : {},
            context: contexto
        });
    }

    loadInatived(): void {
        this.hasExcluded = !this.hasExcluded;
        if (this.hasExcluded) {
            const filter = this.gridFilter.filters;
            this.excluded.emit({
                gridFilter: filter,
                limit: this.paginator.pageSize,
                offset: (this.paginator.pageSize * this.paginator.pageIndex),
                sort: this.sort.active ? {[this.sort.active]: this.sort.direction} : {},
                context: {isAdmin: true}
            });
        }
        else {
            this.loadPage();
        }
    }

    editCronjob(cronjobId: number): void {
        this.edit.emit(cronjobId);
    }

    executeCronjob(cronjobId: number): void {
        this.execute.emit(cronjobId);
    }

    selectCronjob(cronjob: Cronjob): void {
        this.selected.emit(cronjob);
    }

    deleteCronjob(cronjobId: number): void {
        this.delete.emit(cronjobId);
    }

    deleteCronjobs(cronjobsId: number[]): void {
        this.deleteBlocoEmmitter.emit(cronjobsId);
        this.selectedIds = this.selectedIds.filter(id => cronjobsId.indexOf(id) === -1);
        this.recompute();
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
        const arr = Object.keys(this.cronjobs).map(k => this.cronjobs[k]);
        this.selectedIds = arr.filter(cronjob => !cronjob.principal).map(cronjob => cronjob.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(cronjobId): void {
        const selectedCronjobIds = [...this.selectedIds];

        if (selectedCronjobIds.find(id => id === cronjobId) !== undefined) {
            this.selectedIds = selectedCronjobIds.filter(id => id !== cronjobId);
        } else {
            this.selectedIds = [...selectedCronjobIds, cronjobId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.cronjobs.length && this.selectedIds.length > 0);
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
}
