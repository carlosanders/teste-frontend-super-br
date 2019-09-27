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

import {VinculacaoEtiqueta} from '@cdk/models/vinculacao-etiqueta.model';
import {VinculacaoEtiquetaDataSource} from '@cdk/data-sources/vinculacao-etiqueta-data-source';

@Component({
    selector: 'cdk-vinculacao-etiqueta-grid',
    templateUrl: './cdk-vinculacao-etiqueta-grid.component.html',
    styleUrls: ['./cdk-vinculacao-etiqueta-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkVinculacaoEtiquetaGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    vinculacaoEtiquetas: VinculacaoEtiqueta[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'etiqueta.nome', 'tarefa.especieTarefa.nome', 'documento.descricaoOutros', 'processo.descricaoOutros.NUP', 'actions'];

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
    selected = new EventEmitter<VinculacaoEtiqueta>();

    @Output()
    selectedIds: number[] = [];

    dataSource: VinculacaoEtiquetaDataSource;

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
        this.vinculacaoEtiquetas = [];
    }

    ngOnChanges(): void {
        this.dataSource = new VinculacaoEtiquetaDataSource(of(this.vinculacaoEtiquetas));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new VinculacaoEtiquetaDataSource(of(this.vinculacaoEtiquetas));
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

    editVinculacaoEtiqueta(vinculacaoEtiquetaId): void {
        this.edit.emit(vinculacaoEtiquetaId);
    }

    selectVinculacaoEtiqueta(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this.selected.emit(vinculacaoEtiqueta);
    }

    deleteVinculacaoEtiqueta(vinculacaoEtiquetaId): void {
        this.delete.emit(vinculacaoEtiquetaId);
    }

    deleteVinculacaoEtiquetas(vinculacaoEtiquetasId): void {
        vinculacaoEtiquetasId.forEach(vinculacaoEtiquetaId => this.deleteVinculacaoEtiqueta(vinculacaoEtiquetaId));
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
        const arr = Object.keys(this.vinculacaoEtiquetas).map(k => this.vinculacaoEtiquetas[k]);
        this.selectedIds = arr.map(vinculacaoEtiqueta => vinculacaoEtiqueta.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(vinculacaoEtiquetaId): void {
        const selectedVinculacaoEtiquetaIds = [...this.selectedIds];

        if (selectedVinculacaoEtiquetaIds.find(id => id === vinculacaoEtiquetaId) !== undefined) {
            this.selectedIds = selectedVinculacaoEtiquetaIds.filter(id => id !== vinculacaoEtiquetaId);
        } else {
            this.selectedIds = [...selectedVinculacaoEtiquetaIds, vinculacaoEtiquetaId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.vinculacaoEtiquetas.length && this.selectedIds.length > 0);
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
