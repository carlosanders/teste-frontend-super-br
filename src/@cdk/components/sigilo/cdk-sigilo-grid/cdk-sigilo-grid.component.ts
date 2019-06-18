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

import {Sigilo} from '@cdk/models/sigilo.model';
import {SigiloDataSource} from '@cdk/data-sources/sigilo-data-source';

@Component({
    selector: 'cdk-sigilo-grid',
    templateUrl: './cdk-sigilo-grid.component.html',
    styleUrls: ['./cdk-sigilo-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkSigiloGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    sigilos: Sigilo[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'desclassificado', 'observacao', 'fundamentoLegal', 'razoesClassificacaoSigilo', 'dataHoraValidadeSigilo', 'dataHoraExpiracao',
        'modalidadeCategoriaSigilo.valor', 'tipoSigilo.nome', 'origemDados.servico', 'actions'];

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
    select = new EventEmitter<Sigilo>();

    @Output()
    selectedIds: number[] = [];

    dataSource: SigiloDataSource;

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
        this.sigilos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new SigiloDataSource(of(this.sigilos));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new SigiloDataSource(of(this.sigilos));
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

    editSigilo(sigiloId): void {
        this.edit.emit(sigiloId);
    }

    selectSigilo(sigilo: Sigilo): void {
        this.select.emit(sigilo);
    }

    deleteSigilo(sigiloId): void {
        this.delete.emit(sigiloId);
    }

    deleteSigilos(sigilosId): void {
        sigilosId.forEach(sigiloId => this.deleteSigilo(sigiloId));
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
        const arr = Object.keys(this.sigilos).map(k => this.sigilos[k]);
        this.selectedIds = arr.map(sigilo => sigilo.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(sigiloId): void {
        const selectedSigiloIds = [...this.selectedIds];

        if (selectedSigiloIds.find(id => id === sigiloId) !== undefined) {
            this.selectedIds = selectedSigiloIds.filter(id => id !== sigiloId);
        } else {
            this.selectedIds = [...selectedSigiloIds, sigiloId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.sigilos.length && this.selectedIds.length > 0);
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
