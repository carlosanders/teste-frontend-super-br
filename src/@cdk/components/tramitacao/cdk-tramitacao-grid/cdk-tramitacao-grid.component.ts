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
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {merge, of} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {MatPaginator, MatSort} from '@cdk/angular/material';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';

import {Tramitacao, Usuario} from '@cdk/models';
import {TramitacaoDataSource} from '@cdk/data-sources/tramitacao-data-source';
import {FormControl} from '@angular/forms';
import {LoginService} from '../../../../app/main/auth/login/login.service';

@Component({
    selector: 'cdk-tramitacao-grid',
    templateUrl: './cdk-tramitacao-grid.component.html',
    styleUrls: ['./cdk-tramitacao-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkTramitacaoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    tramitacoes: Tramitacao[];

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Output()
    create = new EventEmitter<any>();

    @Output()
    excluded = new EventEmitter<any>();

    @Input()
    displayedColumns: string[] = ['select', 'id', 'processo', 'setorOrigem.nome', 'setorDestino.nome',
        'dataHoraRecebimento', 'usuarioRecebimento.nome', 'urgente', 'actions'];

    allColumns: any[] = [
        {
            id: 'select',
            label: '',
            fixed: true
        },
        {
            id: 'processo',
            label: 'NUP',
            fixed: true
        },
        {
            id: 'observacao',
            label: 'Observação',
            fixed: true
        },
        {
            id: 'urgente',
            label: 'urgente',
            fixed: false
        },
        {
            id: 'setorOrigem.nome',
            label: 'setorOrigem.nome',
            fixed: false
        },
        {
            id: 'setorDestino.nome',
            label: 'setorDestino.nome',
            fixed: false
        },
        {
            id: 'dataHoraRecebimento',
            label: 'dataHoraRecebimento',
            fixed: false
        },
        {
            id: 'usuarioRecebimento.nome',
            label: 'usuarioRecebimento.nome',
            fixed: false
        },
        {
            id: 'pessoaDestino.nome',
            label: 'Pessoa Destino',
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
    deletingErrors: any = {};

    @Input()
    pageSize = 10;

    @Input()
    actions: string[] = ['edit', 'delete', 'select', 'view'];

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    view = new EventEmitter<number>();

    @Output()
    edit = new EventEmitter<number>();

    @Output()
    recebimento = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    deleteBlocoEmmitter = new EventEmitter<number[]>();

    @Output()
    selected = new EventEmitter<Tramitacao>();

    @Output()
    selectedIds: number[] = [];

    dataSource: TramitacaoDataSource;

    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;
    hasExcluded = false;

    _profile: Usuario;
    idsSetoresLotacao: number[] = [];

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        public _loginService: LoginService
    ) {
        this.gridFilter = {};
        this.tramitacoes = [];
        this._profile = this._loginService.getUserProfile();

        this._profile.colaborador.lotacoes.map(lot => lot.setor.id).forEach(id => this.idsSetoresLotacao.push(id));
    }

    ngOnChanges(): void {
        this.dataSource = new TramitacaoDataSource(of(this.tramitacoes));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();

        this.paginator.pageSize = this.pageSize;
        this.dataSource = new TramitacaoDataSource(of(this.tramitacoes));

        this.columns.setValue(this.allColumns.map(c => c.id).filter(c => this.displayedColumns.indexOf(c) > -1));

        this.columns.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((values) => {
                this.displayedColumns = [];
                this.allColumns.forEach((c) => {
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
        this._cdkSidebarService.getSidebar('cdk-tramitacao-filter').toggleOpen();
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

    viewTramitacao(tramitacaoId): void {
        this.view.emit(tramitacaoId);
    }

    editTramitacao(tramitacaoId): void {
        this.edit.emit(tramitacaoId);
    }

    editRecebimento(tramitacaoId): void {
        this.recebimento.emit(tramitacaoId);
    }

    selectTramitacao(tramitacao: Tramitacao): void {
        this.selected.emit(tramitacao);
    }

    deleteTramitacao(tramitacaoId): void {
        this.delete.emit(tramitacaoId);
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
        const arr = Object.keys(this.tramitacoes).map(k => this.tramitacoes[k]);
        this.selectedIds = arr.map(tramitacao => tramitacao.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(tramitacaoId): void {
        const selectedTramitacaoIds = [...this.selectedIds];

        if (selectedTramitacaoIds.find(id => id === tramitacaoId) !== undefined) {
            this.selectedIds = selectedTramitacaoIds.filter(id => id !== tramitacaoId);
        } else {
            this.selectedIds = [...selectedTramitacaoIds, tramitacaoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.tramitacoes.length && this.selectedIds.length > 0);
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
}
