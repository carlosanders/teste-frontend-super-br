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

import {ModalidadeTransicao} from '@cdk/models/modalidade-transicao.model';
import {ModalidadeTransicaoDataSource} from '@cdk/data-sources/modalidade-transicao-data-source';

@Component({
    selector: 'cdk-modalidade-transicao-grid',
    templateUrl: './cdk-modalidade-transicao-grid.component.html',
    styleUrls: ['./cdk-modalidade-transicao-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeTransicaoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    modalidadetransicoes: ModalidadeTransicao[];

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
    select = new EventEmitter<ModalidadeTransicao>();

    @Output()
    selectedIds: number[] = [];

    dataSource: ModalidadeTransicaoDataSource;

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
        this.modalidadetransicoes = [];
    }

    ngOnChanges(): void {
        this.dataSource = new ModalidadeTransicaoDataSource(of(this.modalidadetransicoes));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new ModalidadeTransicaoDataSource(of(this.modalidadetransicoes));
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

    editModalidadeTransicao(modalidadetransicaoId): void {
        this.edit.emit(modalidadetransicaoId);
    }

    selectModalidadeTransicao(modalidadetransicao: ModalidadeTransicao): void {
        this.select.emit(modalidadetransicao);
    }

    deleteModalidadeTransicao(modalidadetransicaoId): void {
        this.delete.emit(modalidadetransicaoId);
    }

    deleteModalidadeTransicoes(modalidadetransicoesId): void {
        modalidadetransicoesId.forEach(modalidadetransicaoId => this.deleteModalidadeTransicao(modalidadetransicaoId));
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
        const arr = Object.keys(this.modalidadetransicoes).map(k => this.modalidadetransicoes[k]);
        this.selectedIds = arr.map(modalidadetransicao => modalidadetransicao.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(modalidadetransicaoId): void {
        const selectedModalidadetransicaoIds = [...this.selectedIds];

        if (selectedModalidadetransicaoIds.find(id => id === modalidadetransicaoId) !== undefined) {
            this.selectedIds = selectedModalidadetransicaoIds.filter(id => id !== modalidadetransicaoId);
        } else {
            this.selectedIds = [...selectedModalidadetransicaoIds, modalidadetransicaoId];
        }
        this.recompute();
    }

    recompute (): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.modalidadetransicoes.length && this.selectedIds.length > 0);
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
