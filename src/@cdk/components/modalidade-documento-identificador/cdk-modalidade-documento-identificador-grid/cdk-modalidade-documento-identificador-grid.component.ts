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

import {ModalidadeDocumentoIdentificador} from '@cdk/models/modalidade-documento-identificador.model';
import {ModalidadeDocumentoIdentificadorDataSource} from '@cdk/data-sources/modalidade-documento-identificador-data-source';

@Component({
    selector: 'cdk-modalidade-documento-identificador-grid',
    templateUrl: './cdk-modalidade-documento-identificador-grid.component.html',
    styleUrls: ['./cdk-modalidade-documento-identificador-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeDocumentoIdentificadorGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    modalidadedocumentoIdentificadors: ModalidadeDocumentoIdentificador[];

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
    select = new EventEmitter<ModalidadeDocumentoIdentificador>();

    @Output()
    selectedIds: number[] = [];

    dataSource: ModalidadeDocumentoIdentificadorDataSource;

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
        this.modalidadedocumentoIdentificadors = [];
    }

    ngOnChanges(): void {
        this.dataSource = new ModalidadeDocumentoIdentificadorDataSource(of(this.modalidadedocumentoIdentificadors));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new ModalidadeDocumentoIdentificadorDataSource(of(this.modalidadedocumentoIdentificadors));
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

    editModalidadeDocumentoIdentificador(modalidadedocumentoIdentificadorId): void {
        this.edit.emit(modalidadedocumentoIdentificadorId);
    }

    selectModalidadeDocumentoIdentificador(modalidadedocumentoIdentificador: ModalidadeDocumentoIdentificador): void {
        this.select.emit(modalidadedocumentoIdentificador);
    }

    deleteModalidadeDocumentoIdentificador(modalidadedocumentoIdentificadorId): void {
        this.delete.emit(modalidadedocumentoIdentificadorId);
    }

    deleteModalidadeDocumentoIdentificadors(modalidadedocumentoIdentificadorsId): void {
        modalidadedocumentoIdentificadorsId.forEach(modalidadedocumentoIdentificadorId => this.deleteModalidadeDocumentoIdentificador(modalidadedocumentoIdentificadorId));
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
        const arr = Object.keys(this.modalidadedocumentoIdentificadors).map(k => this.modalidadedocumentoIdentificadors[k]);
        this.selectedIds = arr.map(modalidadedocumentoIdentificador => modalidadedocumentoIdentificador.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(modalidadedocumentoIdentificadorId): void {
        const selectedModalidadedocumentoIdentificadorIds = [...this.selectedIds];

        if (selectedModalidadedocumentoIdentificadorIds.find(id => id === modalidadedocumentoIdentificadorId) !== undefined) {
            this.selectedIds = selectedModalidadedocumentoIdentificadorIds.filter(id => id !== modalidadedocumentoIdentificadorId);
        } else {
            this.selectedIds = [...selectedModalidadedocumentoIdentificadorIds, modalidadedocumentoIdentificadorId];
        }
        this.recompute();
    }

    recompute (): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.modalidadedocumentoIdentificadors.length && this.selectedIds.length > 0);
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
