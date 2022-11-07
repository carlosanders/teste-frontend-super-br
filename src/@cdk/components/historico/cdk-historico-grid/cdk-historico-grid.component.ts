import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output, SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {merge, of} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {MatPaginator, MatSort} from '@cdk/angular/material';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';

import {Historico} from '@cdk/models';
import {HistoricoDataSource} from '@cdk/data-sources/historico-data-source';
import {FormControl} from '@angular/forms';
import {CdkTableGridComponent} from "../../table-definitions/cdk-table-grid.component";
import * as _ from "lodash";
import {CdkTarefaGridColumns} from "../../tarefa/cdk-tarefa-grid/cdk-tarefa-grid.columns";
import {TableDefinitions} from "../../table-definitions/table-definitions";
import {CdkHistoricoGridColumns} from "./cdk-historico-grid.columns";
import {MatSortable} from "@angular/material/sort";

@Component({
    selector: 'cdk-historico-grid',
    templateUrl: './cdk-historico-grid.component.html',
    styleUrls: ['./cdk-historico-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkHistoricoGridComponent extends CdkTableGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    historicos: Historico[];

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Output()
    create = new EventEmitter<any>();

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    @Input()
    deletingErrors: any = {};

    @Input()
    pageSize = 10;

    @Input()
    actions: string[] = ['edit', 'delete', 'select', 'abrirOutraAba'];

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    excluded = new EventEmitter<any>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    edit = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    selected = new EventEmitter<Historico>();

    @Output()
    selectedIds: number[] = [];

    dataSource: HistoricoDataSource;

    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;
    hasExcluded = false;

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     */
    constructor(
        protected _changeDetectorRef: ChangeDetectorRef,
        protected _cdkSidebarService: CdkSidebarService
    ) {
        super(_changeDetectorRef);
        this.gridFilter = {};
        this.tableColumns = _.cloneDeep(CdkHistoricoGridColumns.columns);
        const tableDefinitions = new TableDefinitions();
        tableDefinitions.version = CdkHistoricoGridColumns.version;
        this.tableDefinitions = tableDefinitions;
    }

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        this.dataSource = new HistoricoDataSource(of(this.historicos));
    }

    ngOnInit(): void {
        super.ngOnInit();
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();
        this.dataSource = new HistoricoDataSource(of(this.historicos));
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    //Overriding
    setTablePaginatorData(paginator: MatPaginator) {
        super.setTablePaginatorData(paginator);
        paginator.length = this.total;
        paginator.pageSize = this.tableDefinitions.limit;
    }

    //Overriding
    setTableSortData(sort: MatSort) {
        super.setTableSortData(sort);
        const sortKeys = Object.keys(this.tableDefinitions.sort || {});
        if (sortKeys.length > 0) {
            this.sort.sort(<MatSortable> {id: sortKeys[0], start: this.tableDefinitions.sort[sortKeys[0]], disableClear: true});
        } else {
            this.sort.active = null;
        }
    }

    //Overriding
    protected _tablePaginatorPageChange(paginator: MatPaginator) {
        super._tablePaginatorPageChange(paginator);
        this.loadPage();
    }

    //Overriding
    protected _tableColumnSortChange(sort:MatSort, paginator:MatPaginator) {
        super._tableColumnSortChange(sort, paginator);
        this.loadPage();
    }

    toggleFilter(): void {
        this._cdkSidebarService.getSidebar('cdk-historico-filter').toggleOpen();
        this.showFilter = !this.showFilter;
    }

    loadPage(): void {
        const filter = this.gridFilter.filters;
        const contexto = this.gridFilter.contexto ? this.gridFilter.contexto : {};
        contexto['mostrarApagadas'] = this.hasExcluded;
        this.reload.emit({
            gridFilter: filter,
            limit: this.paginator.pageSize,
            offset: (this.paginator.pageSize * this.paginator.pageIndex),
            sort: this.sort.active ? {[this.sort.active]: this.sort.direction} : {},
            context: contexto
        });
    }

    loadExcluded(): void {
        this.hasExcluded = !this.hasExcluded;
        if (this.hasExcluded) {
            const filter = this.gridFilter.filters;
            this.excluded.emit({
                gridFilter: filter,
                limit: this.paginator.pageSize,
                offset: (this.paginator.pageSize * this.paginator.pageIndex),
                sort: this.sort.active ? {[this.sort.active]: this.sort.direction} : {},
                context: {mostrarApagadas: true}
            });
        }
        else {
            this.loadPage();
        }
    }

    editHistorico(historicoId): void {
        this.edit.emit(historicoId);
    }

    selectHistorico(historico: Historico): void {
        this.selected.emit(historico);
    }

    deleteHistorico(historicoId): void {
        this.delete.emit(historicoId);
    }

    deleteHistoricos(historicosId): void {
        historicosId.forEach(historicoId => this.deleteHistorico(historicoId));
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
        const arr = Object.keys(this.historicos).map(k => this.historicos[k]);
        this.selectedIds = arr.map(historico => historico.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(historicoId): void {
        const selectedHistoricoIds = [...this.selectedIds];

        if (selectedHistoricoIds.find(id => id === historicoId) !== undefined) {
            this.selectedIds = selectedHistoricoIds.filter(id => id !== historicoId);
        } else {
            this.selectedIds = [...selectedHistoricoIds, historicoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.historicos.length && this.selectedIds.length > 0);
    }

    setFilter(gridFilter): void {
        this.gridFilter = gridFilter;
        this.paginator.pageIndex = 0;
        this.loadPage();
    }

    doCancel(): void {
        this.cancel.emit();
    }

    doCreate(): void {
        this.create.emit();
    }

    getProp(obj, prop): any|boolean {
        if (obj && obj.hasOwnProperty(prop)) {
            return obj[prop];
        }
        return false;
    }

    getMessageError(obj): any {
        return obj?.error?.error?.message;
   }

    visualizarProcessoNovaAba(historico: Historico): void {
        window.open( '/apps/processo/' + historico.processo.id
            + '/visualizar', '_blank');
    }
}
