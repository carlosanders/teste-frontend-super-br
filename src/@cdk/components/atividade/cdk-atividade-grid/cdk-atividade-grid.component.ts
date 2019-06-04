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
import {AtividadeDataSource} from '@cdk/data-sources/atividade-data-source';
import {Atividade} from '@cdk/models/atividade.model';

@Component({
    selector: 'cdk-atividade-grid',
    templateUrl: './cdk-atividade-grid.component.html',
    styleUrls: ['./cdk-atividade-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkAtividadeGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    atividades: Atividade[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'dataHoraConclusao', 'especieAtividade.nome', 'usuario.nome', 'encerraTarefa', 'actions'];

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
    select = new EventEmitter<Atividade>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    selectedIds: number[] = [];

    dataSource: AtividadeDataSource;

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
        this.dataSource = new AtividadeDataSource(of(this.atividades));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new AtividadeDataSource(of(this.atividades));
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

    editAtividade(atividadeId): void {
        this.edit.emit(atividadeId);
    }

    selectAtividade(atividade: Atividade): void {
        this.select.emit(atividade);
    }

    deleteAtividade(atividadeId): void {
        this.delete.emit(atividadeId);
    }

    deleteAtividades(atividadesId): void {
        atividadesId.forEach(atividadeId => this.deleteAtividade(atividadeId));
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
        const arr = Object.keys(this.atividades).map(k => this.atividades[k]);
        this.selectedIds = arr.map(atividade => atividade.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(atividadeId): void {
        const selectedAtividadeIds = [...this.selectedIds];

        if (selectedAtividadeIds.find(id => id === atividadeId) !== undefined) {
            this.selectedIds = selectedAtividadeIds.filter(id => id !== atividadeId);
        } else {
            this.selectedIds = [...selectedAtividadeIds, atividadeId];
        }
        this.recompute();
    }

    recompute (): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.atividades.length && this.selectedIds.length > 0);
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
