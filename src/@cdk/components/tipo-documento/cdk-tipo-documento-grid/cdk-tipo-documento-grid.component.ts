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

import {TipoDocumento} from '@cdk/models/tipo-documento.model';
import {TipoDocumentoDataSource} from '@cdk/data-sources/tipo-documento-data-source';

@Component({
    selector: 'cdk-tipo-documento-grid',
    templateUrl: './cdk-tipo-documento-grid.component.html',
    styleUrls: ['./cdk-tipo-documento-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkTipoDocumentoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    tiposDocumentos: TipoDocumento[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'nome', 'glossario', 'actions'];

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
    select = new EventEmitter<TipoDocumento>();

    @Output()
    selectedIds: number[] = [];

    dataSource: TipoDocumentoDataSource;

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
        this.tiposDocumentos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new TipoDocumentoDataSource(of(this.tiposDocumentos));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new TipoDocumentoDataSource(of(this.tiposDocumentos));
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

    editTipoDocumento(tipoDocumentoId): void {
        this.edit.emit(tipoDocumentoId);
    }

    selectTipoDocumento(tipoDocumento: TipoDocumento): void {
        this.select.emit(tipoDocumento);
    }

    deleteTipoDocumento(tipoDocumentoId): void {
        this.delete.emit(tipoDocumentoId);
    }

    deleteTiposDocumentos(tiposDocumentosId): void {
        tiposDocumentosId.forEach(tipoDocumentoId => this.deleteTipoDocumento(tipoDocumentoId));
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
        const arr = Object.keys(this.tiposDocumentos).map(k => this.tiposDocumentos[k]);
        this.selectedIds = arr.map(tipoDocumento => tipoDocumento.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(tipoDocumentoId): void {
        const selectedTipoDocumentoIds = [...this.selectedIds];

        if (selectedTipoDocumentoIds.find(id => id === tipoDocumentoId) !== undefined) {
            this.selectedIds = selectedTipoDocumentoIds.filter(id => id !== tipoDocumentoId);
        } else {
            this.selectedIds = [...selectedTipoDocumentoIds, tipoDocumentoId];
        }
        this.recompute();
    }

    recompute (): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.tiposDocumentos.length && this.selectedIds.length > 0);
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
