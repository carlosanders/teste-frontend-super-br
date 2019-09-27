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

import {ModalidadeAfastamento} from '@cdk/models/modalidade-afastamento.model';
import {ModalidadeAfastamentoDataSource} from '@cdk/data-sources/modalidade-afastamento-data-source';

@Component({
    selector: 'cdk-modalidade-afastamento-grid',
    templateUrl: './cdk-modalidade-afastamento-grid.component.html',
    styleUrls: ['./cdk-modalidade-afastamento-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeAfastamentoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    modalidadeafastamentos: ModalidadeAfastamento[];

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
    selected = new EventEmitter<ModalidadeAfastamento>();

    @Output()
    selectedIds: number[] = [];

    dataSource: ModalidadeAfastamentoDataSource;

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
        this.modalidadeafastamentos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new ModalidadeAfastamentoDataSource(of(this.modalidadeafastamentos));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new ModalidadeAfastamentoDataSource(of(this.modalidadeafastamentos));
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

    editModalidadeAfastamento(modalidadeafastamentoId): void {
        this.edit.emit(modalidadeafastamentoId);
    }

    selectModalidadeAfastamento(modalidadeafastamento: ModalidadeAfastamento): void {
        this.selected.emit(modalidadeafastamento);
    }

    deleteModalidadeAfastamento(modalidadeafastamentoId): void {
        this.delete.emit(modalidadeafastamentoId);
    }

    deleteModalidadeAfastamentos(modalidadeafastamentosId): void {
        modalidadeafastamentosId.forEach(modalidadeafastamentoId => this.deleteModalidadeAfastamento(modalidadeafastamentoId));
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
        const arr = Object.keys(this.modalidadeafastamentos).map(k => this.modalidadeafastamentos[k]);
        this.selectedIds = arr.map(modalidadeafastamento => modalidadeafastamento.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(modalidadeafastamentoId): void {
        const selectedModalidadeafastamentoIds = [...this.selectedIds];

        if (selectedModalidadeafastamentoIds.find(id => id === modalidadeafastamentoId) !== undefined) {
            this.selectedIds = selectedModalidadeafastamentoIds.filter(id => id !== modalidadeafastamentoId);
        } else {
            this.selectedIds = [...selectedModalidadeafastamentoIds, modalidadeafastamentoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.modalidadeafastamentos.length && this.selectedIds.length > 0);
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
