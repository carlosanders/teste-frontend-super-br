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

import {DocumentoAvulso} from '@cdk/models/documento-avulso.model';
import {DocumentoAvulsoDataSource} from '@cdk/data-sources/documento-avulso-data-source';

@Component({
    selector: 'cdk-documento-avulso-grid',
    templateUrl: './cdk-documento-avulso-grid.component.html',
    styleUrls: ['./cdk-documento-avulso-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkDocumentoAvulsoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    documentosAvulsos: DocumentoAvulso[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'especieDocumentoAvulso', 'destinatario', 'actions'];

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
    select = new EventEmitter<DocumentoAvulso>();

    @Output()
    selectedIds: number[] = [];

    @Output()
    responder = new EventEmitter<number[]>();

    dataSource: DocumentoAvulsoDataSource;

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
        this.documentosAvulsos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new DocumentoAvulsoDataSource(of(this.documentosAvulsos));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new DocumentoAvulsoDataSource(of(this.documentosAvulsos));
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

    editDocumentoAvulso(documentoAvulsoId): void {
        this.edit.emit(documentoAvulsoId);
    }

    selectDocumentoAvulso(documentoAvulso: DocumentoAvulso): void {
        this.select.emit(documentoAvulso);
    }

    deleteDocumentoAvulso(documentoAvulsoId): void {
        this.delete.emit(documentoAvulsoId);
    }

    deleteDocumentoAvulsos(documentosAvulsosId): void {
        documentosAvulsosId.forEach(documentoAvulsoId => this.deleteDocumentoAvulso(documentoAvulsoId));
    }

    responderDocumentosAvulsos(documentosAvulsosId: number[]): void {
        this.responder.emit(documentosAvulsosId);
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
        const arr = Object.keys(this.documentosAvulsos).map(k => this.documentosAvulsos[k]);
        this.selectedIds = arr.map(documentoAvulso => documentoAvulso.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(documentoAvulsoId): void {
        const selectedDocumentoAvulsoIds = [...this.selectedIds];

        if (selectedDocumentoAvulsoIds.find(id => id === documentoAvulsoId) !== undefined) {
            this.selectedIds = selectedDocumentoAvulsoIds.filter(id => id !== documentoAvulsoId);
        } else {
            this.selectedIds = [...selectedDocumentoAvulsoIds, documentoAvulsoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.documentosAvulsos.length && this.selectedIds.length > 0);
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
