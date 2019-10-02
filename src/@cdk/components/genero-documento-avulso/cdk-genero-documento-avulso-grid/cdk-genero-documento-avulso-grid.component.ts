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

import {GeneroDocumentoAvulso} from '@cdk/models/genero-documento-avulso.model';
import {GeneroDocumentoAvulsoDataSource} from '@cdk/data-sources/genero-documento-avulso-data-source';

@Component({
    selector: 'cdk-genero-documento-avulso-grid',
    templateUrl: './cdk-genero-documento-avulso-grid.component.html',
    styleUrls: ['./cdk-genero-documento-avulso-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkGeneroDocumentoAvulsoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    generoDocumentoAvulsos: GeneroDocumentoAvulso[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'nome', 'descricao', 'actions'];

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
    selected = new EventEmitter<GeneroDocumentoAvulso>();

    @Output()
    selectedIds: number[] = [];

    dataSource: GeneroDocumentoAvulsoDataSource;

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
        this.generoDocumentoAvulsos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new GeneroDocumentoAvulsoDataSource(of(this.generoDocumentoAvulsos));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new GeneroDocumentoAvulsoDataSource(of(this.generoDocumentoAvulsos));
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

    editGeneroDocumentoAvulso(generoDocumentoAvulsoId): void {
        this.edit.emit(generoDocumentoAvulsoId);
    }

    selectGeneroDocumentoAvulso(generoDocumentoAvulso: GeneroDocumentoAvulso): void {
        this.selected.emit(generoDocumentoAvulso);
    }

    deleteGeneroDocumentoAvulso(generoDocumentoAvulsoId): void {
        this.delete.emit(generoDocumentoAvulsoId);
    }

    deleteGeneroDocumentoAvulsos(generoDocumentoAvulsosId): void {
        generoDocumentoAvulsosId.forEach(generoDocumentoAvulsoId => this.deleteGeneroDocumentoAvulso(generoDocumentoAvulsoId));
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
        const arr = Object.keys(this.generoDocumentoAvulsos).map(k => this.generoDocumentoAvulsos[k]);
        this.selectedIds = arr.map(generoDocumentoAvulso => generoDocumentoAvulso.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(generoDocumentoAvulsoId): void {
        const selectedGeneroDocumentoAvulsoIds = [...this.selectedIds];

        if (selectedGeneroDocumentoAvulsoIds.find(id => id === generoDocumentoAvulsoId) !== undefined) {
            this.selectedIds = selectedGeneroDocumentoAvulsoIds.filter(id => id !== generoDocumentoAvulsoId);
        } else {
            this.selectedIds = [...selectedGeneroDocumentoAvulsoIds, generoDocumentoAvulsoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.generoDocumentoAvulsos.length && this.selectedIds.length > 0);
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
