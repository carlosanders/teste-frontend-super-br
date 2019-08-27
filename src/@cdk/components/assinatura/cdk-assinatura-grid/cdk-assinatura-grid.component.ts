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
import {AssinaturaDataSource} from '@cdk/data-sources/assinatura-data-source';
import {Assinatura} from '@cdk/models/assinatura.model';

@Component({
    selector: 'cdk-assinatura-grid',
    templateUrl: './cdk-assinatura-grid.component.html',
    styleUrls: ['./cdk-assinatura-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkAssinaturaGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    assinaturas: Assinatura[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'criadoEm', 'criadoPor', 'actions'];

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
    select = new EventEmitter<Assinatura>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    selectedIds: number[] = [];

    dataSource: AssinaturaDataSource;

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
    }

    ngOnChanges(): void {
        this.dataSource = new AssinaturaDataSource(of(this.assinaturas));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new AssinaturaDataSource(of(this.assinaturas));
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

    editAssinatura(assinaturaId): void {
        this.edit.emit(assinaturaId);
    }

    selectAssinatura(assinatura: Assinatura): void {
        this.select.emit(assinatura);
    }

    deleteAssinatura(assinaturaId): void {
        this.delete.emit(assinaturaId);
    }

    deleteAssinaturas(assinaturasId): void {
        assinaturasId.forEach(assinaturaId => this.deleteAssinatura(assinaturaId));
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
        const arr = Object.keys(this.assinaturas).map(k => this.assinaturas[k]);
        this.selectedIds = arr.map(assinatura => assinatura.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(assinaturaId): void {
        const selectedAssinaturaIds = [...this.selectedIds];

        if (selectedAssinaturaIds.find(id => id === assinaturaId) !== undefined) {
            this.selectedIds = selectedAssinaturaIds.filter(id => id !== assinaturaId);
        } else {
            this.selectedIds = [...selectedAssinaturaIds, assinaturaId];
        }
        this.recompute();
    }

    recompute (): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.assinaturas.length && this.selectedIds.length > 0);
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
