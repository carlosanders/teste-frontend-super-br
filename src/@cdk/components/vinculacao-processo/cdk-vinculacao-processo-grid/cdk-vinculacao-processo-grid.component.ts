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

import {VinculacaoProcesso} from '@cdk/models/vinculacao-processo.model';
import {VinculacaoProcessoDataSource} from '@cdk/data-sources/vinculacao-processo-data-source';

@Component({
    selector: 'cdk-vinculacao-processo-grid',
    templateUrl: './cdk-vinculacao-processo-grid.component.html',
    styleUrls: ['./cdk-vinculacao-processo-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkVinculacaoProcessoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    vinculacoesProcessos: VinculacaoProcesso[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'processo.NUP', 'processoVinculado.NUP', 'modalidadeVinculacaoProcesso.valor', 'observacao', 'actions'];

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
    select = new EventEmitter<VinculacaoProcesso>();

    @Output()
    selectedIds: number[] = [];

    dataSource: VinculacaoProcessoDataSource;

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
        this.vinculacoesProcessos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new VinculacaoProcessoDataSource(of(this.vinculacoesProcessos));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new VinculacaoProcessoDataSource(of(this.vinculacoesProcessos));
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

    editVinculacaoProcesso(vinculacaoProcessoId): void {
        this.edit.emit(vinculacaoProcessoId);
    }

    selectVinculacaoProcesso(vinculacaoProcesso: VinculacaoProcesso): void {
        this.select.emit(vinculacaoProcesso);
    }

    deleteVinculacaoProcesso(vinculacaoProcessoId): void {
        this.delete.emit(vinculacaoProcessoId);
    }

    deleteVinculacaoProcessos(vinculacaoProcessosId): void {
        vinculacaoProcessosId.forEach(vinculacaoProcessoId => this.deleteVinculacaoProcesso(vinculacaoProcessoId));
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
        const arr = Object.keys(this.vinculacoesProcessos).map(k => this.vinculacoesProcessos[k]);
        this.selectedIds = arr.map(vinculacaoProcesso => vinculacaoProcesso.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(vinculacaoProcessoId): void {
        const selectedVinculacaoProcessoIds = [...this.selectedIds];

        if (selectedVinculacaoProcessoIds.find(id => id === vinculacaoProcessoId) !== undefined) {
            this.selectedIds = selectedVinculacaoProcessoIds.filter(id => id !== vinculacaoProcessoId);
        } else {
            this.selectedIds = [...selectedVinculacaoProcessoIds, vinculacaoProcessoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.vinculacoesProcessos.length && this.selectedIds.length > 0);
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
