import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    QueryList, SimpleChanges,
    ViewChild,
    ViewChildren,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {merge, of} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {MatPaginator, MatSort} from '@cdk/angular/material';

import {Tramitacao} from '@cdk/models';
import {TramitacaoDataSource} from '@cdk/data-sources/tramitacao-data-source';
import {FormControl} from '@angular/forms';
import {CdkTableGridComponent} from "../../table-definitions/cdk-table-grid.component";
import * as _ from "lodash";
import {TableDefinitions} from "../../table-definitions/table-definitions";
import {CdkRemessaGridColumns} from "./cdk-remessa-grid.columns";
import {MatSortable} from "@angular/material/sort";
import {CdkConfigService} from "../../../services/config.service";
import {DynamicService} from "../../../../modules/dynamic.service";
import {modulesConfig} from "../../../../modules/modules-config";

@Component({
    selector: 'cdk-remessa-grid',
    templateUrl: './cdk-remessa-grid.component.html',
    styleUrls: ['./cdk-remessa-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkRemessaGridComponent extends CdkTableGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    remessas: Tramitacao[];

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Output()
    create = new EventEmitter<any>();

    columns = new FormControl();

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
    cancel = new EventEmitter<any>();

    @Output()
    edit = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    deleteBlocoEmmitter = new EventEmitter<number[]>();

    @Output()
    selected = new EventEmitter<Tramitacao>();

    @Output()
    selectedIds: number[] = [];

    @Output()
    recebimento = new EventEmitter<number>();

    @Input()
    recebendoIds: number[] = [];

    @Input()
    recebidoIds: number[] = [];

    dataSource: TramitacaoDataSource;
    showFilter = false;
    gridFilter: any;
    hasSelected = false;
    isIndeterminate = false;
    hasExcluded = false;

    @Output()
    statusBarramento = new EventEmitter<number[]>();

    @ViewChildren('buttonModule', {read: ViewContainerRef}) btContainer: QueryList<ViewContainerRef>;

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _dynamicService
     * @param _cdkConfigService
     */
    constructor(
        protected _changeDetectorRef: ChangeDetectorRef,
        protected _cdkSidebarService: CdkSidebarService,
        private _dynamicService: DynamicService,
        public _cdkConfigService: CdkConfigService,
    ) {
        super(_changeDetectorRef);
        this.gridFilter = {};
        this.remessas = [];

        this.tableColumns = _.cloneDeep(CdkRemessaGridColumns.columns);
        const tableDefinitions = new TableDefinitions();
        tableDefinitions.version = CdkRemessaGridColumns.version;
        this.tableDefinitions = tableDefinitions;
    }

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        this.dataSource = new TramitacaoDataSource(of(this.remessas));

        if (this.remessas) {
            this.carregaModulo();
        }
    }

    ngOnInit(): void {
        super.ngOnInit();
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();
        this.dataSource = new TramitacaoDataSource(of(this.remessas));
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
        this._cdkSidebarService.getSidebar('cdk-remessa-filter').toggleOpen();
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

    editRemessa(remessaId): void {
        this.edit.emit(remessaId);
    }

    selectRemessa(remessa: Tramitacao): void {
        this.selected.emit(remessa);
    }

    deleteRemessa(remessaId): void {
        this.delete.emit(remessaId);
    }

    deleteBloco(ids): void {
        this.deleteBlocoEmmitter.emit(ids);
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
        const arr = Object.keys(this.remessas).map(k => this.remessas[k]);
        this.selectedIds = arr.map(remessa => remessa.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(remessaId): void {
        const selectedRemessaIds = [...this.selectedIds];

        if (selectedRemessaIds.find(id => id === remessaId) !== undefined) {
            this.selectedIds = selectedRemessaIds.filter(id => id !== remessaId);
        } else {
            this.selectedIds = [...selectedRemessaIds, remessaId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.remessas.length && this.selectedIds.length > 0);
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

    editRecebimento(tramitacaoId): void {
        this.recebimento.emit(tramitacaoId);
    }

    verificaStatusBarramento(documentosAvulsosId: number[]): void {
        this.statusBarramento.emit(documentosAvulsosId);
    }

    carregaModulo(): void {
        if (this.btContainer) {
            this.btContainer.reset([]);
        }
        const path = '@cdk/components/remessa/cdk-remessa-grid/cdk-remessa-grid#button';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then((componentFactory) => {
                            this.btContainer.forEach((button, index) => {
                                const componentRef = button.createComponent(componentFactory);
                                componentRef.instance['remessaId'] = this.remessas[index]['id'];
                                componentRef.instance['mecanismoRemessa'] = this.remessas[index]['mecanismoRemessa'];
                                componentRef.instance['apagadoEm'] = !!this.remessas[index]['apagadoEm'];
                            });
                            this._changeDetectorRef.markForCheck();
                        });
                }));
            }
        });
    }

}
