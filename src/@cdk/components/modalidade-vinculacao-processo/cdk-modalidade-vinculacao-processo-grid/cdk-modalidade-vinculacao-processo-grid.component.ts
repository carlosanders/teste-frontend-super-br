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

import {ModalidadeVinculacaoProcesso} from '@cdk/models/modalidade-vinculacao-processo.model';
import {ModalidadeVinculacaoProcessoDataSource} from '@cdk/data-sources/modalidade-vinculacao-processo-data-source';

@Component({
    selector: 'cdk-modalidade-vinculacao-processo-grid',
    templateUrl: './cdk-modalidade-vinculacao-processo-grid.component.html',
    styleUrls: ['./cdk-modalidade-vinculacao-processo-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeVinculacaoProcessoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    modalidadevinculacoesProcessos: ModalidadeVinculacaoProcesso[];

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
    selected = new EventEmitter<ModalidadeVinculacaoProcesso>();

    @Output()
    selectedIds: number[] = [];

    dataSource: ModalidadeVinculacaoProcessoDataSource;

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
        this.modalidadevinculacoesProcessos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new ModalidadeVinculacaoProcessoDataSource(of(this.modalidadevinculacoesProcessos));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new ModalidadeVinculacaoProcessoDataSource(of(this.modalidadevinculacoesProcessos));
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

    editModalidadeVinculacaoProcesso(modalidadevinculacaoProcessoId): void {
        this.edit.emit(modalidadevinculacaoProcessoId);
    }

    selectModalidadeVinculacaoProcesso(modalidadevinculacaoProcesso: ModalidadeVinculacaoProcesso): void {
        this.selected.emit(modalidadevinculacaoProcesso);
    }

    deleteModalidadeVinculacaoProcesso(modalidadevinculacaoProcessoId): void {
        this.delete.emit(modalidadevinculacaoProcessoId);
    }

    deleteModalidadeVinculacaoProcessos(modalidadevinculacoesProcessosId): void {
        modalidadevinculacoesProcessosId.forEach(modalidadevinculacaoProcessoId => this.deleteModalidadeVinculacaoProcesso(modalidadevinculacaoProcessoId));
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
        const arr = Object.keys(this.modalidadevinculacoesProcessos).map(k => this.modalidadevinculacoesProcessos[k]);
        this.selectedIds = arr.map(modalidadevinculacaoProcesso => modalidadevinculacaoProcesso.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(modalidadevinculacaoProcessoId): void {
        const selectedModalidadevinculacaoProcessoIds = [...this.selectedIds];

        if (selectedModalidadevinculacaoProcessoIds.find(id => id === modalidadevinculacaoProcessoId) !== undefined) {
            this.selectedIds = selectedModalidadevinculacaoProcessoIds.filter(id => id !== modalidadevinculacaoProcessoId);
        } else {
            this.selectedIds = [...selectedModalidadevinculacaoProcessoIds, modalidadevinculacaoProcessoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.modalidadevinculacoesProcessos.length && this.selectedIds.length > 0);
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
