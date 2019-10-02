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

import {ModalidadeCategoriaSigilo} from '@cdk/models/modalidade-categoria-sigilo.model';
import {ModalidadeCategoriaSigiloDataSource} from '@cdk/data-sources/modalidade-categoria-sigilo-data-source';

@Component({
    selector: 'cdk-modalidade-categoria-sigilo-grid',
    templateUrl: './cdk-modalidade-categoria-sigilo-grid.component.html',
    styleUrls: ['./cdk-modalidade-categoria-sigilo-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeCategoriaSigiloGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    modalidadecategoriaSigilos: ModalidadeCategoriaSigilo[];

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
    selected = new EventEmitter<ModalidadeCategoriaSigilo>();

    @Output()
    selectedIds: number[] = [];

    dataSource: ModalidadeCategoriaSigiloDataSource;

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
        this.modalidadecategoriaSigilos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new ModalidadeCategoriaSigiloDataSource(of(this.modalidadecategoriaSigilos));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new ModalidadeCategoriaSigiloDataSource(of(this.modalidadecategoriaSigilos));
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

    editModalidadeCategoriaSigilo(modalidadecategoriaSigiloId): void {
        this.edit.emit(modalidadecategoriaSigiloId);
    }

    selectModalidadeCategoriaSigilo(modalidadecategoriaSigilo: ModalidadeCategoriaSigilo): void {
        this.selected.emit(modalidadecategoriaSigilo);
    }

    deleteModalidadeCategoriaSigilo(modalidadecategoriaSigiloId): void {
        this.delete.emit(modalidadecategoriaSigiloId);
    }

    deleteModalidadeCategoriaSigilos(modalidadecategoriaSigilosId): void {
        modalidadecategoriaSigilosId.forEach(modalidadecategoriaSigiloId => this.deleteModalidadeCategoriaSigilo(modalidadecategoriaSigiloId));
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
        const arr = Object.keys(this.modalidadecategoriaSigilos).map(k => this.modalidadecategoriaSigilos[k]);
        this.selectedIds = arr.map(modalidadecategoriaSigilo => modalidadecategoriaSigilo.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(modalidadecategoriaSigiloId): void {
        const selectedModalidadecategoriaSigiloIds = [...this.selectedIds];

        if (selectedModalidadecategoriaSigiloIds.find(id => id === modalidadecategoriaSigiloId) !== undefined) {
            this.selectedIds = selectedModalidadecategoriaSigiloIds.filter(id => id !== modalidadecategoriaSigiloId);
        } else {
            this.selectedIds = [...selectedModalidadecategoriaSigiloIds, modalidadecategoriaSigiloId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.modalidadecategoriaSigilos.length && this.selectedIds.length > 0);
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
