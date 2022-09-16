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
    QueryList,
    ViewChild,
    ViewChildren,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {merge, of} from 'rxjs';
import {cdkAnimations} from '@cdk/animations';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {MatPaginator, MatSort} from '@cdk/angular/material';
import {debounceTime, distinctUntilChanged, switchMap, takeUntil, tap} from 'rxjs/operators';
import {DocumentoAvulso} from '@cdk/models';
import {DocumentoAvulsoDataSource} from '@cdk/data-sources/documento-avulso-data-source';
import {FormControl} from '@angular/forms';
import {modulesConfig} from '../../../../modules/modules-config';
import {DynamicService} from '../../../../modules/dynamic.service';
import {CdkConfigService} from "../../../services/config.service";

@Component({
    selector: 'cdk-documento-avulso-grid',
    templateUrl: './cdk-documento-avulso-grid.component.html',
    styleUrls: ['./cdk-documento-avulso-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkDocumentoAvulsoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    documentosAvulsos: DocumentoAvulso[];

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Output()
    create = new EventEmitter<any>();

    @Input()
    displayedColumns: string[] = ['select', 'id', 'especieDocumentoAvulso.nome', 'pessoaDestino.nome', 'setorDestino.nome', 'actions'];

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
            id: 'especieDocumentoAvulso.nome',
            label: 'Espécie de Documento Avulso',
            fixed: true
        },
        {
            id: 'setorOrigem.nome',
            label: 'Setor de Origem',
            fixed: false
        },
        {
            id: 'observacao',
            label: 'Observação',
            fixed: false
        },
        {
            id: 'urgente',
            label: 'Urgente',
            fixed: false
        },
        {
            id: 'modelo.nome',
            label: 'Modelo',
            fixed: false
        },
        {
            id: 'dataHoraEncerramento',
            label: 'Data Encerramento',
            fixed: false
        },
        {
            id: 'dataHoraInicioPrazo',
            label: 'Data do Início Prazo',
            fixed: false
        },
        {
            id: 'dataHoraFinalPrazo',
            label: 'Data do Final do Prazo',
            fixed: false
        },
        {
            id: 'dataHoraConclusaoPrazo',
            label: 'Data da Conclusão do Prazo',
            fixed: false
        },
        {
            id: 'pessoaDestino.nome',
            label: 'Pessoa de Destino',
            fixed: false
        },
        {
            id: 'setorDestino.nome',
            label: 'Setor de Destino',
            fixed: false
        },
        {
            id: 'dataHoraRemessa',
            label: 'Data Remessa',
            fixed: false
        },
        {
            id: 'dataHoraResposta',
            label: 'Data Resposta',
            fixed: false
        },
        {
            id: 'dataHoraReiteracao',
            label: 'Data Reiteração',
            fixed: false
        },
        {
            id: 'documentoResposta.tipoDocumento.nome',
            label: 'Documento de Resposta',
            fixed: false
        },
        {
            id: 'documentoRemessa.tipoDocumento.nome',
            label: 'Documento de Remessa',
            fixed: false
        },
        {
            id: 'usuarioResponsavel.nome',
            label: 'Usuário Responsável',
            fixed: false
        },
        {
            id: 'usuarioResposta.nome',
            label: 'Usuário Resposta',
            fixed: false
        },
        {
            id: 'usuarioRemessa.nome',
            label: 'Usuário Remessa',
            fixed: false
        },
        {
            id: 'setorResponsavel.nome',
            label: 'Setor de Responsável',
            fixed: false
        },
        {
            id: 'processo',
            label: 'NUP',
            fixed: false
        },
        {
            id: 'documentoAvulsoOrigem.especieDocumentoAvulso.nome',
            label: 'Documento Avulso de Origem',
            fixed: false
        },
        {
            id: 'tarefaOrigem.especieTarefa.nome',
            label: 'Tarefa',
            fixed: false
        },
        {
            id: 'postIt',
            label: 'Post It',
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
            label: 'Auditoria de Distribuição',
            fixed: false
        },
        {
            id: 'tipoDistribuicao',
            label: 'Tipo de Distribuição',
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
    actions: string[] = ['edit', 'delete', 'select', 'visualizar'];

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
    selected = new EventEmitter<DocumentoAvulso>();

    @Output()
    selectedIds: number[] = [];

    @Output()
    responder = new EventEmitter<number[]>();

    @Output()
    visualizar = new EventEmitter<DocumentoAvulso>();

    dataSource: DocumentoAvulsoDataSource;

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
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _dynamicService: DynamicService,
        public _cdkConfigService: CdkConfigService,
    ) {
        this.gridFilter = {};
        this.documentosAvulsos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new DocumentoAvulsoDataSource(of(this.documentosAvulsos));
        this.paginator.length = this.total;

        if (this.documentosAvulsos) {
            this.carregaModulo();
        }
    }

    ngOnInit(): void {
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';
        this.paginator._intl.firstPageLabel = 'Primeiro';
        this.paginator._intl.lastPageLabel = 'Último';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new DocumentoAvulsoDataSource(of(this.documentosAvulsos));

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

    carregaModulo(): void {
        if (this.btContainer) {
            this.btContainer.reset([]);
        }
        const path = '@cdk/components/documento-avulso/cdk-documento-avulso-grid/cdk-documento-avulso-grid#button';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then((componentFactory) => {
                            this.btContainer.forEach((button, index) => {
                                const componentRef = button.createComponent(componentFactory);
                                componentRef.instance['documentoAvulsoId'] = this.documentosAvulsos[index]['id'];
                                componentRef.instance['mecanismoRemessa'] = this.documentosAvulsos[index]['mecanismoRemessa'];
                                componentRef.instance['apagadoEm'] = !!this.documentosAvulsos[index]['apagadoEm'];
                            });
                            this._changeDetectorRef.detectChanges();
                        });
                }));
            }
        });
    }

    toggleFilter(): void {
        this._cdkSidebarService.getSidebar('cdk-documento-avulso-filter').toggleOpen();
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

    editDocumentoAvulso(documentoAvulsoId): void {
        this.edit.emit(documentoAvulsoId);
    }

    selectDocumentoAvulso(documentoAvulso: DocumentoAvulso): void {
        this.selected.emit(documentoAvulso);
    }

    deleteDocumentoAvulso(documentoAvulsoId): void {
        this.delete.emit(documentoAvulsoId);
    }

    deleteBloco(ids): void {
        this.deleteBlocoEmmitter.emit(ids);
    }

    responderDocumentosAvulsos(documentosAvulsosId: number[]): void {
        this.responder.emit(documentosAvulsosId);
    }

    verificaStatusBarramento(documentosAvulsosId: number[]): void {
        this.statusBarramento.emit(documentosAvulsosId);
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
        const arr = Object.keys(this.documentosAvulsos).map(k => this.documentosAvulsos[k]);
        this.selectedIds = arr.map(documentoAvulso => documentoAvulso.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(documentoAvulsoId): void {
        const selectedDocumentoAvulsoIds = [...this.selectedIds];

        if (selectedDocumentoAvulsoIds.find(id => id === documentoAvulsoId) !== undefined) {
            this.selectedIds = selectedDocumentoAvulsoIds.filter(id => id !== documentoAvulsoId);
        } else {
            this.selectedIds = [...selectedDocumentoAvulsoIds, documentoAvulsoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.documentosAvulsos.length && this.selectedIds.length > 0);
    }

    setFilter(gridFilter): void {
        this.gridFilter = gridFilter;
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

    visualizarDocumentoAvulso(documentoAvulso: DocumentoAvulso): void {
        this.visualizar.emit(documentoAvulso);
    }
}
