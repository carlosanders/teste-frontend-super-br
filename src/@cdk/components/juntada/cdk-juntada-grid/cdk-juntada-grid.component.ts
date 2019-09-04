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

import {Juntada} from '@cdk/models/juntada.model';
import {JuntadaDataSource} from '@cdk/data-sources/juntada-data-source';

@Component({
    selector: 'cdk-juntada-grid',
    templateUrl: './cdk-juntada-grid.component.html',
    styleUrls: ['./cdk-juntada-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkJuntadaGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    juntadas: Juntada[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'numeracaoSequencial', 'descricao', 'documento.tipoDocumento.nome', 'actions'];

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    @Input()
    pageSize = 5;

    @Input()
    actions: string[] = ['edit', 'delete', 'select', 'desentranhar', 'copiar'];

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
    desentranhar = new EventEmitter<number[]>();

    @Output()
    copiar = new EventEmitter<number[]>();

    @Output()
    select = new EventEmitter<Juntada>();

    @Output()
    selectedIds: number[] = [];

    dataSource: JuntadaDataSource;

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
        this.juntadas = [];
    }

    ngOnChanges(): void {
        this.dataSource = new JuntadaDataSource(of(this.juntadas));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new JuntadaDataSource(of(this.juntadas));
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

    editJuntada(juntadaId): void {
        this.edit.emit(juntadaId);
    }

    selectJuntada(juntada: Juntada): void {
        this.select.emit(juntada);
    }

    deleteJuntada(juntadaId): void {
        this.delete.emit(juntadaId);
    }

    deleteJuntadas(juntadasId): void {
        juntadasId.forEach(juntadaId => this.deleteJuntada(juntadaId));
    }

    desentranharJuntadas(juntadasId: number[]): void {
        this.desentranhar.emit(juntadasId);
    }

    copiarJuntadas(juntadasId: number[]): void {
        this.copiar.emit(juntadasId);
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
        const arr = Object.keys(this.juntadas).map(k => this.juntadas[k]);
        this.selectedIds = arr.map(juntada => juntada.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(juntadaId): void {
        const selectedJuntadaIds = [...this.selectedIds];

        if (selectedJuntadaIds.find(id => id === juntadaId) !== undefined) {
            this.selectedIds = selectedJuntadaIds.filter(id => id !== juntadaId);
        } else {
            this.selectedIds = [...selectedJuntadaIds, juntadaId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.juntadas.length && this.selectedIds.length > 0);
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
