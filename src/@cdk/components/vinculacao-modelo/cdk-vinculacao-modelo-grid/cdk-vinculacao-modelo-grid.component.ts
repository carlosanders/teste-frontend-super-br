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

import {VinculacaoModelo} from '@cdk/models/vinculacao-modelo.model';
import {VinculacaoModeloDataSource} from '@cdk/data-sources/vinculacao-modelo-data-source';

@Component({
    selector: 'cdk-vinculacao-modelo-grid',
    templateUrl: './cdk-vinculacao-modelo-grid.component.html',
    styleUrls: ['./cdk-vinculacao-modelo-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkVinculacaoModeloGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    vinculacaoModelos: VinculacaoModelo[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'modelo.nome', 'especieSetor.nome', 'setor.nome', 'usuario.nome', 'actions'];

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
    selected = new EventEmitter<VinculacaoModelo>();

    @Output()
    selectedIds: number[] = [];

    dataSource: VinculacaoModeloDataSource;

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
        this.vinculacaoModelos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new VinculacaoModeloDataSource(of(this.vinculacaoModelos));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new VinculacaoModeloDataSource(of(this.vinculacaoModelos));
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

    editVinculacaoModelo(vinculacaoModeloId): void {
        this.edit.emit(vinculacaoModeloId);
    }

    selectVinculacaoModelo(vinculacaoModelo: VinculacaoModelo): void {
        this.selected.emit(vinculacaoModelo);
    }

    deleteVinculacaoModelo(vinculacaoModeloId): void {
        this.delete.emit(vinculacaoModeloId);
    }

    deleteVinculacaoModelos(vinculacaoModelosId): void {
        vinculacaoModelosId.forEach(vinculacaoModeloId => this.deleteVinculacaoModelo(vinculacaoModeloId));
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
        const arr = Object.keys(this.vinculacaoModelos).map(k => this.vinculacaoModelos[k]);
        this.selectedIds = arr.map(vinculacaoModelo => vinculacaoModelo.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(vinculacaoModeloId): void {
        const selectedVinculacaoModeloIds = [...this.selectedIds];

        if (selectedVinculacaoModeloIds.find(id => id === vinculacaoModeloId) !== undefined) {
            this.selectedIds = selectedVinculacaoModeloIds.filter(id => id !== vinculacaoModeloId);
        } else {
            this.selectedIds = [...selectedVinculacaoModeloIds, vinculacaoModeloId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.vinculacaoModelos.length && this.selectedIds.length > 0);
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
