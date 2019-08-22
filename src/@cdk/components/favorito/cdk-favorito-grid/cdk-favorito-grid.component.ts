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

import {Favorito} from '@cdk/models/favorito.model';
import {FavoritoDataSource} from '@cdk/data-sources/favorito-data-source';

@Component({
    selector: 'cdk-favorito-grid',
    templateUrl: './cdk-favorito-grid.component.html',
    styleUrls: ['./cdk-favorito-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkFavoritoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    favoritos: Favorito[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'nome', 'descricao', 'actions'];

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    @Input()
    pageSize = 5;

    @Input()
    actions: string[] = ['edit', 'delete', 'select', 'favorito'];

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
    select = new EventEmitter<Favorito>();

    @Output()
    setPrincipal = new EventEmitter<Favorito>();

    @Output()
    selectedIds: number[] = [];

    dataSource: FavoritoDataSource;

    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;

    @Output()
    toggleFavorito = new EventEmitter<Favorito>();

    /**
     * @param _changeDetectorRef
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.gridFilter = {};
        this.favoritos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new FavoritoDataSource(of(this.favoritos));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new FavoritoDataSource(of(this.favoritos));
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

    editFavorito(favoritoId): void {
        this.edit.emit(favoritoId);
    }

    selectFavorito(favorito: Favorito): void {
        this.select.emit(favorito);
    }

    setPrincipalFavorito(favorito: Favorito): void {
        this.setPrincipal.emit(favorito);
    }

    deleteFavorito(favoritoId): void {
        this.delete.emit(favoritoId);
    }

    deleteFavoritos(favoritosId): void {
        favoritosId.forEach(favoritoId => this.deleteFavorito(favoritoId));
    }

    salvarFavorito(favorito): void {
        this.toggleFavorito.emit(favorito);
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
        const arr = Object.keys(this.favoritos).map(k => this.favoritos[k]);
        this.selectedIds = arr.map(favorito => favorito.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(favoritoId): void {
        const selectedFavoritoIds = [...this.selectedIds];

        if (selectedFavoritoIds.find(id => id === favoritoId) !== undefined) {
            this.selectedIds = selectedFavoritoIds.filter(id => id !== favoritoId);
        } else {
            this.selectedIds = [...selectedFavoritoIds, favoritoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.favoritos.length && this.selectedIds.length > 0);
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
