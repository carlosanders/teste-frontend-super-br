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

import {OrigemDados} from '@cdk/models/origem-dados.model';
import {OrigemDadosDataSource} from '@cdk/data-sources/origem-dados-data-source';

@Component({
    selector: 'cdk-origem-dados-grid',
    templateUrl: './cdk-origem-dados-grid.component.html',
    styleUrls: ['./cdk-origem-dados-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkOrigemDadosGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    origemDadoss: OrigemDados[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'servico', 'fonteDados', 'status', 'dataHoraUltimaConsulta', 'actions'];

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
    select = new EventEmitter<OrigemDados>();

    @Output()
    selectedIds: number[] = [];

    dataSource: OrigemDadosDataSource;

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
        this.origemDadoss = [];
    }

    ngOnChanges(): void {
        this.dataSource = new OrigemDadosDataSource(of(this.origemDadoss));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new OrigemDadosDataSource(of(this.origemDadoss));
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

    editOrigemDados(origemDadosId): void {
        this.edit.emit(origemDadosId);
    }

    selectOrigemDados(origemDados: OrigemDados): void {
        this.select.emit(origemDados);
    }

    deleteOrigemDados(origemDadosId): void {
        this.delete.emit(origemDadosId);
    }

    deleteOrigemDadoss(origemDadossId): void {
        origemDadossId.forEach(origemDadosId => this.deleteOrigemDados(origemDadosId));
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
        const arr = Object.keys(this.origemDadoss).map(k => this.origemDadoss[k]);
        this.selectedIds = arr.map(origemDados => origemDados.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(origemDadosId): void {
        const selectedOrigemDadosIds = [...this.selectedIds];

        if (selectedOrigemDadosIds.find(id => id === origemDadosId) !== undefined) {
            this.selectedIds = selectedOrigemDadosIds.filter(id => id !== origemDadosId);
        } else {
            this.selectedIds = [...selectedOrigemDadosIds, origemDadosId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.origemDadoss.length && this.selectedIds.length > 0);
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
