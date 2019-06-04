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

import {Notificacao} from '@cdk/models/notificacao.model';
import {NotificacaoDataSource} from '@cdk/data-sources/notificacao-data-source';

@Component({
    selector: 'cdk-notificacao-grid',
    templateUrl: './cdk-notificacao-grid.component.html',
    styleUrls: ['./cdk-notificacao-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkNotificacaoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    notificacaos: Notificacao[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] =
        ['select', 'id', 'remetente.nome', 'destinatario.nome', 'modalidadeNotificacao.valor', 'dataHoraExpiracao', 'dataHoraLeitura', 'conteudo', 'urgente', 'actions'];

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
    select = new EventEmitter<Notificacao>();

    @Output()
    selectedIds: number[] = [];

    dataSource: NotificacaoDataSource;

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
        this.notificacaos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new NotificacaoDataSource(of(this.notificacaos));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new NotificacaoDataSource(of(this.notificacaos));
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

    editNotificacao(notificacaoId): void {
        this.edit.emit(notificacaoId);
    }

    selectNotificacao(notificacao: Notificacao): void {
        this.select.emit(notificacao);
    }

    deleteNotificacao(notificacaoId): void {
        this.delete.emit(notificacaoId);
    }

    deleteNotificacaos(notificacaosId): void {
        notificacaosId.forEach(notificacaoId => this.deleteNotificacao(notificacaoId));
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
        const arr = Object.keys(this.notificacaos).map(k => this.notificacaos[k]);
        this.selectedIds = arr.map(notificacao => notificacao.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(notificacaoId): void {
        const selectedNotificacaoIds = [...this.selectedIds];

        if (selectedNotificacaoIds.find(id => id === notificacaoId) !== undefined) {
            this.selectedIds = selectedNotificacaoIds.filter(id => id !== notificacaoId);
        } else {
            this.selectedIds = [...selectedNotificacaoIds, notificacaoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.notificacaos.length && this.selectedIds.length > 0);
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
