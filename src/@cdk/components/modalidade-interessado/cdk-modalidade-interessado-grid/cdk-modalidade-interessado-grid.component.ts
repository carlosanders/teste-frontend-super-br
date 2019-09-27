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

import {ModalidadeInteressado} from '@cdk/models/modalidade-interessado.model';
import {ModalidadeInteressadoDataSource} from '@cdk/data-sources/modalidade-interessado-data-source';

@Component({
    selector: 'cdk-modalidade-interessado-grid',
    templateUrl: './cdk-modalidade-interessado-grid.component.html',
    styleUrls: ['./cdk-modalidade-interessado-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeInteressadoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    modalidadeinteressados: ModalidadeInteressado[];

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
    selected = new EventEmitter<ModalidadeInteressado>();

    @Output()
    selectedIds: number[] = [];

    dataSource: ModalidadeInteressadoDataSource;

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
        this.modalidadeinteressados = [];
    }

    ngOnChanges(): void {
        this.dataSource = new ModalidadeInteressadoDataSource(of(this.modalidadeinteressados));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new ModalidadeInteressadoDataSource(of(this.modalidadeinteressados));
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

    editModalidadeInteressado(modalidadeinteressadoId): void {
        this.edit.emit(modalidadeinteressadoId);
    }

    selectModalidadeInteressado(modalidadeinteressado: ModalidadeInteressado): void {
        this.selected.emit(modalidadeinteressado);
    }

    deleteModalidadeInteressado(modalidadeinteressadoId): void {
        this.delete.emit(modalidadeinteressadoId);
    }

    deleteModalidadeInteressados(modalidadeinteressadosId): void {
        modalidadeinteressadosId.forEach(modalidadeinteressadoId => this.deleteModalidadeInteressado(modalidadeinteressadoId));
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
        const arr = Object.keys(this.modalidadeinteressados).map(k => this.modalidadeinteressados[k]);
        this.selectedIds = arr.map(modalidadeinteressado => modalidadeinteressado.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(modalidadeinteressadoId): void {
        const selectedModalidadeinteressadoIds = [...this.selectedIds];

        if (selectedModalidadeinteressadoIds.find(id => id === modalidadeinteressadoId) !== undefined) {
            this.selectedIds = selectedModalidadeinteressadoIds.filter(id => id !== modalidadeinteressadoId);
        } else {
            this.selectedIds = [...selectedModalidadeinteressadoIds, modalidadeinteressadoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.modalidadeinteressados.length && this.selectedIds.length > 0);
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
