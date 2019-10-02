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

import {ModalidadeAlvoInibidor} from '@cdk/models/modalidade-alvo-inibidor.model';
import {ModalidadeAlvoInibidorDataSource} from '@cdk/data-sources/modalidade-alvo-inibidor-data-source';

@Component({
    selector: 'cdk-modalidade-alvo-inibidor-grid',
    templateUrl: './cdk-modalidade-alvo-inibidor-grid.component.html',
    styleUrls: ['./cdk-modalidade-alvo-inibidor-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeAlvoInibidorGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    modalidadealvoInibidors: ModalidadeAlvoInibidor[];

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
    selected = new EventEmitter<ModalidadeAlvoInibidor>();

    @Output()
    selectedIds: number[] = [];

    dataSource: ModalidadeAlvoInibidorDataSource;

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
        this.modalidadealvoInibidors = [];
    }

    ngOnChanges(): void {
        this.dataSource = new ModalidadeAlvoInibidorDataSource(of(this.modalidadealvoInibidors));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new ModalidadeAlvoInibidorDataSource(of(this.modalidadealvoInibidors));
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

    editModalidadeAlvoInibidor(modalidadealvoInibidorId): void {
        this.edit.emit(modalidadealvoInibidorId);
    }

    selectModalidadeAlvoInibidor(modalidadealvoInibidor: ModalidadeAlvoInibidor): void {
        this.selected.emit(modalidadealvoInibidor);
    }

    deleteModalidadeAlvoInibidor(modalidadealvoInibidorId): void {
        this.delete.emit(modalidadealvoInibidorId);
    }

    deleteModalidadeAlvoInibidors(modalidadealvoInibidorsId): void {
        modalidadealvoInibidorsId.forEach(modalidadealvoInibidorId => this.deleteModalidadeAlvoInibidor(modalidadealvoInibidorId));
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
        const arr = Object.keys(this.modalidadealvoInibidors).map(k => this.modalidadealvoInibidors[k]);
        this.selectedIds = arr.map(modalidadealvoInibidor => modalidadealvoInibidor.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(modalidadealvoInibidorId): void {
        const selectedModalidadealvoInibidorIds = [...this.selectedIds];

        if (selectedModalidadealvoInibidorIds.find(id => id === modalidadealvoInibidorId) !== undefined) {
            this.selectedIds = selectedModalidadealvoInibidorIds.filter(id => id !== modalidadealvoInibidorId);
        } else {
            this.selectedIds = [...selectedModalidadealvoInibidorIds, modalidadealvoInibidorId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.modalidadealvoInibidors.length && this.selectedIds.length > 0);
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
