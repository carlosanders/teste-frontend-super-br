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

import {VinculacaoDocumento} from '@cdk/models/vinculacao-documento.model';
import {VinculacaoDocumentoDataSource} from '@cdk/data-sources/vinculacao-documento-data-source';

@Component({
    selector: 'cdk-vinculacao-documento-grid',
    templateUrl: './cdk-vinculacao-documento-grid.component.html',
    styleUrls: ['./cdk-vinculacao-documento-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkVinculacaoDocumentoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    vinculacaoDocumentos: VinculacaoDocumento[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'documento.descricaoOutros', 'documentoVinculado.descricaoOutros', 'modalidadeVinculacaoDocumento.valor', 'actions'];

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
    select = new EventEmitter<VinculacaoDocumento>();

    @Output()
    selectedIds: number[] = [];

    dataSource: VinculacaoDocumentoDataSource;

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
        this.vinculacaoDocumentos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new VinculacaoDocumentoDataSource(of(this.vinculacaoDocumentos));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new VinculacaoDocumentoDataSource(of(this.vinculacaoDocumentos));
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

    editVinculacaoDocumento(vinculacaoDocumentoId): void {
        this.edit.emit(vinculacaoDocumentoId);
    }

    selectVinculacaoDocumento(vinculacaoDocumento: VinculacaoDocumento): void {
        this.select.emit(vinculacaoDocumento);
    }

    deleteVinculacaoDocumento(vinculacaoDocumentoId): void {
        this.delete.emit(vinculacaoDocumentoId);
    }

    deleteVinculacaoDocumentos(vinculacaoDocumentosId): void {
        vinculacaoDocumentosId.forEach(vinculacaoDocumentoId => this.deleteVinculacaoDocumento(vinculacaoDocumentoId));
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
        const arr = Object.keys(this.vinculacaoDocumentos).map(k => this.vinculacaoDocumentos[k]);
        this.selectedIds = arr.map(vinculacaoDocumento => vinculacaoDocumento.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(vinculacaoDocumentoId): void {
        const selectedVinculacaoDocumentoIds = [...this.selectedIds];

        if (selectedVinculacaoDocumentoIds.find(id => id === vinculacaoDocumentoId) !== undefined) {
            this.selectedIds = selectedVinculacaoDocumentoIds.filter(id => id !== vinculacaoDocumentoId);
        } else {
            this.selectedIds = [...selectedVinculacaoDocumentoIds, vinculacaoDocumentoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.vinculacaoDocumentos.length && this.selectedIds.length > 0);
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
