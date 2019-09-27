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

import {RelacionamentoPessoal} from '@cdk/models/relacionamento-pessoal.model';
import {RelacionamentoPessoalDataSource} from '@cdk/data-sources/relacionamento-pessoal-data-source';

@Component({
    selector: 'cdk-relacionamento-pessoal-grid',
    templateUrl: './cdk-relacionamento-pessoal-grid.component.html',
    styleUrls: ['./cdk-relacionamento-pessoal-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkRelacionamentoPessoalGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    relacionamentoPessoals: RelacionamentoPessoal[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'pessoaRelacionada.nome', 'modalidadeRelacionamentoPessoal.valor', 'origemDados.servico', 'actions'];

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
    selected = new EventEmitter<RelacionamentoPessoal>();

    @Output()
    selectedIds: number[] = [];

    dataSource: RelacionamentoPessoalDataSource;

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
        this.relacionamentoPessoals = [];
    }

    ngOnChanges(): void {
        this.dataSource = new RelacionamentoPessoalDataSource(of(this.relacionamentoPessoals));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new RelacionamentoPessoalDataSource(of(this.relacionamentoPessoals));
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

    editRelacionamentoPessoal(relacionamentoPessoalId): void {
        this.edit.emit(relacionamentoPessoalId);
    }

    selectRelacionamentoPessoal(relacionamentoPessoal: RelacionamentoPessoal): void {
        this.selected.emit(relacionamentoPessoal);
    }

    deleteRelacionamentoPessoal(relacionamentoPessoalId): void {
        this.delete.emit(relacionamentoPessoalId);
    }

    deleteRelacionamentoPessoals(relacionamentoPessoalsId): void {
        relacionamentoPessoalsId.forEach(relacionamentoPessoalId => this.deleteRelacionamentoPessoal(relacionamentoPessoalId));
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
        const arr = Object.keys(this.relacionamentoPessoals).map(k => this.relacionamentoPessoals[k]);
        this.selectedIds = arr.map(relacionamentoPessoal => relacionamentoPessoal.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(relacionamentoPessoalId): void {
        const selectedRelacionamentoPessoalIds = [...this.selectedIds];

        if (selectedRelacionamentoPessoalIds.find(id => id === relacionamentoPessoalId) !== undefined) {
            this.selectedIds = selectedRelacionamentoPessoalIds.filter(id => id !== relacionamentoPessoalId);
        } else {
            this.selectedIds = [...selectedRelacionamentoPessoalIds, relacionamentoPessoalId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.relacionamentoPessoals.length && this.selectedIds.length > 0);
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
