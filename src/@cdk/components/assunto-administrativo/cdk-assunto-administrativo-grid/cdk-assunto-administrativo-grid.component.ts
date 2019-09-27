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

import {AssuntoAdministrativo} from '@cdk/models/assunto-administrativo.model';
import {AssuntoAdministrativoDataSource} from '@cdk/data-sources/assunto-administrativo-data-source';

@Component({
    selector: 'cdk-assunto-administrativo-grid',
    templateUrl: './cdk-assunto-administrativo-grid.component.html',
    styleUrls: ['./cdk-assunto-administrativo-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkAssuntoAdministrativoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    assuntosAdministrativos: AssuntoAdministrativo[];

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
    selected = new EventEmitter<AssuntoAdministrativo>();

    @Output()
    selectedIds: number[] = [];

    dataSource: AssuntoAdministrativoDataSource;

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
        this.assuntosAdministrativos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new AssuntoAdministrativoDataSource(of(this.assuntosAdministrativos));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new AssuntoAdministrativoDataSource(of(this.assuntosAdministrativos));
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

    editAssuntoAdministrativo(assuntoAdministrativoId): void {
        this.edit.emit(assuntoAdministrativoId);
    }

    selectAssuntoAdministrativo(assuntoAdministrativo: AssuntoAdministrativo): void {
        this.selected.emit(assuntoAdministrativo);
    }

    deleteAssuntoAdministrativo(assuntoAdministrativoId): void {
        this.delete.emit(assuntoAdministrativoId);
    }

    deleteAssuntosAdministrativos(assuntosAdministrativosId): void {
        assuntosAdministrativosId.forEach(assuntoAdministrativoId => this.deleteAssuntoAdministrativo(assuntoAdministrativoId));
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
        const arr = Object.keys(this.assuntosAdministrativos).map(k => this.assuntosAdministrativos[k]);
        this.selectedIds = arr.map(assuntoAdministrativo => assuntoAdministrativo.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(assuntoAdministrativoId): void {
        const selectedAssuntoAdministrativoIds = [...this.selectedIds];

        if (selectedAssuntoAdministrativoIds.find(id => id === assuntoAdministrativoId) !== undefined) {
            this.selectedIds = selectedAssuntoAdministrativoIds.filter(id => id !== assuntoAdministrativoId);
        } else {
            this.selectedIds = [...selectedAssuntoAdministrativoIds, assuntoAdministrativoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.assuntosAdministrativos.length && this.selectedIds.length > 0);
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
