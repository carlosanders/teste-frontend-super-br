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

import {Notificacao} from '@cdk/models';
import {NotificacaoDataSource} from '@cdk/data-sources/notificacao-data-source';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'cdk-notificacao-grid',
    templateUrl: './cdk-notificacao-grid.component.html',
    styleUrls: ['./cdk-notificacao-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkNotificacaoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    notificacoes: Notificacao[];

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Output()
    create = new EventEmitter<any>();

    @Input()
    displayedColumns: string[] =
        ['select', 'id', 'remetente.nome', 'destinatario.nome', 'modalidadeNotificacao.valor', 'dataHoraExpiracao', 'dataHoraLeitura', 'conteudo', 'urgente', 'actions'];

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
            id: 'remetente.nome',
            label: 'Usuário Remetente',
            fixed: true
        },
        {
            id: 'destinatario.nome',
            label: 'Usuário Destinatário',
            fixed: false
        },
        {
            id: 'modalidadeNotificacao.valor',
            label: 'Modalidade',
            fixed: false
        },
        {
            id: 'dataHoraExpiracao',
            label: 'Data de Expiração',
            fixed: false
        },
        {
            id: 'dataHoraLeitura',
            label: 'Data da Leitura',
            fixed: false
        },
        {
            id: 'conteudo',
            label: 'Conteúdo',
            fixed: false
        },
        {
            id: 'urgente',
            label: 'Urgente',
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
    pageSize = 10;

    @Input()
    actions: string[] = ['edit', 'delete', 'select', 'toggleLida'];

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
    toggleLida = new EventEmitter<Notificacao>();

    @Output()
    selected = new EventEmitter<Notificacao>();

    @Output()
    selectedIds: number[] = [];

    dataSource: NotificacaoDataSource;

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
        this.notificacoes = [];
    }

    ngOnChanges(): void {
        this.dataSource = new NotificacaoDataSource(of(this.notificacoes));
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

        this.dataSource = new NotificacaoDataSource(of(this.notificacoes));

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
        this._cdkSidebarService.getSidebar('cdk-notificacao-filter').toggleOpen();
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

    editNotificacao(notificacaoId): void {
        this.edit.emit(notificacaoId);
    }

    selectNotificacao(notificacao: Notificacao): void {
        this.selected.emit(notificacao);
    }

    deleteNotificacao(notificacaoId): void {
        this.delete.emit(notificacaoId);
    }

    toggleLidaNotificacao(notificacao: Notificacao): void {
        this.toggleLida.emit(notificacao);
    }

    deleteNotificacoes(notificacoesId): void {
        notificacoesId.forEach(notificacaoId => this.deleteNotificacao(notificacaoId));
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
        const arr = Object.keys(this.notificacoes).map(k => this.notificacoes[k]);
        this.selectedIds = arr.map(notificacao => notificacao.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(notificacaoId): void {
        const selectedNotificacaoIds = [...this.selectedIds];

        if (selectedNotificacaoIds.find(id => id === notificacaoId) !== undefined) {
            this.selectedIds = selectedNotificacaoIds.filter(id => id !== notificacaoId);
        } else {
            this.selectedIds = [...selectedNotificacaoIds, notificacaoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.notificacoes.length && this.selectedIds.length > 0);
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
}
