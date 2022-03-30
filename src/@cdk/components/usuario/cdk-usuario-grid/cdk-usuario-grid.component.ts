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

import {Usuario} from '@cdk/models';
import {UsuarioDataSource} from '@cdk/data-sources/usuario-data-source';
import {CdkUsuarioGridColumns} from './cdk-usuario-grid.columns';
import {TableDefinitionsService} from '../../table-definitions/table-definitions.service';
import * as _ from 'lodash';
import {CdkTableGridComponent} from '../../table-definitions/cdk-table-grid.component';

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

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    dataSource: UsuarioDataSource;
    showFilter = false;
    gridFilter: any;
    hasSelected = false;
    isIndeterminate = false;
    hasExcluded = false;
    temDistribuidor = false;

    constructor(
        protected _changeDetectorRef: ChangeDetectorRef,
        protected _cdkSidebarService: CdkSidebarService,
        protected _tableDefinitionsService: TableDefinitionsService
    ) {
        super(_tableDefinitionsService, _changeDetectorRef);
        this.gridFilter = {};
        this.usuarios = [];
        this.displayedColumns = ['select', 'id', 'nome', 'actions'];
        this._tableColumns = _.cloneDeep(CdkUsuarioGridColumns.columns);
        this._tableColumnsOriginal = _.cloneDeep(CdkUsuarioGridColumns.columns);
    }

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        this.dataSource = new UsuarioDataSource(of(this.usuarios));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
        super.ngOnInit();
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';
        this.paginator._intl.firstPageLabel = 'Primeiro';
        this.paginator._intl.lastPageLabel = 'Último';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new UsuarioDataSource(of(this.usuarios));
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
        this._cdkSidebarService.getSidebar('cdk-usuario-filter').toggleOpen();
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
