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

import {ModalidadeQualificacaoPessoa} from '@cdk/models/modalidade-qualificacao-pessoa.model';
import {ModalidadeQualificacaoPessoaDataSource} from '@cdk/data-sources/modalidade-qualificacao-pessoa-data-source';

@Component({
    selector: 'cdk-modalidade-qualificacao-pessoa-grid',
    templateUrl: './cdk-modalidade-qualificacao-pessoa-grid.component.html',
    styleUrls: ['./cdk-modalidade-qualificacao-pessoa-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeQualificacaoPessoaGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    modalidadequalificacaoPessoas: ModalidadeQualificacaoPessoa[];

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
    selected = new EventEmitter<ModalidadeQualificacaoPessoa>();

    @Output()
    selectedIds: number[] = [];

    dataSource: ModalidadeQualificacaoPessoaDataSource;

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
        this.modalidadequalificacaoPessoas = [];
    }

    ngOnChanges(): void {
        this.dataSource = new ModalidadeQualificacaoPessoaDataSource(of(this.modalidadequalificacaoPessoas));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new ModalidadeQualificacaoPessoaDataSource(of(this.modalidadequalificacaoPessoas));
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

    editModalidadeQualificacaoPessoa(modalidadequalificacaoPessoaId): void {
        this.edit.emit(modalidadequalificacaoPessoaId);
    }

    selectModalidadeQualificacaoPessoa(modalidadequalificacaoPessoa: ModalidadeQualificacaoPessoa): void {
        this.selected.emit(modalidadequalificacaoPessoa);
    }

    deleteModalidadeQualificacaoPessoa(modalidadequalificacaoPessoaId): void {
        this.delete.emit(modalidadequalificacaoPessoaId);
    }

    deleteModalidadeQualificacaoPessoas(modalidadequalificacaoPessoasId): void {
        modalidadequalificacaoPessoasId.forEach(modalidadequalificacaoPessoaId => this.deleteModalidadeQualificacaoPessoa(modalidadequalificacaoPessoaId));
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
        const arr = Object.keys(this.modalidadequalificacaoPessoas).map(k => this.modalidadequalificacaoPessoas[k]);
        this.selectedIds = arr.map(modalidadequalificacaoPessoa => modalidadequalificacaoPessoa.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(modalidadequalificacaoPessoaId): void {
        const selectedModalidadequalificacaoPessoaIds = [...this.selectedIds];

        if (selectedModalidadequalificacaoPessoaIds.find(id => id === modalidadequalificacaoPessoaId) !== undefined) {
            this.selectedIds = selectedModalidadequalificacaoPessoaIds.filter(id => id !== modalidadequalificacaoPessoaId);
        } else {
            this.selectedIds = [...selectedModalidadequalificacaoPessoaIds, modalidadequalificacaoPessoaId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.modalidadequalificacaoPessoas.length && this.selectedIds.length > 0);
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
