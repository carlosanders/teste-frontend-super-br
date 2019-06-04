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
import {EtiquetaDataSource} from '@cdk/data-sources/etiqueta-data-source';
import {Etiqueta} from '@cdk/models/etiqueta.model';

@Component({
    selector: 'cdk-etiqueta-grid',
    templateUrl: './cdk-etiqueta-grid.component.html',
    styleUrls: ['./cdk-etiqueta-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkEtiquetaGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    etiquetas: Etiqueta[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'ativo', 'nome', 'conteudo', 'actions'];

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
    edit = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    select = new EventEmitter<Etiqueta>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    selectedIds: number[] = [];

    dataSource: EtiquetaDataSource;

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
        this.dataSource = new EtiquetaDataSource(of(this.etiquetas));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new EtiquetaDataSource(of(this.etiquetas));
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

    editEtiqueta(etiquetaId): void {
        this.edit.emit(etiquetaId);
    }

    selectEtiqueta(etiqueta: Etiqueta): void {
        this.select.emit(etiqueta);
    }

    deleteEtiqueta(etiquetaId): void {
        this.delete.emit(etiquetaId);
    }

    deleteEtiquetas(etiquetasId): void {
        etiquetasId.forEach(etiquetaId => this.deleteEtiqueta(etiquetaId));
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
        const arr = Object.keys(this.etiquetas).map(k => this.etiquetas[k]);
        this.selectedIds = arr.map(etiqueta => etiqueta.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(etiquetaId): void {
        const selectedEtiquetaIds = [...this.selectedIds];

        if (selectedEtiquetaIds.find(id => id === etiquetaId) !== undefined) {
            this.selectedIds = selectedEtiquetaIds.filter(id => id !== etiquetaId);
        } else {
            this.selectedIds = [...selectedEtiquetaIds, etiquetaId];
        }
        this.recompute();
    }

    recompute (): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.etiquetas.length && this.selectedIds.length > 0);
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
