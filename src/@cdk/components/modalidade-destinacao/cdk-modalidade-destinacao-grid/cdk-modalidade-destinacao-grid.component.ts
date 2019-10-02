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

import {ModalidadeDestinacao} from '@cdk/models/modalidade-destinacao.model';
import {ModalidadeDestinacaoDataSource} from '@cdk/data-sources/modalidade-destinacao-data-source';

@Component({
    selector: 'cdk-modalidade-destinacao-grid',
    templateUrl: './cdk-modalidade-destinacao-grid.component.html',
    styleUrls: ['./cdk-modalidade-destinacao-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeDestinacaoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    modalidadedestinacoes: ModalidadeDestinacao[];

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
    selected = new EventEmitter<ModalidadeDestinacao>();

    @Output()
    selectedIds: number[] = [];

    dataSource: ModalidadeDestinacaoDataSource;

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
        this.modalidadedestinacoes = [];
    }

    ngOnChanges(): void {
        this.dataSource = new ModalidadeDestinacaoDataSource(of(this.modalidadedestinacoes));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new ModalidadeDestinacaoDataSource(of(this.modalidadedestinacoes));
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

    editModalidadeDestinacao(modalidadedestinacaoId): void {
        this.edit.emit(modalidadedestinacaoId);
    }

    selectModalidadeDestinacao(modalidadedestinacao: ModalidadeDestinacao): void {
        this.selected.emit(modalidadedestinacao);
    }

    deleteModalidadeDestinacao(modalidadedestinacaoId): void {
        this.delete.emit(modalidadedestinacaoId);
    }

    deleteModalidadeDestinacoes(modalidadedestinacoesId): void {
        modalidadedestinacoesId.forEach(modalidadedestinacaoId => this.deleteModalidadeDestinacao(modalidadedestinacaoId));
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
        const arr = Object.keys(this.modalidadedestinacoes).map(k => this.modalidadedestinacoes[k]);
        this.selectedIds = arr.map(modalidadedestinacao => modalidadedestinacao.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(modalidadedestinacaoId): void {
        const selectedModalidadedestinacaoIds = [...this.selectedIds];

        if (selectedModalidadedestinacaoIds.find(id => id === modalidadedestinacaoId) !== undefined) {
            this.selectedIds = selectedModalidadedestinacaoIds.filter(id => id !== modalidadedestinacaoId);
        } else {
            this.selectedIds = [...selectedModalidadedestinacaoIds, modalidadedestinacaoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.modalidadedestinacoes.length && this.selectedIds.length > 0);
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
