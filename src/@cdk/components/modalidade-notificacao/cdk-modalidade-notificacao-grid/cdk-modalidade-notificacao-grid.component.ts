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

import {ModalidadeNotificacao} from '@cdk/models/modalidade-notificacao.model';
import {ModalidadeNotificacaoDataSource} from '@cdk/data-sources/modalidade-notificacao-data-source';

@Component({
    selector: 'cdk-modalidade-notificacao-grid',
    templateUrl: './cdk-modalidade-notificacao-grid.component.html',
    styleUrls: ['./cdk-modalidade-notificacao-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeNotificacaoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    modalidadenotificacaos: ModalidadeNotificacao[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'valor', 'descricao', 'actions'];

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
    select = new EventEmitter<ModalidadeNotificacao>();

    @Output()
    selectedIds: number[] = [];

    dataSource: ModalidadeNotificacaoDataSource;

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
        this.modalidadenotificacaos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new ModalidadeNotificacaoDataSource(of(this.modalidadenotificacaos));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new ModalidadeNotificacaoDataSource(of(this.modalidadenotificacaos));
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

    editModalidadeNotificacao(modalidadenotificacaoId): void {
        this.edit.emit(modalidadenotificacaoId);
    }

    selectModalidadeNotificacao(modalidadenotificacao: ModalidadeNotificacao): void {
        this.select.emit(modalidadenotificacao);
    }

    deleteModalidadeNotificacao(modalidadenotificacaoId): void {
        this.delete.emit(modalidadenotificacaoId);
    }

    deleteModalidadeNotificacaos(modalidadenotificacaosId): void {
        modalidadenotificacaosId.forEach(modalidadenotificacaoId => this.deleteModalidadeNotificacao(modalidadenotificacaoId));
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
        const arr = Object.keys(this.modalidadenotificacaos).map(k => this.modalidadenotificacaos[k]);
        this.selectedIds = arr.map(modalidadenotificacao => modalidadenotificacao.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(modalidadenotificacaoId): void {
        const selectedModalidadenotificacaoIds = [...this.selectedIds];

        if (selectedModalidadenotificacaoIds.find(id => id === modalidadenotificacaoId) !== undefined) {
            this.selectedIds = selectedModalidadenotificacaoIds.filter(id => id !== modalidadenotificacaoId);
        } else {
            this.selectedIds = [...selectedModalidadenotificacaoIds, modalidadenotificacaoId];
        }
        this.recompute();
    }

    recompute (): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.modalidadenotificacaos.length && this.selectedIds.length > 0);
    }

    setGridFilter (gridFilter): void {
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
