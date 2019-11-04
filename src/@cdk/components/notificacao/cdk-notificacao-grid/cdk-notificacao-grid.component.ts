import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit, ViewChild, AfterViewInit,
    ViewEncapsulation, Input, OnChanges, Output, EventEmitter
} from '@angular/core';
import {merge, of} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {MatPaginator, MatSort} from '@angular/material';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';

import {Notificacao} from '@cdk/models/notificacao.model';
import {NotificacaoDataSource} from '@cdk/data-sources/notificacao-data-source';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'cdk-notificacao-grid',
    templateUrl: './cdk-notificacao-grid.component.html',
    styleUrls: ['./cdk-notificacao-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkNotificacaoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    notificacoes: Notificacao[];

    @Input()
    total = 0;

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
    pageSize = 5;

    @Input()
    actions: string[] = ['edit', 'delete', 'select'];

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
    delete = new EventEmitter<number>();

    @Output()
    selected = new EventEmitter<Notificacao>();

    @Output()
    selectedIds: number[] = [];

    dataSource: NotificacaoDataSource;

    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;

    /**
     * @param _changeDetectorRef
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseSidebarService: FuseSidebarService
    ) {
        this.gridFilter = {};
        this.notificacoes = [];
    }

    ngOnChanges(): void {
        this.dataSource = new NotificacaoDataSource(of(this.notificacoes));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
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
        this._fuseSidebarService.getSidebar('cdk-notificacao-main-sidebar').toggleOpen();
        this.showFilter = !this.showFilter;
    }

    loadPage(): void {
        this.reload.emit({
            gridFilter: this.gridFilter,
            limit: this.paginator.pageSize,
            offset: (this.paginator.pageSize * this.paginator.pageIndex),
            sort: this.sort.active ? {[this.sort.active]: this.sort.direction} : {}
        });
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

    setGridFilter(gridFilter): void {
        this.gridFilter = gridFilter;
        this.paginator.pageIndex = 0;
        this.loadPage();
    }

    doCancel(): void {
        this.cancel.emit();
    }
}
