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

import {EspecieRelevancia} from '@cdk/models/especie-relevancia.model';
import {EspecieRelevanciaDataSource} from '@cdk/data-sources/especie-relevancia-data-source';

@Component({
    selector: 'cdk-especie-relevancia-grid',
    templateUrl: './cdk-especie-relevancia-grid.component.html',
    styleUrls: ['./cdk-especie-relevancia-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkEspecieRelevanciaGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    especieRelevancias: EspecieRelevancia[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'nome', 'descricao', 'genero.nome', 'actions'];

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
    select = new EventEmitter<EspecieRelevancia>();

    @Output()
    selectedIds: number[] = [];

    dataSource: EspecieRelevanciaDataSource;

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
        this.especieRelevancias = [];
    }

    ngOnChanges(): void {
        this.dataSource = new EspecieRelevanciaDataSource(of(this.especieRelevancias));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new EspecieRelevanciaDataSource(of(this.especieRelevancias));
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

    editEspecieRelevancia(especieRelevanciaId): void {
        this.edit.emit(especieRelevanciaId);
    }

    selectEspecieRelevancia(especieRelevancia: EspecieRelevancia): void {
        this.select.emit(especieRelevancia);
    }

    deleteEspecieRelevancia(especieRelevanciaId): void {
        this.delete.emit(especieRelevanciaId);
    }

    deleteEspecieRelevancias(especieRelevanciasId): void {
        especieRelevanciasId.forEach(especieRelevanciaId => this.deleteEspecieRelevancia(especieRelevanciaId));
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
        const arr = Object.keys(this.especieRelevancias).map(k => this.especieRelevancias[k]);
        this.selectedIds = arr.map(especieRelevancia => especieRelevancia.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(especieRelevanciaId): void {
        const selectedEspecieRelevanciaIds = [...this.selectedIds];

        if (selectedEspecieRelevanciaIds.find(id => id === especieRelevanciaId) !== undefined) {
            this.selectedIds = selectedEspecieRelevanciaIds.filter(id => id !== especieRelevanciaId);
        } else {
            this.selectedIds = [...selectedEspecieRelevanciaIds, especieRelevanciaId];
        }
        this.recompute();
    }

    recompute (): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.especieRelevancias.length && this.selectedIds.length > 0);
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
