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
import {AreaTrabalhoDataSource} from '@cdk/data-sources/area-trabalho-data-source';
import {AreaTrabalho} from '@cdk/models/area-trabalho.model';

@Component({
    selector: 'cdk-area-trabalho-grid',
    templateUrl: './cdk-area-trabalho-grid.component.html',
    styleUrls: ['./cdk-area-trabalho-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkAreaTrabalhoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    areaTrabalhos: AreaTrabalho[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'usuario.nome', 'dono', 'actions'];

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
    edit = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    selected = new EventEmitter<AreaTrabalho>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    selectedIds: number[] = [];

    dataSource: AreaTrabalhoDataSource;

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
    }

    ngOnChanges(): void {
        this.dataSource = new AreaTrabalhoDataSource(of(this.areaTrabalhos));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new AreaTrabalhoDataSource(of(this.areaTrabalhos));
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

    editAreaTrabalho(areaTrabalhoId): void {
        this.edit.emit(areaTrabalhoId);
    }

    selectAreaTrabalho(areaTrabalho: AreaTrabalho): void {
        this.selected.emit(areaTrabalho);
    }

    deleteAreaTrabalho(areaTrabalhoId): void {
        this.delete.emit(areaTrabalhoId);
    }

    deleteAreaTrabalhos(areaTrabalhosId): void {
        areaTrabalhosId.forEach(areaTrabalhoId => this.deleteAreaTrabalho(areaTrabalhoId));
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
        const arr = Object.keys(this.areaTrabalhos).map(k => this.areaTrabalhos[k]);
        this.selectedIds = arr.map(areaTrabalho => areaTrabalho.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(areaTrabalhoId): void {
        const selectedAreaTrabalhoIds = [...this.selectedIds];

        if (selectedAreaTrabalhoIds.find(id => id === areaTrabalhoId) !== undefined) {
            this.selectedIds = selectedAreaTrabalhoIds.filter(id => id !== areaTrabalhoId);
        } else {
            this.selectedIds = [...selectedAreaTrabalhoIds, areaTrabalhoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.areaTrabalhos.length && this.selectedIds.length > 0);
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
