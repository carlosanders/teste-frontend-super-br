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

import {ModalidadeGeneroPessoa} from '@cdk/models/modalidade-genero-pessoa.model';
import {ModalidadeGeneroPessoaDataSource} from '@cdk/data-sources/modalidade-genero-pessoa-data-source';

@Component({
    selector: 'cdk-modalidade-genero-pessoa-grid',
    templateUrl: './cdk-modalidade-genero-pessoa-grid.component.html',
    styleUrls: ['./cdk-modalidade-genero-pessoa-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeGeneroPessoaGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    modalidadegeneroPessoas: ModalidadeGeneroPessoa[];

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
    select = new EventEmitter<ModalidadeGeneroPessoa>();

    @Output()
    selectedIds: number[] = [];

    dataSource: ModalidadeGeneroPessoaDataSource;

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
        this.modalidadegeneroPessoas = [];
    }

    ngOnChanges(): void {
        this.dataSource = new ModalidadeGeneroPessoaDataSource(of(this.modalidadegeneroPessoas));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new ModalidadeGeneroPessoaDataSource(of(this.modalidadegeneroPessoas));
        this.loadPage();
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

    editModalidadeGeneroPessoa(modalidadegeneroPessoaId): void {
        this.edit.emit(modalidadegeneroPessoaId);
    }

    selectModalidadeGeneroPessoa(modalidadegeneroPessoa: ModalidadeGeneroPessoa): void {
        this.select.emit(modalidadegeneroPessoa);
    }

    deleteModalidadeGeneroPessoa(modalidadegeneroPessoaId): void {
        this.delete.emit(modalidadegeneroPessoaId);
    }

    deleteModalidadeGeneroPessoas(modalidadegeneroPessoasId): void {
        modalidadegeneroPessoasId.forEach(modalidadegeneroPessoaId => this.deleteModalidadeGeneroPessoa(modalidadegeneroPessoaId));
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
        const arr = Object.keys(this.modalidadegeneroPessoas).map(k => this.modalidadegeneroPessoas[k]);
        this.selectedIds = arr.map(modalidadegeneroPessoa => modalidadegeneroPessoa.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(modalidadegeneroPessoaId): void {
        const selectedModalidadegeneroPessoaIds = [...this.selectedIds];

        if (selectedModalidadegeneroPessoaIds.find(id => id === modalidadegeneroPessoaId) !== undefined) {
            this.selectedIds = selectedModalidadegeneroPessoaIds.filter(id => id !== modalidadegeneroPessoaId);
        } else {
            this.selectedIds = [...selectedModalidadegeneroPessoaIds, modalidadegeneroPessoaId];
        }
        this.recompute();
    }

    recompute (): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.modalidadegeneroPessoas.length && this.selectedIds.length > 0);
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
