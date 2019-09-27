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

import {VinculacaoRepositorio} from '@cdk/models/vinculacao-repositorio.model';
import {VinculacaoRepositorioDataSource} from '@cdk/data-sources/vinculacao-repositorio-data-source';

@Component({
    selector: 'cdk-vinculacao-repositorio-grid',
    templateUrl: './cdk-vinculacao-repositorio-grid.component.html',
    styleUrls: ['./cdk-vinculacao-repositorio-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkVinculacaoRepositorioGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    vinculacaoRepositorios: VinculacaoRepositorio[];

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
    selected = new EventEmitter<VinculacaoRepositorio>();

    @Output()
    selectedIds: number[] = [];

    dataSource: VinculacaoRepositorioDataSource;

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
        this.vinculacaoRepositorios = [];
    }

    ngOnChanges(): void {
        this.dataSource = new VinculacaoRepositorioDataSource(of(this.vinculacaoRepositorios));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new VinculacaoRepositorioDataSource(of(this.vinculacaoRepositorios));
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

    editVinculacaoRepositorio(vinculacaoRepositorioId): void {
        this.edit.emit(vinculacaoRepositorioId);
    }

    selectVinculacaoRepositorio(vinculacaoRepositorio: VinculacaoRepositorio): void {
        this.selected.emit(vinculacaoRepositorio);
    }

    deleteVinculacaoRepositorio(vinculacaoRepositorioId): void {
        this.delete.emit(vinculacaoRepositorioId);
    }

    deleteVinculacaoRepositorios(vinculacaoRepositoriosId): void {
        vinculacaoRepositoriosId.forEach(vinculacaoRepositorioId => this.deleteVinculacaoRepositorio(vinculacaoRepositorioId));
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
        const arr = Object.keys(this.vinculacaoRepositorios).map(k => this.vinculacaoRepositorios[k]);
        this.selectedIds = arr.map(vinculacaoRepositorio => vinculacaoRepositorio.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(vinculacaoRepositorioId): void {
        const selectedVinculacaoRepositorioIds = [...this.selectedIds];

        if (selectedVinculacaoRepositorioIds.find(id => id === vinculacaoRepositorioId) !== undefined) {
            this.selectedIds = selectedVinculacaoRepositorioIds.filter(id => id !== vinculacaoRepositorioId);
        } else {
            this.selectedIds = [...selectedVinculacaoRepositorioIds, vinculacaoRepositorioId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.vinculacaoRepositorios.length && this.selectedIds.length > 0);
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
