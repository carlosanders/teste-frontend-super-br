import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit, ViewChild, AfterViewInit,
    ViewEncapsulation, Input, OnChanges, Output, EventEmitter
} from '@angular/core';
import {merge, of} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {MatPaginator, MatSort} from '@cdk/angular/material';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';

import {Usuario} from '@cdk/models';
import {UsuarioDataSource} from '@cdk/data-sources/usuario-data-source';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'cdk-usuario-grid',
    templateUrl: './cdk-usuario-grid.component.html',
    styleUrls: ['./cdk-usuario-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkUsuarioGridComponent implements AfterViewInit, OnInit, OnChanges {

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

    @Output()
    create = new EventEmitter<any>();

    @Output()
    excluded = new EventEmitter<any>();

    @Input()
    displayedColumns: string[] = ['select', 'id', 'nome', 'actions'];

    allColumns: any[] = [
        {
            id: 'select',
            label: '',
            fixed: true
        },
        {
            id: 'id',
            label: 'Id',
            fixed: true
        },
        {
            id: 'nome',
            label: 'Nome',
            fixed: true
        },
        {
            id: 'assinaturaHTML',
            label: 'Assinatura HTML',
            fixed: false
        },
        {
            id: 'email',
            label: 'Email',
            fixed: false
        },
        {
            id: 'colaborador.cargo.nome',
            label: 'Cargo',
            fixed: false
        },
        {
            id: 'colaborador.modalidadeColaborador.valor',
            label: 'Modalidade Colaborador',
            fixed: false
        },
        {
            id: 'enabled',
            label: 'Habilitado',
            fixed: false
        },
        {
            id: 'nivelAcesso',
            label: 'Nível de Acesso',
            fixed: false
        },
        {
            id: 'username',
            label: 'Username',
            fixed: false
        },
        {
            id: 'criadoPor.nome',
            label: 'Criado Por',
            fixed: false
        },
        {
            id: 'criadoEm',
            label: 'Criado Em',
            fixed: false
        },
        {
            id: 'atualizadoPor.nome',
            label: 'Atualizado Por',
            fixed: false
        },
        {
            id: 'atualizadoEm',
            label: 'Atualizado Em',
            fixed: false
        },
        {
            id: 'apagadoPor.nome',
            label: 'Apagado Por',
            fixed: false
        },
        {
            id: 'apagadoEm',
            label: 'Apagado Em',
            fixed: false
        },
        {
            id: 'actions',
            label: '',
            fixed: true
        }
    ];

    columns = new FormControl();

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    @Input()
    deletingErrors: {};

    @Input()
    pageSize = 10;

    @Input()
    actions: string[] = ['edit', 'delete', 'select', 'lotacoes', 'afastamentos', 'vincularPessoa', 'distribuirTarefas'];

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

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
    vincular = new EventEmitter<number>();

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

    /**
     *
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService
    ) {
        this.gridFilter = {};
        this.usuarios = [];
    }

    ngOnChanges(): void {
        if (this.usuarios) {
            this.temDistribuidor = this.usuarios.some(item => item.isDisponivel);
        }
        this.dataSource = new UsuarioDataSource(of(this.usuarios));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
        const ElementQueries = require('css-element-queries/src/ElementQueries');
        ElementQueries.listen();
        ElementQueries.init();

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new UsuarioDataSource(of(this.usuarios));

        this.columns.setValue(this.allColumns.map(c => c.id).filter(c => this.displayedColumns.indexOf(c) > -1));

        this.columns.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((values) => {
                this.displayedColumns = [];
                this.allColumns.forEach(c => {
                    if (c.fixed || (values.indexOf(c.id) > -1)) {
                        this.displayedColumns.push(c.id);
                    }
                });
                this._changeDetectorRef.markForCheck();
                return of([]);
            })
        ).subscribe();
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

    deleteUsuarios(usuariosId): void {
        usuariosId.forEach(usuarioId => this.deleteUsuario(usuarioId));
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

    getProp(obj, prop) {
        if (obj && obj.hasOwnProperty(prop)) {
            return obj[prop];
        }
        return false;
    }

    doDistribuirTarefas(usuario: Usuario): void {
        this.distribuirTarefas.emit(usuario);
    }


}
