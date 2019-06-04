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

import {TipoSigilo} from '@cdk/models/tipo-sigilo.model';
import {TipoSigiloDataSource} from '@cdk/data-sources/tipo-sigilo-data-source';

@Component({
    selector: 'cdk-tipo-sigilo-grid',
    templateUrl: './cdk-tipo-sigilo-grid.component.html',
    styleUrls: ['./cdk-tipo-sigilo-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkTipoSigiloGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    tipoSigilos: TipoSigilo[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'nome', 'descricao', 'nivelAcesso', 'prazoAnos', 'leiAcessoInformacao', 'actions'];

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
    select = new EventEmitter<TipoSigilo>();

    @Output()
    selectedIds: number[] = [];

    dataSource: TipoSigiloDataSource;

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
        this.tipoSigilos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new TipoSigiloDataSource(of(this.tipoSigilos));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new TipoSigiloDataSource(of(this.tipoSigilos));
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

    editTipoSigilo(tipoSigiloId): void {
        this.edit.emit(tipoSigiloId);
    }

    selectTipoSigilo(tipoSigilo: TipoSigilo): void {
        this.select.emit(tipoSigilo);
    }

    deleteTipoSigilo(tipoSigiloId): void {
        this.delete.emit(tipoSigiloId);
    }

    deleteTipoSigilos(tipoSigilosId): void {
        tipoSigilosId.forEach(tipoSigiloId => this.deleteTipoSigilo(tipoSigiloId));
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
        const arr = Object.keys(this.tipoSigilos).map(k => this.tipoSigilos[k]);
        this.selectedIds = arr.map(tipoSigilo => tipoSigilo.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(tipoSigiloId): void {
        const selectedTipoSigiloIds = [...this.selectedIds];

        if (selectedTipoSigiloIds.find(id => id === tipoSigiloId) !== undefined) {
            this.selectedIds = selectedTipoSigiloIds.filter(id => id !== tipoSigiloId);
        } else {
            this.selectedIds = [...selectedTipoSigiloIds, tipoSigiloId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.tipoSigilos.length && this.selectedIds.length > 0);
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
