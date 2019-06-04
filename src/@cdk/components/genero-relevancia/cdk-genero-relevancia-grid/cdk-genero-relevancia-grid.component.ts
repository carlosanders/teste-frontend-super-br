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

import {GeneroRelevancia} from '@cdk/models/genero-relevancia.model';
import {GeneroRelevanciaDataSource} from '@cdk/data-sources/genero-relevancia-data-source';

@Component({
    selector: 'cdk-genero-relevancia-grid',
    templateUrl: './cdk-genero-relevancia-grid.component.html',
    styleUrls: ['./cdk-genero-relevancia-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkGeneroRelevanciaGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    generoRelevancias: GeneroRelevancia[];

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
    select = new EventEmitter<GeneroRelevancia>();

    @Output()
    selectedIds: number[] = [];

    dataSource: GeneroRelevanciaDataSource;

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
        this.generoRelevancias = [];
    }

    ngOnChanges(): void {
        this.dataSource = new GeneroRelevanciaDataSource(of(this.generoRelevancias));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new GeneroRelevanciaDataSource(of(this.generoRelevancias));
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

    editGeneroRelevancia(generoRelevanciaId): void {
        this.edit.emit(generoRelevanciaId);
    }

    selectGeneroRelevancia(generoRelevancia: GeneroRelevancia): void {
        this.select.emit(generoRelevancia);
    }

    deleteGeneroRelevancia(generoRelevanciaId): void {
        this.delete.emit(generoRelevanciaId);
    }

    deleteGeneroRelevancias(generoRelevanciasId): void {
        generoRelevanciasId.forEach(generoRelevanciaId => this.deleteGeneroRelevancia(generoRelevanciaId));
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
        const arr = Object.keys(this.generoRelevancias).map(k => this.generoRelevancias[k]);
        this.selectedIds = arr.map(generoRelevancia => generoRelevancia.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(generoRelevanciaId): void {
        const selectedGeneroRelevanciaIds = [...this.selectedIds];

        if (selectedGeneroRelevanciaIds.find(id => id === generoRelevanciaId) !== undefined) {
            this.selectedIds = selectedGeneroRelevanciaIds.filter(id => id !== generoRelevanciaId);
        } else {
            this.selectedIds = [...selectedGeneroRelevanciaIds, generoRelevanciaId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.generoRelevancias.length && this.selectedIds.length > 0);
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
