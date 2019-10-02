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

import {ModalidadeVinculacaoDocumento} from '@cdk/models/modalidade-vinculacao-documento.model';
import {ModalidadeVinculacaoDocumentoDataSource} from '@cdk/data-sources/modalidade-vinculacao-documento-data-source';

@Component({
    selector: 'cdk-modalidade-vinculacao-documento-grid',
    templateUrl: './cdk-modalidade-vinculacao-documento-grid.component.html',
    styleUrls: ['./cdk-modalidade-vinculacao-documento-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeVinculacaoDocumentoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    modalidadevinculacaoDocumentos: ModalidadeVinculacaoDocumento[];

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
    selected = new EventEmitter<ModalidadeVinculacaoDocumento>();

    @Output()
    selectedIds: number[] = [];

    dataSource: ModalidadeVinculacaoDocumentoDataSource;

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
        this.modalidadevinculacaoDocumentos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new ModalidadeVinculacaoDocumentoDataSource(of(this.modalidadevinculacaoDocumentos));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new ModalidadeVinculacaoDocumentoDataSource(of(this.modalidadevinculacaoDocumentos));
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

    editModalidadeVinculacaoDocumento(modalidadevinculacaoDocumentoId): void {
        this.edit.emit(modalidadevinculacaoDocumentoId);
    }

    selectModalidadeVinculacaoDocumento(modalidadevinculacaoDocumento: ModalidadeVinculacaoDocumento): void {
        this.selected.emit(modalidadevinculacaoDocumento);
    }

    deleteModalidadeVinculacaoDocumento(modalidadevinculacaoDocumentoId): void {
        this.delete.emit(modalidadevinculacaoDocumentoId);
    }

    deleteModalidadeVinculacaoDocumentos(modalidadevinculacaoDocumentosId): void {
        modalidadevinculacaoDocumentosId.forEach(modalidadevinculacaoDocumentoId => this.deleteModalidadeVinculacaoDocumento(modalidadevinculacaoDocumentoId));
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
        const arr = Object.keys(this.modalidadevinculacaoDocumentos).map(k => this.modalidadevinculacaoDocumentos[k]);
        this.selectedIds = arr.map(modalidadevinculacaoDocumento => modalidadevinculacaoDocumento.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(modalidadevinculacaoDocumentoId): void {
        const selectedModalidadevinculacaoDocumentoIds = [...this.selectedIds];

        if (selectedModalidadevinculacaoDocumentoIds.find(id => id === modalidadevinculacaoDocumentoId) !== undefined) {
            this.selectedIds = selectedModalidadevinculacaoDocumentoIds.filter(id => id !== modalidadevinculacaoDocumentoId);
        } else {
            this.selectedIds = [...selectedModalidadevinculacaoDocumentoIds, modalidadevinculacaoDocumentoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.modalidadevinculacaoDocumentos.length && this.selectedIds.length > 0);
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
