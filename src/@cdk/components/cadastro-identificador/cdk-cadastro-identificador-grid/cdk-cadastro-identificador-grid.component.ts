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
import {CadastroIdentificadorDataSource} from '@cdk/data-sources/cadastro-identificador-data-source';
import {CadastroIdentificador} from '@cdk/models/cadastro-identificador.model';

@Component({
    selector: 'cdk-cadastro-identificador-grid',
    templateUrl: './cdk-cadastro-identificador-grid.component.html',
    styleUrls: ['./cdk-cadastro-identificador-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkCadastroIdentificadorGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    cadastroIdentificadors: CadastroIdentificador[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'numero', 'origemDados', 'actions'];

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
    select = new EventEmitter<CadastroIdentificador>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    selectedIds: number[] = [];

    dataSource: CadastroIdentificadorDataSource;

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
        this.dataSource = new CadastroIdentificadorDataSource(of(this.cadastroIdentificadors));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new CadastroIdentificadorDataSource(of(this.cadastroIdentificadors));
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

    editCadastroIdentificador(cadastroIdentificadorId): void {
        this.edit.emit(cadastroIdentificadorId);
    }

    selectCadastroIdentificador(cadastroIdentificador: CadastroIdentificador): void {
        this.select.emit(cadastroIdentificador);
    }

    deleteCadastroIdentificador(cadastroIdentificadorId): void {
        this.delete.emit(cadastroIdentificadorId);
    }

    deleteCadastroIdentificadors(cadastroIdentificadorsId): void {
        cadastroIdentificadorsId.forEach(cadastroIdentificadorId => this.deleteCadastroIdentificador(cadastroIdentificadorId));
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
        const arr = Object.keys(this.cadastroIdentificadors).map(k => this.cadastroIdentificadors[k]);
        this.selectedIds = arr.map(cadastroIdentificador => cadastroIdentificador.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(cadastroIdentificadorId): void {
        const selectedCadastroIdentificadorIds = [...this.selectedIds];

        if (selectedCadastroIdentificadorIds.find(id => id === cadastroIdentificadorId) !== undefined) {
            this.selectedIds = selectedCadastroIdentificadorIds.filter(id => id !== cadastroIdentificadorId);
        } else {
            this.selectedIds = [...selectedCadastroIdentificadorIds, cadastroIdentificadorId];
        }
        this.recompute();
    }

    recompute (): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.cadastroIdentificadors.length && this.selectedIds.length > 0);
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
