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

import {VinculacaoUsuario} from '@cdk/models/vinculacao-usuario.model';
import {VinculacaoUsuarioDataSource} from '@cdk/data-sources/vinculacao-usuario-data-source';

@Component({
    selector: 'cdk-vinculacao-usuario-grid',
    templateUrl: './cdk-vinculacao-usuario-grid.component.html',
    styleUrls: ['./cdk-vinculacao-usuario-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkVinculacaoUsuarioGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    vinculacoesUsuarios: VinculacaoUsuario[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'usuarioVinculado.nome', 'encerraTarefa', 'actions'];

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
    select = new EventEmitter<VinculacaoUsuario>();

    @Output()
    selectedIds: number[] = [];

    dataSource: VinculacaoUsuarioDataSource;

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
        this.vinculacoesUsuarios = [];
    }

    ngOnChanges(): void {
        this.dataSource = new VinculacaoUsuarioDataSource(of(this.vinculacoesUsuarios));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new VinculacaoUsuarioDataSource(of(this.vinculacoesUsuarios));
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

    editVinculacaoUsuario(vinculacaoUsuarioId): void {
        this.edit.emit(vinculacaoUsuarioId);
    }

    selectVinculacaoUsuario(vinculacaoUsuario: VinculacaoUsuario): void {
        this.select.emit(vinculacaoUsuario);
    }

    deleteVinculacaoUsuario(vinculacaoUsuarioId): void {
        this.delete.emit(vinculacaoUsuarioId);
    }

    deleteVinculacaoUsuarios(vinculacoesUsuariosId): void {
        vinculacoesUsuariosId.forEach(vinculacaoUsuarioId => this.deleteVinculacaoUsuario(vinculacaoUsuarioId));
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
        const arr = Object.keys(this.vinculacoesUsuarios).map(k => this.vinculacoesUsuarios[k]);
        this.selectedIds = arr.map(vinculacaoUsuario => vinculacaoUsuario.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(vinculacaoUsuarioId): void {
        const selectedVinculacaoUsuarioIds = [...this.selectedIds];

        if (selectedVinculacaoUsuarioIds.find(id => id === vinculacaoUsuarioId) !== undefined) {
            this.selectedIds = selectedVinculacaoUsuarioIds.filter(id => id !== vinculacaoUsuarioId);
        } else {
            this.selectedIds = [...selectedVinculacaoUsuarioIds, vinculacaoUsuarioId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.vinculacoesUsuarios.length && this.selectedIds.length > 0);
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
