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

import {ModalidadeRepresentante} from '@cdk/models/modalidade-representante.model';
import {ModalidadeRepresentanteDataSource} from '@cdk/data-sources/modalidade-representante-data-source';

@Component({
    selector: 'cdk-modalidade-representante-grid',
    templateUrl: './cdk-modalidade-representante-grid.component.html',
    styleUrls: ['./cdk-modalidade-representante-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeRepresentanteGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    modalidaderepresentantes: ModalidadeRepresentante[];

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
    select = new EventEmitter<ModalidadeRepresentante>();

    @Output()
    selectedIds: number[] = [];

    dataSource: ModalidadeRepresentanteDataSource;

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
        this.modalidaderepresentantes = [];
    }

    ngOnChanges(): void {
        this.dataSource = new ModalidadeRepresentanteDataSource(of(this.modalidaderepresentantes));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new ModalidadeRepresentanteDataSource(of(this.modalidaderepresentantes));
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

    editModalidadeRepresentante(modalidaderepresentanteId): void {
        this.edit.emit(modalidaderepresentanteId);
    }

    selectModalidadeRepresentante(modalidaderepresentante: ModalidadeRepresentante): void {
        this.select.emit(modalidaderepresentante);
    }

    deleteModalidadeRepresentante(modalidaderepresentanteId): void {
        this.delete.emit(modalidaderepresentanteId);
    }

    deleteModalidadeRepresentantes(modalidaderepresentantesId): void {
        modalidaderepresentantesId.forEach(modalidaderepresentanteId => this.deleteModalidadeRepresentante(modalidaderepresentanteId));
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
        const arr = Object.keys(this.modalidaderepresentantes).map(k => this.modalidaderepresentantes[k]);
        this.selectedIds = arr.map(modalidaderepresentante => modalidaderepresentante.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(modalidaderepresentanteId): void {
        const selectedModalidaderepresentanteIds = [...this.selectedIds];

        if (selectedModalidaderepresentanteIds.find(id => id === modalidaderepresentanteId) !== undefined) {
            this.selectedIds = selectedModalidaderepresentanteIds.filter(id => id !== modalidaderepresentanteId);
        } else {
            this.selectedIds = [...selectedModalidaderepresentanteIds, modalidaderepresentanteId];
        }
        this.recompute();
    }

    recompute (): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.modalidaderepresentantes.length && this.selectedIds.length > 0);
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
