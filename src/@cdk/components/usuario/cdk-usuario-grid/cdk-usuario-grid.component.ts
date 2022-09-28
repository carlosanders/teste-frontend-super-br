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
import {Usuario} from '@cdk/models';
import {UsuarioDataSource} from '@cdk/data-sources/usuario-data-source';
import {CdkUsuarioGridColumns} from './cdk-usuario-grid.columns';
import * as _ from 'lodash';
import {CdkTableGridComponent} from '../../table-definitions/cdk-table-grid.component';
import {MatSortable} from '@angular/material/sort';
import {TableDefinitions} from "../../table-definitions/table-definitions";

@Component({
    selector: 'cdk-usuario-grid',
    templateUrl: './cdk-usuario-grid.component.html',
    styleUrls: ['./cdk-usuario-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkUsuarioGridComponent extends CdkTableGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    usuarios: Usuario[];

    @Input()
    externo: boolean;

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    @Input()
    deletingErrors: any = {};

    @Input()
    pageSize = 10;

    @Input()
    actions: string[] = ['edit', 'delete', 'select', 'lotacoes', 'afastamentos', 'vincularPessoa', 'distribuirTarefas'];

    @Output()
    create = new EventEmitter<any>();

    @Output()
    excluded = new EventEmitter<any>();

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    edit = new EventEmitter<number>();

    @Output()
    lotacoes = new EventEmitter<number>();

    @Output()
    afastamentos = new EventEmitter<number>();

    @Output()
    resetaSenhaColaborador = new EventEmitter<number>();

    @Output()
    resetaSenha = new EventEmitter<number>();

    @Output()
    coordenadores = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    deleteBlocoEmmitter = new EventEmitter<number[]>();

    @Output()
    vincular = new EventEmitter<number>();

    @Output()
    vincularRole = new EventEmitter<number>();

    @Output()
    distribuirTarefas = new EventEmitter<Usuario>();

    @Output()
    selected = new EventEmitter<Usuario>();

    @Output()
    selectedIds: number[] = [];

    dataSource: UsuarioDataSource;
    showFilter = false;
    gridFilter: any;
    hasSelected = false;
    isIndeterminate = false;
    hasExcluded = false;
    temDistribuidor = false;

    constructor(
        protected _changeDetectorRef: ChangeDetectorRef,
        protected _cdkSidebarService: CdkSidebarService
    ) {
        super(_changeDetectorRef);
        this.gridFilter = {};
        this.usuarios = [];
        this.tableColumns = _.cloneDeep(CdkUsuarioGridColumns.columns);
        const tableDefinitions = new TableDefinitions();
        tableDefinitions.version = CdkUsuarioGridColumns.version;
        this.tableDefinitions = tableDefinitions;
    }

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        this.dataSource = new UsuarioDataSource(of(this.usuarios));
    }

    ngOnInit(): void {
        super.ngOnInit();
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();
        this.dataSource = new UsuarioDataSource(of(this.usuarios));
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
        this._cdkSidebarService.getSidebar('cdk-usuario-filter').toggleOpen();
        this.showFilter = !this.showFilter;
    }

    loadPage(): void {
        const filter = this.gridFilter.filters;
        const contexto = this.gridFilter.contexto ? this.gridFilter.contexto : {};
        const limit = this.tableDefinitions.limit || 10;
        const sort = this.tableDefinitions.sort || {};
        contexto['mostrarApagadas'] = this.hasExcluded;
        this.reload.emit({
            gridFilter: filter,
            limit: limit,
            offset: (limit * this.paginator.pageIndex),
            sort: sort,
            context: contexto
        });
    }

    loadExcluded(): void {
        this.hasExcluded = !this.hasExcluded;
        if (this.hasExcluded) {
            const filter = this.gridFilter.filters;
            this.excluded.emit({
                gridFilter: filter,
                limit: this.tableDefinitions.limit,
                offset: (this.tableDefinitions.limit * this.paginator.pageIndex),
                sort: this.tableDefinitions.sort,
                context: {mostrarApagadas: true}
            });
        }
        else {
            this.loadPage();
        }
    }

    editUsuario(usuarioId): void {
        this.edit.emit(usuarioId);
    }

    lotacoesUsuario(usuarioId): void {
        this.lotacoes.emit(usuarioId);
    }

    afastamentosUsuario(usuarioId): void {
        this.afastamentos.emit(usuarioId);
    }

    coordenacoesUsuario(usuarioId): void {
        this.coordenadores.emit(usuarioId);
    }

    vincularPessoa(usuarioId): void {
        this.vincular.emit(usuarioId);
    }

    selectUsuario(usuario: Usuario): void {
        this.selected.emit(usuario);
    }

    deleteUsuario(usuarioId): void {
        this.delete.emit(usuarioId);
    }

    redefineSenha(usuarioId): void {
        this.resetaSenha.emit(usuarioId);
    }

    redefineSenhaColaborador(usuarioId): void {
        this.resetaSenhaColaborador.emit(usuarioId);
    }

    deleteBloco(ids): void {
        this.deleteBlocoEmmitter.emit(ids);
    }

    vincularUsuarioRole(usuarioId): void {
        this.vincularRole.emit(usuarioId);
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
        const arr = Object.keys(this.usuarios).map(k => this.usuarios[k]);
        this.selectedIds = arr.map(usuario => usuario.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(usuarioId): void {
        const selectedUsuarioIds = [...this.selectedIds];

        if (selectedUsuarioIds.find(id => id === usuarioId) !== undefined) {
            this.selectedIds = selectedUsuarioIds.filter(id => id !== usuarioId);
        } else {
            this.selectedIds = [...selectedUsuarioIds, usuarioId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.usuarios.length && this.selectedIds.length > 0);
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

    doDistribuirTarefas(usuario: Usuario): void {
        this.distribuirTarefas.emit(usuario);
    }
}
