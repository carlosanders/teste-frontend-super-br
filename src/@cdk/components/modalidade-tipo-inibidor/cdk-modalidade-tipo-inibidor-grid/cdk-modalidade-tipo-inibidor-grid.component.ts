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

import {ModalidadeTipoInibidor} from '@cdk/models/modalidade-tipo-inibidor.model';
import {ModalidadeTipoInibidorDataSource} from '@cdk/data-sources/modalidade-tipo-inibidor-data-source';

@Component({
    selector: 'cdk-modalidade-tipo-inibidorgrid',
    templateUrl: './cdk-modalidade-tipo-inibidor-grid.component.html',
    styleUrls: ['./cdk-modalidade-tipo-inibidor-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeTipoInibidorGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    modalidadetipoInibidors: ModalidadeTipoInibidor[];

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
    select = new EventEmitter<ModalidadeTipoInibidor>();

    @Output()
    selectedIds: number[] = [];

    dataSource: ModalidadeTipoInibidorDataSource;

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
        this.modalidadetipoInibidors = [];
    }

    ngOnChanges(): void {
        this.dataSource = new ModalidadeTipoInibidorDataSource(of(this.modalidadetipoInibidors));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new ModalidadeTipoInibidorDataSource(of(this.modalidadetipoInibidors));
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

    editModalidadeTipoInibidor(modalidadetipoInibidorId): void {
        this.edit.emit(modalidadetipoInibidorId);
    }

    selectModalidadeTipoInibidor(modalidadetipoInibidor: ModalidadeTipoInibidor): void {
        this.select.emit(modalidadetipoInibidor);
    }

    deleteModalidadeTipoInibidor(modalidadetipoInibidorId): void {
        this.delete.emit(modalidadetipoInibidorId);
    }

    deleteModalidadeTipoInibidors(modalidadetipoInibidorsId): void {
        modalidadetipoInibidorsId.forEach(modalidadetipoInibidorId => this.deleteModalidadeTipoInibidor(modalidadetipoInibidorId));
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
        const arr = Object.keys(this.modalidadetipoInibidors).map(k => this.modalidadetipoInibidors[k]);
        this.selectedIds = arr.map(modalidadetipoInibidor => modalidadetipoInibidor.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(modalidadetipoInibidorId): void {
        const selectedModalidadetipoInibidorIds = [...this.selectedIds];

        if (selectedModalidadetipoInibidorIds.find(id => id === modalidadetipoInibidorId) !== undefined) {
            this.selectedIds = selectedModalidadetipoInibidorIds.filter(id => id !== modalidadetipoInibidorId);
        } else {
            this.selectedIds = [...selectedModalidadetipoInibidorIds, modalidadetipoInibidorId];
        }
        this.recompute();
    }

    recompute (): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.modalidadetipoInibidors.length && this.selectedIds.length > 0);
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
