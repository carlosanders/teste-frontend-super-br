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
    ViewEncapsulation,
} from '@angular/core';
import {merge, of} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {MatDialog, MatPaginator, MatSort} from '@cdk/angular/material';
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from 'rxjs/operators';
import {Pagination, Processo} from '@cdk/models';
import {ProcessoDataSource} from '@cdk/data-sources/processo-data-source';
import {FormControl} from '@angular/forms';
import {CdkChaveAcessoPluginComponent} from '../../chave-acesso/cdk-chave-acesso-plugins/cdk-chave-acesso-plugin.component';
import {LoginService} from 'app/main/auth/login/login.service';
import {SearchBarEtiquetasFiltro} from "../../search-bar-etiquetas/search-bar-etiquetas-filtro";

@Component({
    selector: 'cdk-processo-grid',
    templateUrl: './cdk-processo-grid.component.html',
    styleUrls: ['./cdk-processo-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkProcessoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    processos: Processo[] = [];

    @Input()
    arraySearchTypes: SearchBarEtiquetasFiltro[] = [];

    @Input()
    vinculacaoEtiquetaPagination: Pagination;

    showFilter = false;

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Input()
    mobileMode = false;

    @Output()
    create = new EventEmitter<any>();

    @Input()
    displayedColumns: string[] = ['select', 'id', 'NUP', 'setorAtual.nome', 'unidade', 'actions'];

    @Input()
    allColumns: any[] = [
        {
            id: 'select',
            label: '',
            fixed: true,
            mode: 'all',
            sort: 'all'
        },
        {
            id: 'id',
            label: 'Id',
            fixed: true,
            mode: 'all',
            sort: 'all'
        },
        {
            id: 'NUP',
            label: 'Processo',
            fixed: true,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'unidade',
            label: 'Unidade',
            fixed: true,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'descricao',
            label: 'Descricao',
            fixed: true,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'valorEconomico',
            label: 'Valor',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'semValorEconomico',
            label: 'Sem Valor Econômico',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'especieProcesso.nome',
            label: 'Processo de Trabalho',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'visibilidadeExterna',
            label: 'Visibilidade Externa',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'dataHoraAbertura',
            label: 'Data Abertura',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'dataHoraProximaTransicao',
            label: 'Data Próxima Transição',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'titulo',
            label: 'Título',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'outroNumero',
            label: 'Outro Número',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'chaveAcesso',
            label: 'Chave Acesso',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'modalidadeMeio',
            label: 'Modalidade Meio',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'modalidadeFase.valor',
            label: 'Modalidade Fase',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'documentoAvulsoOrigem.setorOrigem.nome',
            label: 'Documento Avulso Origem',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'classificacao.nome',
            label: 'Classificação',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'procedencia.nome',
            label: 'Procedência',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'localizador.nome',
            label: 'Localizador',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'setorAtual.nome',
            label: 'Setor Responsável',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'setorInicial.nome',
            label: 'Setor Inicial',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'origemDados',
            label: 'Origem Dados',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'criadoPor.nome',
            label: 'Criado Por',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'criadoEm',
            label: 'Criado Em',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'atualizadoPor.nome',
            label: 'Atualizado Por',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'atualizadoEm',
            label: 'Atualizado Em',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'actions',
            label: '',
            fixed: true,
            mode: 'all',
            sort: 'list'
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
    view = new EventEmitter<any>();

    @Output()
    edit = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    selected = new EventEmitter<Processo>();

    @Output()
    restricoesAcesso = new EventEmitter<Processo>();

    @Output()
    protocoloExterno = new EventEmitter<number>();

    @Output()
    selectedIds: number[] = [];

    dataSource: ProcessoDataSource;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;
    hasExcluded = false;

    /**
     *
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _dialog
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _dialog: MatDialog,
        private _loginService: LoginService
    ) {
        this.gridFilter = {};
        this.processos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new ProcessoDataSource(of(this.processos));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();

        this.paginator.pageSize = this.pageSize;
        this.dataSource = new ProcessoDataSource(of(this.processos));

        this.columns.setValue(this.getAllColumns().map(c => c.id).filter(c => this.displayedColumns.indexOf(c) > -1));

        this.columns.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((values) => {
                this.displayedColumns = [];
                this.getAllColumns().forEach((c) => {
                    if (c.fixed || (values.indexOf(c.id) > -1)) {
                        this.displayedColumns.push(c.id);
                    }
                });
                this._changeDetectorRef.markForCheck();
                return of([]);
            })
        ).subscribe();
    }

    getSort(columnId: string): boolean {
        let disabled = true;
        this.getAllColumns().forEach((c) => {
            if (c.id === columnId && (c.sort === 'all' || c.sort === this.mode)) {
                disabled = false;
            }
        });
        return disabled;
    }

    getAllColumns(): any[] {
        return this.allColumns.filter(
            c => c.mode === 'all' || c.mode === this.mode
        );
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
        this._cdkSidebarService.getSidebar('cdk-processo-filter').toggleOpen();
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

    viewProcesso(processo: Processo): void {
        if (processo.visibilidadeExterna || this._loginService.isGranted('ROLE_COLABORADOR')) {
            this.view.emit({id: processo.id});
            return;
        }

        const dialogRef = this._dialog.open(CdkChaveAcessoPluginComponent, {
            width: '600px'
        });

        dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe((result) => {
            this.view.emit({id: processo.id, chaveAcesso: result});
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

    doRestricoesAcesso(processo: Processo): void {
        this.restricoesAcesso.emit(processo);
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

    setFilter(gridFilter): void {
        if(this.mobileMode && this.processos) {
            (<HTMLInputElement>document.getElementById('sidebarId')).classList.remove('mobile-processo-pesquisa-on');
            (<HTMLInputElement>document.getElementById('sidebarId')).classList.add('mobile-processo-pesquisa-off');
            (<HTMLInputElement>document.getElementById('responsiveGrid')).classList.remove('mobile-processo-lista-off');
            (<HTMLInputElement>document.getElementById('responsiveGrid')).classList.add('mobile-processo-lista-on');
        }
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

    cssPesquisaOn() {
        (<HTMLInputElement>document.getElementById('sidebarId')).classList.remove('mobile-processo-pesquisa-off');
        (<HTMLInputElement>document.getElementById('sidebarId')).classList.add('mobile-processo-pesquisa-on');
        (<HTMLInputElement>document.getElementById('responsiveGrid')).classList.remove('mobile-processo-lista-on');
        (<HTMLInputElement>document.getElementById('responsiveGrid')).classList.add('mobile-processo-lista-off');
    }

    protocolarRequerimento(processoId): void {
        this.protocoloExterno.emit(processoId);
    }
}
