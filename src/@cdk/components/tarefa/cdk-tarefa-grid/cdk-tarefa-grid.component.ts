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
import {tap} from 'rxjs/operators';
import {TarefaDataSource} from '@cdk/data-sources/tarefa-data-source';
import {Tarefa} from '@cdk/models';
import {TableColumn} from "../../table-definitions/table-column";
import {TableDefinitionsService} from "../../table-definitions/table-definitions.service";
import {CdkTarefaGridColumns} from "./cdk-tarefa-grid.columns";
import {CdkTableGridComponent} from "../../table-definitions/cdk-table-grid.component";
import * as _ from "lodash";

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
    displayedColumns: string[] = ['select', 'id', 'processo.nup', 'especieTarefa.nome', 'dataHoraInicioPrazo',
        'dataHoraFinalPrazo', 'actions'];

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    @Input()
    deletingErrors: any = {};

    @Input()
    pageSize = 10;

    @Input()
    actions: string[] = ['edit', 'delete', 'select'];

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

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

    /*
    * Drag and Drop
    * */
    @Input() parentIdentifier: string;
    @Output() columnsDefinitionsChange: EventEmitter<TableColumn[]> = new EventEmitter<TableColumn[]>();

    protected _resizing: boolean = false;
    protected _tableColumns: TableColumn[] = []

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     */
    constructor(
        protected _changeDetectorRef: ChangeDetectorRef,
        protected _cdkSidebarService: CdkSidebarService,
        protected _tableDefinitionsService: TableDefinitionsService,
    ) {
        super(_tableDefinitionsService, _changeDetectorRef);
        this.gridFilter = {};
        this._tableColumns = _.cloneDeep(CdkTarefaGridColumns.columns);
        this._tableColumnsOriginal = _.cloneDeep(CdkTarefaGridColumns.columns);
    }

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        this.dataSource = new TarefaDataSource(of(this.tarefas));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';
        this.paginator._intl.firstPageLabel = 'Primeiro';
        this.paginator._intl.lastPageLabel = 'Último';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new TarefaDataSource(of(this.tarefas));
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
        this._cdkSidebarService.getSidebar('cdk-tarefa-filter-grid').toggleOpen();
        this.showFilter = !this.showFilter;
    }

    loadPage(): void {
        const filter = this.gridFilter.filters;
        const contexto = this.gridFilter.contexto ? this.gridFilter.contexto : null;
        this.reload.emit({
            gridFilter: filter,
            limit: this.paginator.pageSize,
            offset: (this.paginator.pageSize * this.paginator.pageIndex),
            sort: this.sort.active ? {[this.sort.active]: this.sort.direction} : {},
            context: contexto
        });
        this.hasExcluded = false;
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
