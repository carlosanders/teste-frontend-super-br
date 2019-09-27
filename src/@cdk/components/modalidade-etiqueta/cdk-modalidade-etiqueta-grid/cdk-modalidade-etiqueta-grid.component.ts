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

import {ModalidadeEtiqueta} from '@cdk/models/modalidade-etiqueta.model';
import {ModalidadeEtiquetaDataSource} from '@cdk/data-sources/modalidade-etiqueta-data-source';

@Component({
    selector: 'cdk-modalidade-etiqueta-grid',
    templateUrl: './cdk-modalidade-etiqueta-grid.component.html',
    styleUrls: ['./cdk-modalidade-etiqueta-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeEtiquetaGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    modalidadeetiquetas: ModalidadeEtiqueta[];

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
    selected = new EventEmitter<ModalidadeEtiqueta>();

    @Output()
    selectedIds: number[] = [];

    dataSource: ModalidadeEtiquetaDataSource;

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
        this.modalidadeetiquetas = [];
    }

    ngOnChanges(): void {
        this.dataSource = new ModalidadeEtiquetaDataSource(of(this.modalidadeetiquetas));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new ModalidadeEtiquetaDataSource(of(this.modalidadeetiquetas));
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

    editModalidadeEtiqueta(modalidadeetiquetaId): void {
        this.edit.emit(modalidadeetiquetaId);
    }

    selectModalidadeEtiqueta(modalidadeetiqueta: ModalidadeEtiqueta): void {
        this.selected.emit(modalidadeetiqueta);
    }

    deleteModalidadeEtiqueta(modalidadeetiquetaId): void {
        this.delete.emit(modalidadeetiquetaId);
    }

    deleteModalidadeEtiquetas(modalidadeetiquetasId): void {
        modalidadeetiquetasId.forEach(modalidadeetiquetaId => this.deleteModalidadeEtiqueta(modalidadeetiquetaId));
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
        const arr = Object.keys(this.modalidadeetiquetas).map(k => this.modalidadeetiquetas[k]);
        this.selectedIds = arr.map(modalidadeetiqueta => modalidadeetiqueta.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(modalidadeetiquetaId): void {
        const selectedModalidadeetiquetaIds = [...this.selectedIds];

        if (selectedModalidadeetiquetaIds.find(id => id === modalidadeetiquetaId) !== undefined) {
            this.selectedIds = selectedModalidadeetiquetaIds.filter(id => id !== modalidadeetiquetaId);
        } else {
            this.selectedIds = [...selectedModalidadeetiquetaIds, modalidadeetiquetaId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.modalidadeetiquetas.length && this.selectedIds.length > 0);
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
