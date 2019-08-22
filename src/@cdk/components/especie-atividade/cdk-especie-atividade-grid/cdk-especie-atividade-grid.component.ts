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

import {EspecieAtividade} from '@cdk/models/especie-atividade.model';
import {EspecieAtividadeDataSource} from '@cdk/data-sources/especie-atividade-data-source';
import {Favorito} from '../../../models/favorito.model';

@Component({
    selector: 'cdk-especie-atividade-grid',
    templateUrl: './cdk-especie-atividade-grid.component.html',
    styleUrls: ['./cdk-especie-atividade-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkEspecieAtividadeGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    especieAtividades: EspecieAtividade[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'nome', 'descricao', 'genero.nome', 'actions'];

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
    toggleFavorito = new EventEmitter<Favorito>();

    @Output()
    select = new EventEmitter<EspecieAtividade>();

    @Output()
    selectedIds: number[] = [];

    dataSource: EspecieAtividadeDataSource;

    @Input()
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
        this.especieAtividades = [];
    }

    ngOnChanges(): void {
        this.dataSource = new EspecieAtividadeDataSource(of(this.especieAtividades));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new EspecieAtividadeDataSource(of(this.especieAtividades));
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

    editEspecieAtividade(especieAtividadeId): void {
        this.edit.emit(especieAtividadeId);
    }

    selectEspecieAtividade(especieAtividade: EspecieAtividade): void {
        this.select.emit(especieAtividade);
    }

    deleteEspecieAtividade(especieAtividadeId): void {
        this.delete.emit(especieAtividadeId);
    }

    deleteEspecieAtividades(especieAtividadesId): void {
        especieAtividadesId.forEach(especieAtividadeId => this.deleteEspecieAtividade(especieAtividadeId));
    }

    salvarFavorito(favorito): void {
       this.toggleFavorito.emit(favorito);
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
        const arr = Object.keys(this.especieAtividades).map(k => this.especieAtividades[k]);
        this.selectedIds = arr.map(especieAtividade => especieAtividade.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(especieAtividadeId): void {
        const selectedEspecieAtividadeIds = [...this.selectedIds];

        if (selectedEspecieAtividadeIds.find(id => id === especieAtividadeId) !== undefined) {
            this.selectedIds = selectedEspecieAtividadeIds.filter(id => id !== especieAtividadeId);
        } else {
            this.selectedIds = [...selectedEspecieAtividadeIds, especieAtividadeId];
        }
        this.recompute();
    }

    recompute (): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.especieAtividades.length && this.selectedIds.length > 0);
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
