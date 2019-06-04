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

import {ModalidadeRepositorio} from '@cdk/models/modalidade-repositorio.model';
import {ModalidadeRepositorioDataSource} from '@cdk/data-sources/modalidade-repositorio-data-source';

@Component({
    selector: 'cdk-modalidade-repositorio-grid',
    templateUrl: './cdk-modalidade-repositorio-grid.component.html',
    styleUrls: ['./cdk-modalidade-repositorio-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeRepositorioGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    modalidaderepositorios: ModalidadeRepositorio[];

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
    select = new EventEmitter<ModalidadeRepositorio>();

    @Output()
    selectedIds: number[] = [];

    dataSource: ModalidadeRepositorioDataSource;

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
        this.modalidaderepositorios = [];
    }

    ngOnChanges(): void {
        this.dataSource = new ModalidadeRepositorioDataSource(of(this.modalidaderepositorios));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new ModalidadeRepositorioDataSource(of(this.modalidaderepositorios));
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

    editModalidadeRepositorio(modalidaderepositorioId): void {
        this.edit.emit(modalidaderepositorioId);
    }

    selectModalidadeRepositorio(modalidaderepositorio: ModalidadeRepositorio): void {
        this.select.emit(modalidaderepositorio);
    }

    deleteModalidadeRepositorio(modalidaderepositorioId): void {
        this.delete.emit(modalidaderepositorioId);
    }

    deleteModalidadeRepositorios(modalidaderepositoriosId): void {
        modalidaderepositoriosId.forEach(modalidaderepositorioId => this.deleteModalidadeRepositorio(modalidaderepositorioId));
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
        const arr = Object.keys(this.modalidaderepositorios).map(k => this.modalidaderepositorios[k]);
        this.selectedIds = arr.map(modalidaderepositorio => modalidaderepositorio.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(modalidaderepositorioId): void {
        const selectedModalidaderepositorioIds = [...this.selectedIds];

        if (selectedModalidaderepositorioIds.find(id => id === modalidaderepositorioId) !== undefined) {
            this.selectedIds = selectedModalidaderepositorioIds.filter(id => id !== modalidaderepositorioId);
        } else {
            this.selectedIds = [...selectedModalidaderepositorioIds, modalidaderepositorioId];
        }
        this.recompute();
    }

    recompute (): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.modalidaderepositorios.length && this.selectedIds.length > 0);
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
