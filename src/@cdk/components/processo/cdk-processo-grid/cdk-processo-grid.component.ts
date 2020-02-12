import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    AfterViewInit,
    ViewEncapsulation,
    Input,
    OnChanges,
    Output,
    EventEmitter
} from '@angular/core';
import {merge, of} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from 'rxjs/operators';
import {Processo} from '@cdk/models/processo.model';
import {ProcessoDataSource} from '@cdk/data-sources/processo-data-source';
import {FormControl} from '@angular/forms';
import {CdkChaveAcessoPluginComponent} from '../../chave-acesso/cdk-chave-acesso-plugins/cdk-chave-acesso-plugin.component';

@Component({
    selector: 'cdk-processo-grid',
    templateUrl: './cdk-processo-grid.component.html',
    styleUrls: ['./cdk-processo-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkProcessoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    processos: Processo[];

    showFilter = false;

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Input()
    displayedColumns: string[] = ['select', 'id', 'NUP', 'setorAtual.nome', 'unidade', 'actions'];

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
            id: 'NUP',
            label: 'Processo',
            fixed: true
        },
        {
            id: 'unidade',
            label: 'Unidade',
            fixed: true
        },
        {
            id: 'descricao',
            label: 'Descricao',
            fixed: true
        },
        {
            id: 'novo',
            label: 'Novo',
            fixed: false
        },
        {
            id: 'valorEconomico',
            label: 'Valor',
            fixed: false
        },
        {
            id: 'semValorEconomico',
            label: 'Sem Valor',
            fixed: false
        },
        {
            id: 'especieProcesso.nome',
            label: 'Espécie Processo',
            fixed: false
        },
        {
            id: 'visibilidadeExterna',
            label: 'Visibilidade Externa',
            fixed: false
        },
        {
            id: 'dataHoraAbertura',
            label: 'Data Abertura',
            fixed: false
        },
        {
            id: 'acessoNegado',
            label: 'Acesso Negado',
            fixed: false
        },
        {
            id: 'dataHoraProximaTransicao',
            label: 'Data Próxima Transição',
            fixed: false
        },
        {
            id: 'titulo',
            label: 'Título',
            fixed: false
        },
        {
            id: 'outroNumero',
            label: 'Outro Número',
            fixed: false
        },
        {
            id: 'chaveAcesso',
            label: 'Chave Acesso',
            fixed: false
        },
        {
            id: 'modalidadeMeio.valor',
            label: 'Modalidade Meio',
            fixed: false
        },
        {
            id: 'modalidadeFase.valor',
            label: 'Modalidade Fase',
            fixed: false
        },
        {
            id: 'documentoAvulsoOrigem.setorOrigem.nome',
            label: 'Documento Avulso Origem',
            fixed: false
        },
        {
            id: 'classificacao.nome',
            label: 'Classificação',
            fixed: false
        },
        {
            id: 'procedencia.nome',
            label: 'ProcedÊncia',
            fixed: false
        },
        {
            id: 'localizador.nome',
            label: 'Localizador',
            fixed: false
        },
        {
            id: 'setorAtual.nome',
            label: 'Setor Atual',
            fixed: false
        },
        {
            id: 'setorInicial.nome',
            label: 'Setor Inicial',
            fixed: false
        },
        {
            id: 'origemDados.fonteDados',
            label: 'Origem Dados',
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
    view = new EventEmitter<any>();

    @Output()
    edit = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    selected = new EventEmitter<Processo>();

    @Output()
    selectedIds: number[] = [];

    dataSource: ProcessoDataSource;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;

    /**
     *
     * @param _changeDetectorRef
     * @param _fuseSidebarService
     * @param dialog
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseSidebarService: FuseSidebarService,
        private dialog: MatDialog
    ) {
        this.gridFilter = {};
        this.processos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new ProcessoDataSource(of(this.processos));
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

        this.dataSource = new ProcessoDataSource(of(this.processos));

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
        this._fuseSidebarService.getSidebar('cdk-processo-main-sidebar').toggleOpen();
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
    }

    viewProcesso(processo: Processo): void {
        if (processo.visibilidadeExterna) {
            this.view.emit({id: processo.id});
            return;
        }

        const dialogRef = this.dialog.open(CdkChaveAcessoPluginComponent, {
            width: '600px'
        });

        dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe(result => {
            this.view.emit({id: processo.id, chave_acesso: result});
            return;
        });
    }

    editProcesso(processoId): void {
        this.edit.emit(processoId);
    }

    selectProcesso(processo: Processo): void {
        this.selected.emit(processo);
    }

    deleteProcesso(processoId): void {
        this.delete.emit(processoId);
    }

    deleteProcessos(processosId): void {
        processosId.forEach(processoId => this.deleteProcesso(processoId));
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
        const arr = Object.keys(this.processos).map(k => this.processos[k]);
        this.selectedIds = arr.map(processo => processo.id);
        this.recompute();
    }

    /**
     * Deselect all
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(processoId): void {
        const selectedProcessoIds = [...this.selectedIds];

        if (selectedProcessoIds.find(id => id === processoId) !== undefined) {
            this.selectedIds = selectedProcessoIds.filter(id => id !== processoId);
        } else {
            this.selectedIds = [...selectedProcessoIds, processoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.processos.length && this.selectedIds.length > 0);
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
