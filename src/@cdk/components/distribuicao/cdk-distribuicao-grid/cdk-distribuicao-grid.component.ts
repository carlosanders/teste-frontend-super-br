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

import {Distribuicao} from '@cdk/models';
import {DistribuicaoDataSource} from '@cdk/data-sources/distribuicao-data-source';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'cdk-distribuicao-grid',
    templateUrl: './cdk-distribuicao-grid.component.html',
    styleUrls: ['./cdk-distribuicao-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkDistribuicaoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    distribuicoes: Distribuicao[];

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Output()
    create = new EventEmitter<any>();

    @Input()
    displayedColumns: string[] = ['select', 'id', 'tarefa.especieTarefa.nome', 'documentoAvulso.descricaoOutros', 'dataHoraFinalPrazo',
        'usuarioAnterior.nome', 'usuarioPosterior.nome', 'setorAnterior.nome', 'setorPosterior.nome', 'distribuicaoAutomatica',
        'livreBalanceamento', 'auditoriaDistribuicao', 'tipoDistribuicao', 'actions'];

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
    selected = new EventEmitter<Distribuicao>();

    @Output()
    selectedIds: number[] = [];

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
            id: 'documentoAvulso.descricaoOutros',
            label: 'Documento',
            fixed: true
        },
        {
            id: 'tarefa.especieTarefa.nome',
            label: 'Espécie Tarefa',
            fixed: false
        },
        {
            id: 'dataHoraFinalPrazo',
            label: 'Data Final Prazo',
            fixed: false
        },
        {
            id: 'usuarioAnterior.nome',
            label: 'Usuário Anterior',
            fixed: false
        },
        {
            id: 'usuarioPosterior.nome',
            label: 'Usuário Posterior',
            fixed: false
        },
        {
            id: 'setorAnterior.nome',
            label: 'Setor Anterior',
            fixed: false
        },
        {
            id: 'setorPosterior.nome',
            label: 'Setor Posterior',
            fixed: false
        },
        {
            id: 'distribuicaoAutomatica',
            label: 'Distribuição Automática',
            fixed: false
        },
        {
            id: 'livreBalanceamento',
            label: 'Livre Balanceamento',
            fixed: false
        },
        {
            id: 'auditoriaDistribuicao',
            label: 'Auditoria Distribuição',
            fixed: false
        },
        {
            id: 'tipoDistribuicao',
            label: 'Tipo Distribuição',
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

    dataSource: DistribuicaoDataSource;

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
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService
    ) {
        this.gridFilter = {};
        this.distribuicoes = [];
    }

    ngOnChanges(): void {
        this.dataSource = new DistribuicaoDataSource(of(this.distribuicoes));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();

        this.paginator.pageSize = this.pageSize;
        this.dataSource = new DistribuicaoDataSource(of(this.distribuicoes));

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
        this._cdkSidebarService.getSidebar('cdk-distribuicao-filter').toggleOpen();
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

    editDistribuicao(distribuicaoId): void {
        this.edit.emit(distribuicaoId);
    }

    selectDistribuicao(distribuicao: Distribuicao): void {
        this.selected.emit(distribuicao);
    }

    deleteDistribuicao(distribuicaoId): void {
        this.delete.emit(distribuicaoId);
    }

    deleteDistribuicoes(distribuicoesId): void {
        distribuicoesId.forEach(distribuicaoId => this.deleteDistribuicao(distribuicaoId));
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
        const arr = Object.keys(this.distribuicoes).map(k => this.distribuicoes[k]);
        this.selectedIds = arr.map(distribuicao => distribuicao.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(distribuicaoId): void {
        const selectedDistribuicaoIds = [...this.selectedIds];

        if (selectedDistribuicaoIds.find(id => id === distribuicaoId) !== undefined) {
            this.selectedIds = selectedDistribuicaoIds.filter(id => id !== distribuicaoId);
        } else {
            this.selectedIds = [...selectedDistribuicaoIds, distribuicaoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.distribuicoes.length && this.selectedIds.length > 0);
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
