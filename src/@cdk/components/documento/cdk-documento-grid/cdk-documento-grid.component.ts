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
import {DocumentoDataSource} from '@cdk/data-sources/documento-data-source';
import {Documento} from '@cdk/models/documento.model';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {ComponenteDigital} from '../../../models/componente-digital.model';

@Component({
    selector: 'cdk-documento-grid',
    templateUrl: './cdk-documento-grid.component.html',
    styleUrls: ['./cdk-documento-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkDocumentoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    documentos: Documento[];

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Input()
    displayedColumns: string[] = ['select', 'id', 'tipoDocumento.nome', 'tipoDocumento.especieDocumento.nome', 'componentesDigitais.extensao', 'actions'];

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
    edit = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    select = new EventEmitter<Documento>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    changedSelectedIds = new EventEmitter<number[]>();

    selectedIds: number[] = [];

    dataSource: DocumentoDataSource;

    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;

    /**
     * @param _changeDetectorRef
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _componenteDigitalService: ComponenteDigitalService
    ) {
        this.gridFilter = {};
    }

    ngOnChanges(): void {
        this.dataSource = new DocumentoDataSource(of(this.documentos));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new DocumentoDataSource(of(this.documentos));

        if (this.mode === 'search') {
            this.toggleFilter();
        }
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

    editDocumento(documentoId): void {
        this.edit.emit(documentoId);
    }

    selectDocumento(documento: Documento): void {
        this.select.emit(documento);
    }

    deleteDocumento(documentoId): void {
        this.delete.emit(documentoId);
    }

    deleteDocumentos(documentosId): void {
        documentosId.forEach(documentoId => this.deleteDocumento(documentoId));
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
        const arr = Object.keys(this.documentos).map(k => this.documentos[k]);
        this.selectedIds = arr.map(documento => documento.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(documentoId): void {
        const selectedDocumentoIds = [...this.selectedIds];

        if (selectedDocumentoIds.find(id => id === documentoId) !== undefined) {
            this.selectedIds = selectedDocumentoIds.filter(id => id !== documentoId);
        } else {
            this.selectedIds = [...selectedDocumentoIds, documentoId];
        }
        this.recompute();
    }

    recompute (): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.documentos.length && this.selectedIds.length > 0);
        this.changedSelectedIds.emit(this.selectedIds);
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

    download(componenteDigital: ComponenteDigital): void {
        this._componenteDigitalService.download(componenteDigital.id).subscribe(
            response => {
                fetch(response.conteudo)
                    .then(res => res.blob())
                    .then(content => {
                        // downloadLink.download = 'name_to_give_saved_file.pdf';
                        const blob = new Blob([content], {type: componenteDigital.mimetype}),
                            URL = window.URL,
                            downloadUrl = URL.createObjectURL(blob),
                            downloadLink = document.createElement('a');
                        downloadLink.target = '_blank';
                        downloadLink.href = downloadUrl;
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                        document.body.removeChild(downloadLink);
                        URL.revokeObjectURL(downloadUrl);
                    });
            }
        );
    }
}
