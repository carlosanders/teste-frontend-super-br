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
    ViewEncapsulation
} from '@angular/core';
import {of} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {MatPaginator, MatSort} from '@cdk/angular/material';
import {TarefaDataSource} from '@cdk/data-sources/tarefa-data-source';
import {Tarefa} from '@cdk/models';
import {CdkTarefaGridColumns} from './cdk-tarefa-grid.columns';
import {CdkTableGridComponent} from '../../table-definitions/cdk-table-grid.component';
import * as _ from 'lodash';
import {MatSortable} from '@angular/material/sort';
import {TableDefinitions} from '../../table-definitions/table-definitions';

@Component({
    selector: 'cdk-tarefa-grid',
    templateUrl: './cdk-tarefa-grid.component.html',
    styleUrls: ['./cdk-tarefa-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkTarefaGridComponent extends CdkTableGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    tarefas: Tarefa[] = [];

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
    actions: string[] = ['edit', 'delete', 'select'];

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    excluded = new EventEmitter<any>();

    @Output()
    edit = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    listAtividades = new EventEmitter<number>();

    @Output()
    deleteBlocoEmmitter = new EventEmitter<number[]>();

    @Output()
    selected = new EventEmitter<Tarefa>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    selectedIds: number[] = [];

    @Output()
    listCompartilhamentos = new EventEmitter<number>();

    dataSource: TarefaDataSource;
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
        protected _cdkSidebarService: CdkSidebarService,
    ) {
        super(_changeDetectorRef);
        this.gridFilter = {};
        this.tableColumns = _.cloneDeep(CdkTarefaGridColumns.columns);
        const tableDefinitions = new TableDefinitions();
        tableDefinitions.version = CdkTarefaGridColumns.version;
        this.tableDefinitions = tableDefinitions;
    }

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        this.dataSource = new TarefaDataSource(of(this.tarefas));
    }

    ngOnInit(): void {
        super.ngOnInit();
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();
        this.dataSource = new TarefaDataSource(of(this.tarefas));
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
        this._cdkSidebarService.getSidebar('cdk-tarefa-filter-grid').toggleOpen();
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

    editTarefa(tarefaId): void {
        this.edit.emit(tarefaId);
    }

    selectTarefa(tarefa: Tarefa): void {
        this.selected.emit(tarefa);
    }

    deleteTarefa(tarefaId): void {
        this.delete.emit(tarefaId);
    }

    listAtividade(tarefaId): void {
        this.listAtividades.emit(tarefaId);
    }

    listCompartilhamento(tarefaId): void {
        this.listCompartilhamentos.emit(tarefaId);
    }

    deleteBloco(ids): void {
        this.deleteBlocoEmmitter.emit(ids);
        this.selectedIds = this.selectedIds.filter(id => ids.indexOf(id) === -1);
        this.recompute();
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
        const arr = Object.keys(this.tarefas).map(k => this.tarefas[k]);
        this.selectedIds = arr.map(tarefa => tarefa.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(tarefaId): void {
        const selectedTarefaIds = [...this.selectedIds];

        if (selectedTarefaIds.find(id => id === tarefaId) !== undefined) {
            this.selectedIds = selectedTarefaIds.filter(id => id !== tarefaId);
        } else {
            this.selectedIds = [...selectedTarefaIds, tarefaId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.tarefas.length && this.selectedIds.length > 0);
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
}
