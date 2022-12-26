import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {FavoritoService} from '@cdk/services/favorito.service';
import {select, Store} from '@ngrx/store';
import {Observable, of, Subject, switchMap} from 'rxjs';

import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {CdkTranslationLoaderService} from '@cdk/services/translation-loader.service';

import {
    Acao,
    Assinatura,
    ComponenteDigital,
    Documento,
    Etiqueta,
    Folder, Modelo,
    Pagination,
    Tarefa,
    Usuario,
    VinculacaoEtiqueta
} from '@cdk/models';
import {TarefaService} from '@cdk/services/tarefa.service';
import * as fromStore from 'app/main/apps/tarefas/store';
import * as AssinaturaStore from 'app/store';
import {ToggleMaximizado} from 'app/main/apps/tarefas/store';
import {getMercureState, getRouterState, getScreenState} from 'app/store/reducers';
import {locale as english} from 'app/main/apps/tarefas/i18n/en';
import {ResizeEvent} from 'angular-resizable-element';
import {cdkAnimations} from '@cdk/animations';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, filter, finalize, take, takeUntil} from 'rxjs/operators';
import {LoginService} from 'app/main/auth/login/login.service';
import {DynamicService} from 'modules/dynamic.service';
import {modulesConfig} from 'modules/modules-config';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarRef,
    MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import {SnackBarDesfazerComponent} from '@cdk/components/snack-bar-desfazer/snack-bar-desfazer.component';
import {CdkUtils} from '@cdk/utils';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CdkConfirmDialogComponent} from '@cdk/components/confirm-dialog/confirm-dialog.component';
import {
    CdkAssinaturaEletronicaPluginComponent
} from '@cdk/components/componente-digital/cdk-componente-digital-ckeditor/cdk-plugins/cdk-assinatura-eletronica-plugin/cdk-assinatura-eletronica-plugin.component';
import {SearchBarEtiquetasFiltro} from '@cdk/components/search-bar-etiquetas/search-bar-etiquetas-filtro';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {
    CdkUploadDialogComponent
} from '@cdk/components/documento/cdk-upload-dialog/cdk-upload-dialog.component';
import {navigationConverter} from 'app/navigation/navigation';
import * as moment from 'moment';
import {CdkTarefaListService, ViewMode} from '@cdk/components/tarefa/cdk-tarefa-list/cdk-tarefa-list.service';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {CacheGenericUserDataService} from '@cdk/services/cache.service';
import {CdkTarefaListComponent} from '../../../../@cdk/components/tarefa/cdk-tarefa-list/cdk-tarefa-list.component';
import {
    CdkVinculacaoEtiquetaAcoesDialogComponent
} from '@cdk/components/vinculacao-etiqueta/cdk-vinculacao-etiqueta-acoes-dialog/cdk-vinculacao-etiqueta-acoes-dialog.component';
import {
    CdkTarefaGroupDataInterface, CdkTarefaSortOptionsInterface
} from '@cdk/components/tarefa/cdk-tarefa-list/cdk-tarefa-sort-group.interface';
import {TableDefinitions} from '@cdk/components/table-definitions/table-definitions';
import {TableDefinitionsService} from '@cdk/components/table-definitions/table-definitions.service';
import {CdkTarefaListColumns} from '@cdk/components/tarefa/cdk-tarefa-list/cdk-tarefa-list.columns';

@Component({
    selector: 'tarefas',
    templateUrl: './tarefas.component.html',
    styleUrls: ['./tarefas.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TarefasComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('tarefaListElement', {read: ElementRef, static: false}) tarefaListElement: ElementRef;

    @ViewChild('tarefasList', {
        read: CdkTarefaListComponent,
        static: false
    }) set _tarefasList(tarefasList: CdkTarefaListComponent) {
        this.tarefasList = tarefasList;
        if (tarefasList) {
            this.tarefaListOriginalSize = this.tarefaListElement.nativeElement.offsetWidth;
        }
    }

    @ViewChild('menuTriggerList') menuTriggerList: MatMenuTrigger;
    @ViewChild('autoCompleteModelos', {
        static: false,
        read: MatAutocompleteTrigger
    }) autoCompleteModelos: MatAutocompleteTrigger;
    @ViewChild('dynamicComponent', {static: false, read: ViewContainerRef}) container: ViewContainerRef;

    tarefasList: CdkTarefaListComponent;
    confirmDialogRef: MatDialogRef<CdkConfirmDialogComponent>;

    routerState: any;
    hiddenFilters: string[] = [];
    doLimpaFiltros: Subject<boolean> = new Subject<boolean>();

    searchInput: FormControl;

    folders$: Observable<Folder[]>;

    currentTarefaId: number;

    currentTarefa: Tarefa;
    currentTarefa$: Observable<any>;

    tarefas: Tarefa[] = [];

    savingVinculacaoEtiquetaId$: Observable<number>;

    loaded: any;

    tarefaListSize = 32;
    tarefaListOriginalSize: number;

    tarefas$: Observable<Tarefa[]>;

    loading$: Observable<boolean>;
    loading: boolean;

    togglingUrgenteIds$: Observable<number[]>;
    savingObservacaoIds$: Observable<number[]>;
    editObservacaoIds$: Observable<number[]>;
    assinandoTarefasIds$: Observable<number[]>;

    deletingIds$: Observable<number[]>;
    deletedIds$: Observable<number[]>;
    undeletingTarefaIds$: Observable<number[]>;

    error$: Observable<any>;
    errorDelete$: Observable<any>;
    errorDistribuir$: Observable<any>;
    errorComponentesDigitais$: Observable<any>;

    selectedIds$: Observable<number[]>;
    selectedIds: number[] = [];
    draggingIds$: Observable<number[]>;
    savingComponentesDigitaisIds$: Observable<number[]>;

    selectedTarefas$: Observable<Tarefa[]>;
    selectedTarefas: Tarefa[] = [];

    screen$: Observable<any>;

    filter = {};

    etiquetas: Etiqueta[] = [];

    pagination$: Observable<any>;
    pagination: any;

    maximizado$: Observable<boolean>;
    maximizado = false;

    mobileMode = false;

    mostraCriar = false;

    loadingAssuntosProcessosId$: Observable<number[]>;

    loadingInteressadosProcessosId$: Observable<number[]>;

    totalInteressadosProcessosId$: Observable<any[]>;

    processoHandle$: Observable<any>;

    cienciaIds$: Observable<number[]>;

    pesquisaTarefa: string;

    changingFolderIds$: Observable<number[]>;
    trocandoPastas: boolean = false;

    generoHandle: string;
    typeHandle: string;
    targetHandle: string;

    routeAtividade = 'atividades/criar';
    routeAtividadeBloco = 'atividade-bloco';
    novaTarefa = false;

    sheetRef: MatSnackBarRef<SnackBarDesfazerComponent>;
    snackSubscription: any;
    snackSubscriptionType: string;
    lote: string;

    usuarioAtual: Usuario;

    arrayFiltrosEtiquetas: SearchBarEtiquetasFiltro[] = [];
    filtroEtiquetas: SearchBarEtiquetasFiltro;
    vinculacaoEtiquetaPagination: Pagination;

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    novaAba = false;

    formEditor: FormGroup;
    habilitarEditorSalvar = false;
    modeloPagination: Pagination;
    formEditorValid = false;

    deletingDocumentosId$: Observable<number[]>;
    assinandoDocumentosId$: Observable<number[]>;
    removendoAssinaturaDocumentosId$: Observable<number[]>;
    alterandoDocumentosId$: Observable<number[]>;
    convertendoDocumentosId$: Observable<number[]>;
    downloadP7SDocumentoIds$: Observable<number[]>;

    isSaving$: Observable<boolean>;
    isLoadingDocumentosVinculados$: Observable<boolean>;
    documentosVinculados$: Observable<Documento[]>;
    documentosVinculados: Documento[];
    selectedDocumentosVinculados$: Observable<Documento[]>;
    deletingDocumentosVinculadosId$: Observable<number[]>;
    alterandoDocumentosVinculadosId$: Observable<number[]>;
    documentosVinculadosPagination$: Observable<any>;
    documentosVinculadosPagination: any;

    loadingAcoesEtiqueta$: Observable<boolean>;
    acoesEtiquetaList$: Observable<Acao[]>;
    collapsedGroups$: Observable<string[]>;

    routeAtividadeDocumento = 'atividade';
    routeOficioDocumento = 'oficio';
    tarefaListViewMode: ViewMode;
    componentRootUrl: boolean = true;
    isSmallScreen: boolean = false;
    tableDefinitions: TableDefinitions = new TableDefinitions();
    modeloListIsLoading: boolean = false;
    modeloList: Modelo[] = [];

    modulesConfig: any;

    buscarTodas: boolean = false;

    static readonly GRID_DEFINITIONS_KEYS: string[] = ['TarefasComponent', 'CdkTarefaList'];
    static readonly LIST_DEFINITIONS_KEY: string = 'tarefaListDefinitions';

    private readonly _defaultSortField: string = 'dataHoraFinalPrazo';
    private readonly _defaultSortOrder: string = 'ASC';
    private _unsubscribeAll: Subject<any> = new Subject();
    private _profile: Usuario;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _cdkTranslationLoaderService: CdkTranslationLoaderService,
        private _tarefaService: TarefaService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _store: Store<fromStore.TarefasAppState>,
        private _loginService: LoginService,
        private _dynamicService: DynamicService,
        private _snackBar: MatSnackBar,
        private _matDialog: MatDialog,
        private _breakpointObserver: BreakpointObserver,
        private _activatedRoute: ActivatedRoute,
        private _cdkTarefaListService: CdkTarefaListService,
        private _cacheGenericUserDataService: CacheGenericUserDataService,
        protected _tableDefinitionsService: TableDefinitionsService,
        private _favoritoService: FavoritoService
    ) {
        this.modulesConfig = modulesConfig;
        // Set the defaults
        this.formEditor = this._formBuilder.group({
            modelo: [null]
        });
        this.searchInput = new FormControl('');
        this._cdkTranslationLoaderService.loadTranslations(english);
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.togglingUrgenteIds$ = this._store.pipe(select(fromStore.getIsTogglingUrgenteIds));
        this.tarefas$ = this._store.pipe(select(fromStore.getTarefas));
        this.error$ = this._store.pipe(select(fromStore.getError));
        this.errorComponentesDigitais$ = this._store.pipe(select(fromStore.getErrorsComponentesDigitais));
        this.currentTarefa$ = this._store.pipe(select(fromStore.getCurrentTarefa));
        this.errorDelete$ = this._store.pipe(select(fromStore.getErrorDelete));
        this.errorDistribuir$ = this._store.pipe(select(fromStore.getErrorDistribuir));
        this.savingObservacaoIds$ = this._store.pipe(select(fromStore.getSavingObservacaoIds));
        this.editObservacaoIds$ = this._store.pipe(select(fromStore.getEditObservacaoIds));
        this.assinandoTarefasIds$ = this._store.pipe(select(fromStore.getAssinandoTarefasId));
        this.savingVinculacaoEtiquetaId$ = this._store.pipe(select(fromStore.getSavingVinculacaoEtiquetaId));
        this.assinandoDocumentosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosAssinandoIds));
        this.removendoAssinaturaDocumentosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosRemovendoAssinaturaIds));
        this.alterandoDocumentosId$ = this._store.pipe(select(fromStore.getAlterandoDocumentosId));
        this.convertendoDocumentosId$ = this._store.pipe(select(fromStore.getConvertendoAllDocumentosId));
        this.deletingDocumentosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosId));
        this.downloadP7SDocumentoIds$ = this._store.pipe(select(fromStore.getDownloadDocumentoP7SId));
        this.savingComponentesDigitaisIds$ = this._store.pipe(select(fromStore.getSavingComponentesDigitaisIds));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSavingDocumentosVinculados));
        this.isLoadingDocumentosVinculados$ = this._store.pipe(select(fromStore.getIsLoadingDocumentosVinculados));
        this.documentosVinculados$ = this._store.pipe(select(fromStore.getDocumentosVinculados));
        this.selectedDocumentosVinculados$ = this._store.pipe(select(fromStore.getSelectedDocumentosVinculados));
        this.deletingDocumentosVinculadosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosVinculadosId));
        this.alterandoDocumentosVinculadosId$ = this._store.pipe(select(fromStore.getAlterandoDocumentosVinculadosId));
        this.documentosVinculadosPagination$ = this._store.pipe(select(fromStore.getDocumentosVinculadosPagination));
        this.processoHandle$ = this._store.pipe(select(fromStore.getProcessoHandle));
        this.loadingAcoesEtiqueta$ = this._store.pipe(select(fromStore.getLoadingAcoesEtiquetas));
        this.acoesEtiquetaList$ = this._store.pipe(select(fromStore.getAcoesEtiqueta));

        this._store.pipe(select(fromStore.getTarefasLoaded)).subscribe((loaded) => {
            this.loaded = loaded;
        });

        this.folders$ = this._store.pipe(select(fromStore.getFolders));
        this.selectedTarefas$ = this._store.pipe(select(fromStore.getSelectedTarefas));
        this.selectedIds$ = this._store.pipe(select(fromStore.getSelectedTarefaIds));
        this.draggingIds$ = this._store.pipe(select(fromStore.getDraggedTarefasIds));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.maximizado$ = this._store.pipe(select(fromStore.getMaximizado));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingTarefaIds));
        this.undeletingTarefaIds$ = this._store.pipe(select(fromStore.getUnDeletingTarefaIds));
        this.changingFolderIds$ = this._store.pipe(select(fromStore.getChangingFolderTarefaIds));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedTarefaIds));
        this.collapsedGroups$ = this._store.pipe(select(fromStore.getCollapsedGroups));
        this.screen$ = this._store.pipe(select(getScreenState));
        this._profile = _loginService.getUserProfile();

        this._breakpointObserver
            .observe([Breakpoints.Small])
            .subscribe((state: BreakpointState) => this.isSmallScreen = state.matches);

        const vinculacaoEtiquetaPagination = new Pagination();
        vinculacaoEtiquetaPagination.filter = {
            orX: [
                {
                    'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.id,
                    'modalidadeEtiqueta.valor': 'eq:TAREFA'
                },
                {
                    'vinculacoesEtiquetas.setor.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:TAREFA'
                },
                {
                    'vinculacoesEtiquetas.unidade.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:TAREFA'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    // eslint-disable-next-line max-len
                    'vinculacoesEtiquetas.modalidadeOrgaoCentral.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.modalidadeOrgaoCentral.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:TAREFA'
                },
                {
                    'sistema': 'eq:true',
                    'modalidadeEtiqueta.valor': 'eq:TAREFA'
                }
            ]
        };
        this.vinculacaoEtiquetaPagination = vinculacaoEtiquetaPagination;
        this.arrayFiltrosEtiquetas.push({
            label: 'etiquetas',
            pagination: vinculacaoEtiquetaPagination,
            queryFilter: 'vinculacoesEtiquetas.etiqueta.id'
        });
        const vinculacaoEtiquetaProcessoPagination = new Pagination();
        vinculacaoEtiquetaProcessoPagination.filter = {
            orX: [
                {
                    'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.id,
                    'modalidadeEtiqueta.valor': 'eq:PROCESSO'
                },
                {
                    'vinculacoesEtiquetas.setor.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:PROCESSO'
                },
                {
                    'vinculacoesEtiquetas.unidade.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:PROCESSO'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    // eslint-disable-next-line max-len
                    'vinculacoesEtiquetas.modalidadeOrgaoCentral.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.modalidadeOrgaoCentral.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:PROCESSO'
                },
                {
                    'sistema': 'eq:true',
                    'modalidadeEtiqueta.valor': 'eq:PROCESSO'
                }
            ]
        };
        this.arrayFiltrosEtiquetas.push({
            label: 'etiquetas do processo',
            pagination: vinculacaoEtiquetaProcessoPagination,
            queryFilter: 'processo.vinculacoesEtiquetas.etiqueta.id'
        });
        this.filtroEtiquetas = this.arrayFiltrosEtiquetas[0];

        this.loadingAssuntosProcessosId$ = this._store.pipe(select(fromStore.getIsAssuntoLoading));
        this.loadingInteressadosProcessosId$ = this._store.pipe(select(fromStore.getIsInteressadosLoading));
        this.totalInteressadosProcessosId$ = this._store.pipe(select(fromStore.getTotalInteressadosProcessosId));
        this.cienciaIds$ = this._store.pipe(select(fromStore.getCienciaTarefaIds));
        this.usuarioAtual = this._loginService.getUserProfile();
        this.formEditor.get('modelo').valueChanges.subscribe((value) => {
            this.formEditorValid = value && typeof value === 'object';
        });
        this.modeloPagination = new Pagination();
        this.modeloPagination.populate = [
            'documento',
            'documento.componentesDigitais'
        ];
        this.modeloPagination.filter = {
            orX: [
                {
                    'modalidadeModelo.valor': 'eq:EM BRANCO'
                },
                {
                    // Modelos individuais
                    'modalidadeModelo.valor': 'eq:INDIVIDUAL',
                    'vinculacoesModelos.usuario.id': 'eq:' + this._loginService.getUserProfile().id
                },
            ]
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._store.pipe(
            select(fromStore.getViewMode),
            filter(viewMode => !!viewMode)
        ).subscribe((viewMode) => {
            if (viewMode === 'grid') {
                this._tableDefinitionsService
                    .getTableDefinitions(
                        this._tableDefinitionsService
                            .generateTableDeinitionIdentifier(TarefasComponent.GRID_DEFINITIONS_KEYS)
                    )
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((definitions: TableDefinitions) => {
                        if (!definitions) {
                            const tableDefinitions = new TableDefinitions();
                            tableDefinitions.version = CdkTarefaListColumns.version;
                            this.tableDefinitions = tableDefinitions;
                        } else {
                            this.tableDefinitions = definitions;
                        }
                        this._changeDetectorRef.markForCheck();
                    });
            } else {
                this._cacheGenericUserDataService.get(TarefasComponent.LIST_DEFINITIONS_KEY)
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((genericListDefinitions) => {
                        const scopeKey = TarefasComponent.generateScopeKey([this.generoHandle]);
                        if (genericListDefinitions && genericListDefinitions[scopeKey] && genericListDefinitions[scopeKey]['tableDefinitions']) {
                            this.tableDefinitions = genericListDefinitions[scopeKey]['tableDefinitions'];
                        } else {
                            const tableDefinitions = new TableDefinitions();
                            tableDefinitions.version = CdkTarefaListColumns.version;
                            this.tableDefinitions = tableDefinitions;
                        }
                        this._changeDetectorRef.markForCheck();
                    });
            }
            this._cdkTarefaListService.viewMode = this.tarefaListViewMode = <ViewMode>viewMode;
            this._changeDetectorRef.markForCheck();
        });

        this.novaTarefa = false;

        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            //caso estiver snack aberto esperando alguma confirmacao se sair da url faz o flush
            if (this.snackSubscription && this.routerState?.url.indexOf('operacoes-bloco') === -1) {
                this.sheetRef.dismiss();
            }

            this.routerState = routerState.state;
            this.generoHandle = routerState.state.params['generoHandle'];
            this.targetHandle = routerState.state.params['targetHandle'];
            this.typeHandle = routerState.state.params['typeHandle'];
            if (this.routerState.queryParams['novaAba']) {
                this.novaAba = true;
                this._store.dispatch(new fromStore.ToggleMaximizado(true));
            }

            const path = 'app/main/apps/tarefas';
            this.routeAtividade = 'atividades/criar';
            this.routeAtividadeBloco = 'atividade-bloco';
            this.routeAtividadeDocumento = 'atividade';
            this.routeOficioDocumento = 'oficio';
            this.modulesConfig.forEach((module) => {
                if (module.routerLinks.hasOwnProperty(path) &&
                    module.routerLinks[path].hasOwnProperty('atividades') &&
                    module.routerLinks[path]['atividades'].hasOwnProperty(this.routerState.params.generoHandle) &&
                    (module.name === this.routerState.params.generoHandle)) {
                    this.routeAtividade = module.routerLinks[path]['atividades'][this.routerState.params.generoHandle];
                }

                if (module.routerLinks.hasOwnProperty(path) &&
                    module.routerLinks[path].hasOwnProperty('atividade-bloco') &&
                    module.routerLinks[path]['atividade-bloco'].hasOwnProperty(this.routerState.params.generoHandle) &&
                    (module.name === this.routerState.params.generoHandle)) {
                    this.routeAtividadeBloco = module.routerLinks[path]['atividade-bloco'][this.routerState.params.generoHandle];
                }
            });
            const pathDocumento = 'app/main/apps/documento/documento-edit';
            this.modulesConfig.forEach((module) => {
                if (module.routerLinks.hasOwnProperty(pathDocumento) &&
                    module.routerLinks[pathDocumento].hasOwnProperty('atividade') &&
                    module.routerLinks[pathDocumento]['atividade'].hasOwnProperty(this.routerState.params.generoHandle) &&
                    (module.name === this.routerState.params.generoHandle)) {
                    this.routeAtividadeDocumento = module.routerLinks[pathDocumento]['atividade'][this.routerState.params.generoHandle];
                }
                if (module.routerLinks.hasOwnProperty(pathDocumento) &&
                    module.routerLinks[pathDocumento].hasOwnProperty('oficio') &&
                    module.routerLinks[pathDocumento]['oficio'].hasOwnProperty(this.routerState.params.generoHandle) &&
                    (module.name === this.routerState.params.generoHandle)) {
                    this.routeOficioDocumento = module.routerLinks[pathDocumento]['oficio'][this.routerState.params.generoHandle];
                }
            });

            if (this.typeHandle !== 'minhas-tarefas') {
                this.hiddenFilters = ['tipoBusca'];
            } else {
                this.hiddenFilters = [];
            }

            const componentRootUrl = '/apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
                + this.routerState.params.targetHandle;

            this.componentRootUrl = this.routerState?.url === componentRootUrl;
        });

        this._store.pipe(
            select(fromStore.getCurrentTarefaId),
            takeUntil(this._unsubscribeAll)
        ).subscribe((currentTarefaId) => {
            this.currentTarefaId = currentTarefaId?.tarefaId ?? null;
        });

        this._store.pipe(
            select(getMercureState),
            takeUntil(this._unsubscribeAll)
        ).subscribe((message) => {
            if (message && message.type === 'nova_tarefa') {
                if (CdkUtils.ajusteString(message.content.genero) === this.routerState.params.generoHandle) {
                    this.novaTarefa = true;
                }
            }
        });

        this.tarefas$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(tarefas => !!tarefas)
        ).subscribe((tarefas) => {
            this.tarefas = tarefas;
        });

        this.currentTarefa$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((currentTarefa: any) => {
            if (currentTarefa && currentTarefa.processo) {
                if (!this.currentTarefa || (this.currentTarefa && !this.currentTarefaId) || (this.currentTarefa.id !== currentTarefa.id)) {
                    if (this.container !== undefined) {
                        this.container.clear();
                    }
                    const path = 'app/main/apps/tarefas';
                    this.modulesConfig.forEach((module) => {
                        if (module.components.hasOwnProperty(path)) {
                            module.components[path].forEach(((c) => {
                                this._dynamicService.loadComponent(c)
                                    .then((componentFactory) => {
                                        this.container.createComponent(componentFactory);
                                        this._changeDetectorRef.detectChanges();
                                    });
                            }));
                        }
                    });
                    this._store.dispatch(new fromStore.SyncCurrentTarefaId({
                        tarefaId: currentTarefa.id,
                        processoId: currentTarefa.processo.id,
                        acessoNegado: currentTarefa.processo.acessoNegado
                    }));
                }
            } else {
                this._store.dispatch(new fromStore.SyncCurrentTarefaId({}));
            }
            this.currentTarefa = currentTarefa;
        });

        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            this.pagination = pagination;
        });

        this.maximizado$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(value => value !== this.maximizado)
        ).subscribe((maximizado) => {
            this.maximizado = maximizado;
        });

        this.selectedTarefas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((selectedTarefas) => {
            this.selectedTarefas = selectedTarefas;
        });

        this.selectedIds$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((selectedIds) => {
            this.selectedIds = selectedIds;
            this._changeDetectorRef.markForCheck();
        });

        this.loading$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((loading) => {
            this.loading = loading;
        });

        this.screen$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((screen) => {
            if (screen.size !== 'desktop') {
                if (this.tarefaListViewMode == 'grid') {
                    this.doTarefaListViewModeChange('list');
                }
                this.mobileMode = true;
                if (this.maximizado && !this.novaAba) {
                    this._store.dispatch(new ToggleMaximizado(false));
                }
            } else {
                this.mobileMode = false;
            }
        });

        this.error$.pipe(
            filter(errors => !!errors),
            takeUntil(this._unsubscribeAll)
        ).subscribe((errors) => {
            const error = 'Erro! ' + (errors?.error?.message || errors?.statusText);
            this._snackBar.open(error, null, {
                duration: 5000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                panelClass: ['danger-snackbar']
            });
            this._store.dispatch(new fromStore.ClearError());
        });

        this._store.pipe(
            select(fromStore.getIsTrocandoPastas),
            takeUntil(this._unsubscribeAll)
        ).subscribe((trocandoPastas) => {
            this.trocandoPastas = trocandoPastas;
        });

        this.changingFolderIds$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((tarefasIds) => {
            if (this.trocandoPastas && tarefasIds.length === 0) {
                // Acabou de trocar as pastas das tarefas selecionadas
                this._store.dispatch(new fromStore.SetFolderOnSelectedTarefasFinish());
            }
        });

        this.errorComponentesDigitais$.pipe(
            filter(errors => !!errors),
            takeUntil(this._unsubscribeAll)
        ).subscribe((errors) => {
            const error = 'Erro! ' + (errors?.error?.message || errors?.statusText);
            this._snackBar.open(error, null, {
                duration: 5000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                panelClass: ['danger-snackbar']
            });
        });

        this.documentosVinculadosPagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(pagination => this.documentosVinculadosPagination = pagination);

        this.documentosVinculados$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(documentosVinculados => this.documentosVinculados = documentosVinculados);

        this.pesquisaTarefa = 'tarefa';
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/tarefas';
        this.routeAtividade = 'atividades/criar';
        this.routeAtividadeBloco = 'atividade-bloco';
        this.routeAtividadeDocumento = 'atividade';
        this.routeOficioDocumento = 'oficio';

        modulesConfig.forEach((module) => {
            if (module.routerLinks.hasOwnProperty(path) &&
                module.routerLinks[path].hasOwnProperty('atividades') &&
                module.routerLinks[path]['atividades'].hasOwnProperty(this.routerState.params.generoHandle) &&
                (module.name === this.routerState.params.generoHandle)) {
                this.routeAtividade = module.routerLinks[path]['atividades'][this.routerState.params.generoHandle];
            }

            if (module.routerLinks.hasOwnProperty(path) &&
                module.routerLinks[path].hasOwnProperty('atividade-bloco') &&
                module.routerLinks[path]['atividade-bloco'].hasOwnProperty(this.routerState.params.generoHandle) &&
                (module.name === this.routerState.params.generoHandle)) {
                this.routeAtividadeBloco = module.routerLinks[path]['atividade-bloco'][this.routerState.params.generoHandle];
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // this._changeDetectorRef.detach();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.UnloadTarefas({reset: true}));
    }

    static generateScopeKey(keys: string[]): string {
        return keys.join('.');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    limpaFiltros(): void {
        this.buscarTodas = false;
    }

    reload(params): void {
        this.novaTarefa = false;
        const nparams = {
            ...this.pagination,
            listFilter: params.listFilter,
            sort: params.listSort && Object.keys(params.listSort).length ? params.listSort : this.pagination.sort,
            limit: params.limit || 10,
            offset: ((params.offset !== undefined && params.offset !== null) ? params.offset : 0),
            viewMode: this.tarefaListViewMode
        };

        this._store.dispatch(new fromStore.UnloadTarefas({reset: false}));

        let generoParam = this.routerState.params['generoHandle'];
        this.buscarTodas = false;
        delete nparams['folderFilter'];
        if (this.typeHandle === 'minhas-tarefas' && params.tipoBusca === 'todas') {
            this.buscarTodas = true;
            nparams.filter = {
                'usuarioResponsavel.id': 'eq:' + this._profile.id,
                'especieTarefa.generoTarefa.nome': `eq:${generoParam.toUpperCase()}`,
                'dataHoraConclusaoPrazo': 'isNull' //<- não traz as concluídas
            };
            nparams.context = {
                modulo: generoParam,
                mostrarApagadas: true
            };
        } else if (this.typeHandle === 'minhas-tarefas') {
            nparams.filter = {
                'usuarioResponsavel.id': 'eq:' + this._profile.id,
                'dataHoraConclusaoPrazo': 'isNull'
            };
            let folderFilter = 'isNull';
            let paramUrl = '';
            if (navigationConverter.hasOwnProperty(this.routerState.params['generoHandle'])) {
                generoParam = navigationConverter[this.routerState.params['generoHandle']];
            }
            const routeTargetParam = of('targetHandle');
            routeTargetParam.subscribe((targetParam) => {
                if (
                    this.routerState.params[targetParam] !== 'entrada' &&
                    this.routerState.params[targetParam] !== 'lixeira'
                ) {
                    const folderId = this.routerState.params[targetParam];
                    folderFilter = `eq:${folderId}`;
                }

                paramUrl = this.routerState.params[targetParam];
                if (this.routerState.params[targetParam] === 'lixeira') {
                    nparams.filter = {
                        'usuarioResponsavel.id': 'eq:' + this._profile.id,
                        'apagadoEm': 'gt:' + moment().subtract(10, 'days').format('YYYY-MM-DDTHH:mm:ss')
                    };
                }

            });

            if (paramUrl !== 'lixeira') {
                nparams['folderFilter'] = {
                    'folder.id': folderFilter
                };
                nparams.context = {modulo: generoParam};
            } else {
                nparams.context = {
                    modulo: generoParam,
                    mostrarApagadas: true
                };
            }
        }

        nparams['filter'] = {
            ...nparams['filter'],
            'especieTarefa.generoTarefa.nome': `eq:${generoParam?.toUpperCase()}`
        };

        this._store.dispatch(new fromStore.GetTarefas(nparams));
    }

    addEtiqueta(etiqueta: Etiqueta): void {
        this.etiquetas.push(etiqueta);
        this.proccessEtiquetaFilter();
    }

    deleteEtiqueta(etiqueta: Etiqueta): void {
        this.etiquetas = this.etiquetas.filter(e => e.id !== etiqueta.id);
        this.proccessEtiquetaFilter();
    }

    changeEtiquetaFilter(filtro: SearchBarEtiquetasFiltro): void {
        this.etiquetas = [];
        this.filtroEtiquetas = filtro;
        this.proccessEtiquetaFilter();
    }

    proccessEtiquetaFilter(): any {
        this._store.dispatch(new fromStore.UnloadTarefas({reset: false}));
        const andXFilter = [];
        this.etiquetas.forEach((e) => {
            const objFiltro = {};
            objFiltro[this.filtroEtiquetas.queryFilter] = `eq:${e.id}`;
            andXFilter.push(objFiltro);
        });
        let etiquetaFilter = {};
        if (andXFilter.length) {
            etiquetaFilter = {
                'andX': andXFilter
            };
        }
        const nparams = {
            ...this.pagination,
            etiquetaFilter: etiquetaFilter
        };
        this._store.dispatch(new fromStore.GetTarefas(nparams));
    }

    onScroll(): void {
        if (this.tarefas.length >= this.pagination.total) {
            return;
        }

        if (this.loading) {
            return;
        }

        const nparams = {
            ...this.pagination,
            offset: this.pagination.offset + this.pagination.limit,
            viewMode: this.tarefaListViewMode
        };

        this._store.dispatch(new fromStore.GetTarefas(nparams));
    }

    setCurrentTarefa(event: { tarefa: Tarefa; event: any }): void {
        const tarefa = event.tarefa;
        if (!tarefa.apagadoEm) {
            if (!tarefa.dataHoraLeitura) {
                this._store.dispatch(new fromStore.ToggleLidaTarefa(tarefa));
            }
            if (event.event.ctrlKey) {
                const extras = {
                    queryParams: {
                        novaAba: true
                    }
                };
                const url = this._router.createUrlTree([
                    'apps/tarefas/' + this.routerState.params.generoHandle + '/' +
                    this.routerState.params.typeHandle + '/' +
                    this.routerState.params.targetHandle + '/tarefa/' + tarefa.id +
                    '/processo/' + tarefa.processo.id + '/visualizar'
                ], extras);
                window.open(url.toString(), '_blank');
            } else {
                this._store.dispatch(new fromStore.SetCurrentTarefa({
                    tarefaId: tarefa.id,
                    processoId: tarefa.processo.id,
                    acessoNegado: tarefa.processo.acessoNegado
                }));
            }
        }
    }

    deleteTarefa(tarefa: Tarefa, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteTarefa({
            tarefaId: tarefa.id,
            operacaoId: operacaoId,
            loteId: loteId,
            redo: [
                new fromStore.DeleteTarefa({
                    tarefaId: tarefa.id,
                    operacaoId: operacaoId,
                    loteId: loteId,
                    redo: 'inherent',
                    undo: 'inherent'
                    // redo e undo são herdados da ação original
                }),
                new fromStore.DeleteTarefaFlush()
            ],
            undo: new fromStore.UndeleteTarefa({
                tarefa: tarefa,
                operacaoId: operacaoId,
                loaded: this.loaded,
                redo: null,
                undo: null
            })
        }));

        if (this.snackSubscription) {
            if (this.snackSubscriptionType === 'delete') {
                // temos um snack de exclusão aberto, temos que ignorar
                this.snackSubscription.unsubscribe();
                this.sheetRef.dismiss();
                this.snackSubscriptionType = null;
                this.snackSubscription = null;
            } else {
                // Temos um snack de outro tipo aberto, temos que confirmá-lo
                this.sheetRef.dismiss();
            }
        }

        this.sheetRef = this._snackBar.openFromComponent(SnackBarDesfazerComponent, {
            duration: 3000,
            panelClass: ['cdk-white-bg'],
            data: {
                icon: 'delete',
                text: 'Deletada(s)'
            }
        });

        this.snackSubscriptionType = 'delete';
        this.snackSubscription = this.sheetRef.afterDismissed().subscribe((data) => {
            if (data.dismissedByAction === true) {
                this._store.dispatch(new fromStore.DeleteTarefaCancel());
            } else {
                this._store.dispatch(new fromStore.DeleteTarefaFlush());
            }
            this.snackSubscription.unsubscribe();
            this.snackSubscriptionType = null;
            this.snackSubscription = null;
        });
    }

    deleteBlocoTarefa(tarefas: Tarefa[]): void {
        this.lote = CdkUtils.makeId();
        tarefas.forEach((tarefa: Tarefa) => this.deleteTarefa(tarefa, this.lote));
    }

    cienciaBlocoTarefa(tarefas: Tarefa[]): void {
        this.lote = CdkUtils.makeId();
        tarefas.forEach((tarefa: Tarefa) => this.doCienciaTarefa(tarefa.id, this.lote));
    }

    doRestauraTarefa(tarefa: Tarefa, folder: Folder = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.UndeleteTarefa({
            tarefa: tarefa,
            folder: folder,
            operacaoId: operacaoId,
            loaded: this.loaded,
            redo: null,
            undo: null
        }));
    }

    doToggleUrgente(tarefa: Tarefa): void {
        this._store.dispatch(new fromStore.ToggleUrgenteTarefa(tarefa));
    }

    /**
     * Refresh
     */
    refresh(): void {
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._cdkSidebarService.getSidebar(name).toggleOpen();
    }

    changeSelectedIds(ids: number[]): void {
        this._store.dispatch(new fromStore.ChangeSelectedTarefas(ids));
        if (!ids || (ids.length === 0)) {
            this._router.navigate([
                'apps',
                'tarefas',
                this.routerState.params.generoHandle,
                this.routerState.params.typeHandle,
                this.routerState.params.targetHandle
            ]).then();
        }
    }

    changeDraggedIds(ids: number[]): void {
        this._store.dispatch(new fromStore.ChangeDraggedTarefas(ids));
    }

    setFolderOnSelectedTarefas(folder): void {
        const loteId = CdkUtils.makeId();
        if (this.targetHandle !== 'lixeira') {
            // Informa do inicio da mudança de pastas das tarefas selecionadas
            this._store.dispatch(new fromStore.SetFolderOnSelectedTarefasStart(this.selectedTarefas.map(tarefa => tarefa.id)));
        }
        this.selectedTarefas.forEach((tarefa) => {
            const operacaoId = CdkUtils.makeId();
            if (this.targetHandle === 'lixeira') {
                this.doRestauraTarefa(tarefa, folder);
                return;
            }

            this._store.dispatch(new fromStore.SetFolderOnSelectedTarefas({
                tarefa: tarefa,
                folder: folder,
                operacaoId: operacaoId,
                loteId: loteId
            }));
        });
    }

    onResizeEndTarefaList(event: ResizeEvent): void {
        const potencialTarefaListSize = (event.rectangle.width * this.tarefaListSize) / this.tarefaListOriginalSize;

        if (potencialTarefaListSize < 30) {
            this.tarefaListSize = 30;
            setTimeout(() => {
                if (this.tarefaListElement) {
                    this.tarefaListOriginalSize = this.tarefaListElement.nativeElement.offsetWidth;
                }
            }, 500);
            return;
        }

        if (potencialTarefaListSize > 50) {
            this.tarefaListSize = 50;
            this.tarefaListOriginalSize = this.tarefaListElement.nativeElement.offsetWidth;
            setTimeout(() => {
                this.tarefaListOriginalSize = this.tarefaListElement.nativeElement.offsetWidth;
            }, 500);
            return;
        }

        this.tarefaListSize = (event.rectangle.width * this.tarefaListSize) / this.tarefaListOriginalSize;
        this.tarefaListOriginalSize = event.rectangle.width;
    }

    doCreateDocumentoAvulso(tarefaId): void {
        // eslint-disable-next-line max-len
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/tarefa/' + tarefaId + '/oficio']).then();
    }

    doCreateTarefa(params): void {
        // eslint-disable-next-line max-len
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/criar/' + params.processoId]).then();
    }

    doMovimentar(tarefa: Tarefa): void {
        // eslint-disable-next-line max-len
        this._store.dispatch(new fromStore.SetCurrentTarefa({
            tarefaId: tarefa.id,
            processoId: tarefa.processo.id,
            acessoNegado: tarefa.processo.acessoNegado,
            static: true
        }));
        this._router.navigate([
            'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
            + this.routerState.params.targetHandle + '/tarefa/' + tarefa.id + '/' + this.routeAtividade
        ]).then();
    }

    doEditTarefa(tarefa: Tarefa): void {
        // eslint-disable-next-line max-len
        this._store.dispatch(new fromStore.SetCurrentTarefa({
            tarefaId: tarefa.id,
            processoId: tarefa.processo.id,
            acessoNegado: tarefa.processo.acessoNegado,
            static: true
        }));
        this._router.navigate([
            'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle
            + '/' + this.routerState.params.targetHandle + '/tarefa/' + tarefa.id + '/editar'
        ]).then();
    }

    doEditProcesso(params): void {
        // eslint-disable-next-line max-len
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/tarefa/' + params.id + '/processo/' + params.processo.id + '/editar/dados-basicos']).then();
    }

    doVisualizarProcesso(params): void {
        // eslint-disable-next-line max-len
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/tarefa/' + params.id + '/processo/' + params.processo.id + '/visualizar/latest']).then();
    }

    doRedistribuirTarefa(tarefa: Tarefa): void {
        // eslint-disable-next-line max-len
        this._store.dispatch(new fromStore.SetCurrentTarefa({
            tarefaId: tarefa.id,
            processoId: tarefa.processo.id,
            acessoNegado: tarefa.processo.acessoNegado,
            static: true
        }));
        this._router.navigate([
            'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
            + this.routerState.params.targetHandle + '/tarefa/' + tarefa.id + '/redistribuicao'
        ]).then();
    }

    doCienciaTarefa(tarefaId, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        const tarefa = new Tarefa();
        tarefa.id = tarefaId;
        this._store.dispatch(new fromStore.DarCienciaTarefa({
            tarefa: tarefa,
            operacaoId: operacaoId,
            loteId: loteId,
            redo: [
                new fromStore.DarCienciaTarefa({
                    tarefa: tarefa,
                    operacaoId: operacaoId,
                    loteId: loteId,
                    redo: 'inherent'
                    // redo e undo são herdados da ação original
                }),
                new fromStore.DarCienciaTarefaFlush()
            ],
            undo: null
        }));

        if (this.snackSubscription) {
            if (this.snackSubscriptionType === 'ciencia') {
                // temos um snack de ciência aberto, temos que ignorar
                this.snackSubscription.unsubscribe();
                this.sheetRef.dismiss();
                this.snackSubscriptionType = null;
                this.snackSubscription = null;
            } else {
                // Temos um snack de outro tipo aberto, temos que confirmá-lo
                this.sheetRef.dismiss();
            }
        }

        this.sheetRef = this._snackBar.openFromComponent(SnackBarDesfazerComponent, {
            duration: 3000,
            panelClass: ['cdk-white-bg'],
            data: {
                icon: 'check',
                text: 'Ciência'
            }
        });

        this.snackSubscriptionType = 'ciencia';
        this.snackSubscription = this.sheetRef.afterDismissed().subscribe((data) => {
            if (data.dismissedByAction === true) {
                this._store.dispatch(new fromStore.DarCienciaTarefaCancel());
            } else {
                this._store.dispatch(new fromStore.DarCienciaTarefaFlush());
            }
            this.snackSubscription.unsubscribe();
            this.snackSubscriptionType = null;
            this.snackSubscription = null;
        });
    }

    doRemoveTarefa(tarefa: Tarefa): void {
        this._store.dispatch(new fromStore.RemoveTarefa(tarefa));
    }

    doCompartilhar(tarefaId): void {
        // eslint-disable-next-line max-len
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/tarefa/' + tarefaId + '/compartilhamentos/criar']).then();
    }

    doCompartilharBloco(): void {
        // eslint-disable-next-line max-len
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/compartilhamento-bloco']).then();
    }

    doEtiquetarBloco(): void {
        // eslint-disable-next-line max-len
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/vinculacao-etiqueta-bloco']).then();
    }

    doOficios(tarefa: Tarefa): void {
        // eslint-disable-next-line max-len
        this._store.dispatch(new fromStore.SetCurrentTarefa({
            tarefaId: tarefa.id,
            processoId: tarefa.processo.id,
            acessoNegado: tarefa.processo.acessoNegado,
            static: true
        }));
        this._router.navigate([
            'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
            + this.routerState.params.targetHandle + '/tarefa/' + tarefa.id + '/oficios'
        ]).then();
    }

    doMinutas(): void {
        this._router.navigate([
            'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
            + this.routerState.params.targetHandle + '/tarefa/' + this.currentTarefa.id + '/minutas'
        ]).then();
    }

    doMinutasBloco(): void {
        this._router.navigate([
            'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
            + this.routerState.params.targetHandle + '/minutas'
        ]).then();
    }

    doMovimentarBloco(): void {
        // tslint:disable-next-line:max-line-length
        // eslint-disable-next-line max-len
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/' + this.routeAtividadeBloco]).then();
    }

    doEditTarefaBloco(): void {
        // eslint-disable-next-line max-len
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/tarefa-editar-bloco']).then();
    }

    doRedistribuiTarefaBloco(): void {
        // eslint-disable-next-line max-len
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/redistribuicao-edit-bloco']).then();
    }

    doCreateTarefaBloco(): void {
        // eslint-disable-next-line max-len
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/tarefa-bloco']).then();
    }

    doUpload(): void {
        if (this.tarefaListViewMode == 'list') {
            const selectedTarefa = this.tarefasList.tarefaListItems.find(tarefaListItem => tarefaListItem.tarefa.id === this.currentTarefaId);
            if (selectedTarefa) {
                selectedTarefa.upload();
            }
        } else {
            const selectedTarefa = this.tarefasList.componenteDigitalListItems.find(componenteDigitalListItem => componenteDigitalListItem.tarefaOrigem.id === this.currentTarefaId);
            if (selectedTarefa) {
                selectedTarefa.upload();
            }
        }
    }

    doEditorBloco(): void {
        // eslint-disable-next-line max-len
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/modelo-bloco/modelo']).then();
    }

    doUploadBloco(): void {
        // eslint-disable-next-line max-len
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/upload-bloco']).then();
    }

    doCreateDocumentoAvulsoBloco(): void {
        // eslint-disable-next-line max-len
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/documento-avulso-bloco']).then();
    }

    doAssinaturaMinutas(): void {
        const dialogRef = this._matDialog.open(CdkAssinaturaEletronicaPluginComponent, {
            width: '600px'
        });

        const assinaSub = dialogRef.afterClosed().pipe(filter(result => !!result), take(1)).subscribe((result) => {
            if (result.certificadoDigital) {
                const ids = this.currentTarefa.vinculacoesEtiquetas.filter(vinculacao => !!vinculacao.objectId).map(vinculacao => vinculacao.objectId);
                this._store.dispatch(new AssinaturaStore.AssinaDocumento(ids));
                assinaSub.unsubscribe();
            } else {
                this.currentTarefa.vinculacoesEtiquetas.filter(vinculacao => !!vinculacao.objectId).forEach((vinculacao) => {
                    vinculacao.objectContext['componentesDigitaisId']?.forEach((componenteDigitalId) => {
                        const documento = new Documento();
                        documento.id = vinculacao.objectId;
                        const assinatura = new Assinatura();
                        const componenteDigital = new ComponenteDigital();
                        componenteDigital.id = componenteDigitalId;
                        assinatura.componenteDigital = componenteDigital;
                        assinatura.algoritmoHash = 'A1';
                        assinatura.cadeiaCertificadoPEM = 'A1';
                        assinatura.cadeiaCertificadoPkiPath = 'A1';
                        assinatura.assinatura = 'A1';
                        assinatura.plainPassword = result.plainPassword;
                        const operacaoId = CdkUtils.makeId();
                        this._store.dispatch(new AssinaturaStore.AssinaDocumentoEletronicamente({
                            assinatura: assinatura,
                            documento: documento,
                            operacaoId: operacaoId
                        }));
                    });
                    vinculacao.objectContext['componentesDigitaisVinculadosId']?.forEach((componenteDigitalId) => {
                        const documento = new Documento();
                        documento.id = vinculacao.objectId;
                        const assinatura = new Assinatura();
                        const componenteDigital = new ComponenteDigital();
                        componenteDigital.id = componenteDigitalId;
                        assinatura.componenteDigital = componenteDigital;
                        assinatura.algoritmoHash = 'A1';
                        assinatura.cadeiaCertificadoPEM = 'A1';
                        assinatura.cadeiaCertificadoPkiPath = 'A1';
                        assinatura.assinatura = 'A1';
                        assinatura.plainPassword = result.plainPassword;
                        const operacaoId = CdkUtils.makeId();
                        this._store.dispatch(new AssinaturaStore.AssinaDocumentoEletronicamente({
                            assinatura: assinatura,
                            documento: documento,
                            operacaoId: operacaoId
                        }));
                    });
                });
                assinaSub.unsubscribe();
            }
        });
    }

    doAssinaturaTarefas(): void {
        const dialogRef = this._matDialog.open(CdkAssinaturaEletronicaPluginComponent, {
            width: '600px'
        });

        const assinaSub = dialogRef.afterClosed().pipe(filter(result => !!result), take(1)).subscribe((result) => {
            if (result.certificadoDigital) {
                const ids = this.selectedTarefas.map(tarefa => tarefa.vinculacoesEtiquetas).flat()
                    .filter(vinculacao => !!vinculacao.objectId).map(vinculacao => vinculacao.objectId);
                this._store.dispatch(new AssinaturaStore.AssinaDocumento(ids));
                assinaSub.unsubscribe();
            } else {
                this.selectedTarefas.map(tarefa => tarefa.vinculacoesEtiquetas).flat()
                    .filter(vinculacao => !!vinculacao.objectId).forEach((vinculacao) => {
                    vinculacao.objectContext['componentesDigitaisId']?.forEach((componenteDigitalId) => {
                        const documento = new Documento();
                        documento.id = vinculacao.objectId;
                        const assinatura = new Assinatura();
                        const componenteDigital = new ComponenteDigital();
                        componenteDigital.id = componenteDigitalId;
                        assinatura.componenteDigital = componenteDigital;
                        assinatura.algoritmoHash = 'A1';
                        assinatura.cadeiaCertificadoPEM = 'A1';
                        assinatura.cadeiaCertificadoPkiPath = 'A1';
                        assinatura.assinatura = 'A1';
                        assinatura.plainPassword = result.plainPassword;
                        const operacaoId = CdkUtils.makeId();
                        this._store.dispatch(new AssinaturaStore.AssinaDocumentoEletronicamente({
                            assinatura: assinatura,
                            documento: documento,
                            operacaoId: operacaoId
                        }));
                    });
                    vinculacao.objectContext['componentesDigitaisVinculadosId']?.forEach((componenteDigitalId) => {
                        const documento = new Documento();
                        documento.id = vinculacao.objectId;
                        const assinatura = new Assinatura();
                        const componenteDigital = new ComponenteDigital();
                        componenteDigital.id = componenteDigitalId;
                        assinatura.componenteDigital = componenteDigital;
                        assinatura.algoritmoHash = 'A1';
                        assinatura.cadeiaCertificadoPEM = 'A1';
                        assinatura.cadeiaCertificadoPkiPath = 'A1';
                        assinatura.assinatura = 'A1';
                        assinatura.plainPassword = result.plainPassword;
                        const operacaoId = CdkUtils.makeId();
                        this._store.dispatch(new AssinaturaStore.AssinaDocumentoEletronicamente({
                            assinatura: assinatura,
                            documento: documento,
                            operacaoId: operacaoId
                        }));
                    });
                });
                assinaSub.unsubscribe();
            }
        });
    }

    /*
    * Função que carrega os interessados do processo associado à tarefa
    * @tarefa
    * Recebe a referencia do processo carregada no componente de lista de tarefas
    */
    doLoadInteressados(processoId: number): void {

        const processo = {
            'processo.id': 'eq:' + processoId
        };

        const params = {
            filter: processo,
            sort: {},
            limit: 2,
            offset: 0,
            populate: ['pessoa']
        };

        this._store.dispatch(new fromStore.GetInteressadosProcessoTarefa({processoId: processoId, params: params}));

    }

    /*
    * Função que carrega os assuntos do processo associado à tarefa
    * @tarefa
    * Recebe a referencia do processo carregado no componente de lista de tarefas
    */
    doLoadAssuntos(processoId: number): void {

        const processo = {
            'processo.id': 'eq:' + processoId,
            'principal': 'eq:true'
        };

        const params = {
            filter: processo,
            sort: {},
            limit: 1,
            offset: 0,
            populate: ['assuntoAdministrativo']
        };

        this._store.dispatch(new fromStore.GetAssuntosProcessoTarefa({processoId: processoId, params: params}));

    }

    criarRelatorio(): void {
        this._store.dispatch(new fromStore.CreateTarefa());
        this.mostraCriar = true;
    }

    retornar(): void {
        this.mostraCriar = false;
        const url = 'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
            + this.routerState.params.targetHandle;

        this._router.navigate([url], {state: {viewMode: this.tarefaListViewMode}}).then();
    }

    doSalvarObservacao(params: any): void {
        this._store.dispatch(new fromStore.SaveObservacao(params));
    }

    doGerarRelatorioTarefaExcel(): void {
        this.confirmDialogRef = this._matDialog.open(CdkConfirmDialogComponent, {
            data: {
                title: 'Confirmação',
                confirmLabel: 'Sim',
                cancelLabel: 'Não',
                message: 'Deseja gerar um relatório com a listagem completa de tarefas? Você receberá uma notificação quando o relatório estiver disponível.'
            },
            disableClose: false
        });

        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this._store.dispatch(new fromStore.GerarRelatorioTarefaExcel(
                    {idTarefasSelecionadas: this.selectedIds?.length === this.pagination?.total ? [] : this.selectedIds})
                );
            }
            this.confirmDialogRef = null;
        });
    }

    doEditarDocumentoEtiqueta(event): void {
        const tarefa = event.tarefa;
        const vinculacaoEtiquetaClicada = event.vinculacaoEtiqueta;
        if (!tarefa.apagadoEm && vinculacaoEtiquetaClicada.objectClass === 'SuppCore\\AdministrativoBackend\\Entity\\Documento') {
            this.abreEditor(vinculacaoEtiquetaClicada.objectId, tarefa, event.event.ctrlKey);
        }
    }

    doEditarObservacao(tarefaId: number): void {
        this._store.dispatch(new fromStore.EditarObservacao(tarefaId));
    }

    doAbrirMinutaEmOutraAba(event): void {
        const tarefa = event.tarefa;
        const vinculacaoEtiquetaClicada = event.vinculacaoEtiqueta;
        if (!tarefa.apagadoEm && vinculacaoEtiquetaClicada.objectClass === 'SuppCore\\AdministrativoBackend\\Entity\\Documento') {
            this.abreEditorOutraAba(vinculacaoEtiquetaClicada.objectId, tarefa);
        }
    }

    doCreateEtiqueta(params: { tarefa: Tarefa; etiqueta: Etiqueta }): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveEtiqueta({
            etiqueta: params.etiqueta,
            tarefa: params.tarefa,
            operacaoId: operacaoId
        }));
    }

    doVinculacaoEtiquetaCreate(params): void {
        this._store.dispatch(new fromStore.CreateVinculacaoEtiqueta(params));
    }

    doVinculacaoEtiquetaDelete(params): void {
        this._store.dispatch(new fromStore.DeleteVinculacaoEtiqueta(params));
    }

    doVinculacaoEtiquetaEdit(params): void {
        this._store.dispatch(new fromStore.SaveConteudoVinculacaoEtiqueta(params));
    }

    onComplete(uploaded: { tarefaId: number; documento: Documento }): void {
        // this._store.dispatch(new fromStore.GetEtiquetaMinuta(uploaded));
    }

    onCompleteAll(tarefaId: number): void {
        this._store.dispatch(new fromStore.UploadConcluido(tarefaId));
        this._store.dispatch(new fromStore.GetEtiquetasTarefas(tarefaId));
    }

    checkModelo(): void {
        const value = this.formEditor.get('modelo').value;
        if (!value || typeof value !== 'object') {
            this.habilitarEditorSalvar = false;
            this.formEditor.get('modelo').setValue(null);
        } else {
            this.habilitarEditorSalvar = true;
        }
    }

    doEditor(): void {
        const modelo = this.formEditor.get('modelo').value;
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.CreateComponenteDigital({
            modelo: modelo,
            tarefaOrigem: this.currentTarefa,
            processoOrigem: this.currentTarefa.processo,
            routeAtividadeDocumento: this.routeAtividadeDocumento,
            operacaoId: operacaoId
        }));
        this.formEditor.get('modelo').setValue(null);
        this.menuTriggerList.closeMenu();
    }

    criarOficio(): void {
        this._router.navigate([
            'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
            + this.routerState.params.targetHandle + '/tarefa/' + this.currentTarefa.id + '/oficio'
        ]).then();
    }

    showModelosGrid(): void {
        this.autoCompleteModelos.closePanel();
        this._changeDetectorRef.markForCheck();
        this.menuTriggerList.closeMenu();
        this._changeDetectorRef.markForCheck();
        this._router.navigate([
            'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
            + this.routerState.params.targetHandle + '/tarefa/' + this.currentTarefa.id + '/modelos/modelo'
        ]).then(() => {
            this.closeAutocomplete();
        });
    }

    doVisualizarModelo(): void {
        this._store.dispatch(new fromStore.VisualizarModelo(this.formEditor.get('modelo').value.documento.componentesDigitais[0].id));
    }

    closeAutocomplete(): void {
        this.autoCompleteModelos.closePanel();
        this.formEditor.get('modelo').setValue(null);
        this._changeDetectorRef.markForCheck();
    }

    abreEditor(documentoId: number, tarefa: Tarefa, outraAba?: boolean): void {
        let stepHandle = 'latest';
        let urlEditor;
        if (this.routerState.params['processoHandle'] && parseInt(this.routerState.params['processoHandle'], 10) === tarefa.processo.id) {
            if (this.routerState.params['stepHandle']) {
                stepHandle = this.routerState.params['stepHandle'];
            }
            urlEditor = 'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
                + this.routerState.params.targetHandle + '/tarefa/' + tarefa.id + '/processo/' + tarefa.processo.id + '/visualizar/'
                + stepHandle + '/documento/' + documentoId;
        } else {
            urlEditor = 'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
                + this.routerState.params.targetHandle + '/tarefa/' + tarefa.id + '/documento/' + documentoId;
        }
        if (outraAba) {
            const extras = {
                queryParams: {
                    novaAba: true
                }
            };
            const url = this._router.createUrlTree([urlEditor], extras);
            window.open(url.toString(), '_blank');
        } else {
            this._router.navigate([urlEditor]).then();
        }
    }

    abreEditorOutraAba(documentoId: number, tarefa: Tarefa): void {
        let stepHandle = 'latest';
        if (this.routerState.params['stepHandle'] && parseInt(this.routerState.params['processoHandle'], 10) === tarefa.processo.id) {
            stepHandle = this.routerState.params['stepHandle'];
        }
        window.open(
            this.routerState.url.split('/')[1] + '/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
            + this.routerState.params.targetHandle + '/tarefa/' + tarefa.id + '/processo/' + tarefa.processo.id + '/visualizar/'
            + stepHandle + '/documento/' + documentoId
        );
    }

    /*****************************************************************************************************************
     ******************** Inicio de métodos relacionados a minutas de tarefa *****************************************
     ****************************************************************************************************************/

    /**
     * Altera o tipo de uma minuta
     *
     * @param event
     */
    doAlterarTipoDocumento(event): void {
        this._store.dispatch(new fromStore.UpdateDocumento(event));
    }

    /**
     * Aprova uma minuta
     *
     * @param documentoId
     */
    doAprovaDocumento(documentoId: number): void {
        const documento = new Documento();
        documento.id = documentoId;
        this._store.dispatch(new fromStore.AprovarDocumento({
            documento: documento,
            routeDocumento: this.routeAtividadeDocumento
        }));
    }

    /**
     * Assina uma minuta
     *
     * @param vinculacaoEtiqueta
     */
    doAssinaMinuta(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        const dialogRef = this._matDialog.open(CdkAssinaturaEletronicaPluginComponent, {
            width: '600px'
        });

        const assinaSub = dialogRef.afterClosed().pipe(filter(result => !!result), take(1)).subscribe((result) => {
            assinaSub.unsubscribe();
            if (result.certificadoDigital) {
                this._store.dispatch(new AssinaturaStore.AssinaDocumento([vinculacaoEtiqueta.objectId]));
            } else {
                vinculacaoEtiqueta.objectContext['componentesDigitaisId']?.forEach((componenteDigitalId: number) => {
                    const documento = new Documento();
                    documento.id = vinculacaoEtiqueta.objectId;
                    const assinatura = new Assinatura();
                    const componenteDigital = new ComponenteDigital();
                    componenteDigital.id = componenteDigitalId;
                    assinatura.componenteDigital = componenteDigital;
                    assinatura.algoritmoHash = 'A1';
                    assinatura.cadeiaCertificadoPEM = 'A1';
                    assinatura.cadeiaCertificadoPkiPath = 'A1';
                    assinatura.assinatura = 'A1';
                    assinatura.plainPassword = result.plainPassword;
                    const operacaoId = CdkUtils.makeId();
                    this._store.dispatch(new AssinaturaStore.AssinaDocumentoEletronicamente({
                        assinatura: assinatura,
                        documento: documento,
                        operacaoId: operacaoId
                    }));
                });
                vinculacaoEtiqueta.objectContext['componentesDigitaisVinculadosId']?.forEach((componenteDigitalId: number) => {
                    const documento = new Documento();
                    documento.id = vinculacaoEtiqueta.objectId;
                    const assinatura = new Assinatura();
                    const componenteDigital = new ComponenteDigital();
                    componenteDigital.id = componenteDigitalId;
                    assinatura.componenteDigital = componenteDigital;
                    assinatura.algoritmoHash = 'A1';
                    assinatura.cadeiaCertificadoPEM = 'A1';
                    assinatura.cadeiaCertificadoPkiPath = 'A1';
                    assinatura.assinatura = 'A1';
                    assinatura.plainPassword = result.plainPassword;
                    const operacaoId = CdkUtils.makeId();
                    this._store.dispatch(new AssinaturaStore.AssinaDocumentoEletronicamente({
                        assinatura: assinatura,
                        documento: documento,
                        operacaoId: operacaoId
                    }));
                });
            }
        });
    }

    /**
     * Converte uma minuta em HTML
     *
     * @param documentoId
     */
    doConverteHtml(documentoId: number): void {
        this._store.dispatch(new fromStore.ConverteToHtml(documentoId));
    }

    /**
     * Converte uma minuta em PDF
     *
     * @param documentoId
     */
    doConvertePdf(documentoId: number): void {
        this._store.dispatch(new fromStore.ConverteToPdf(documentoId));
    }

    /**
     * Apaga uma minuta
     *
     * @param event
     * @param loteId
     */
    doDeleteDocumento(event: { documentoId: number; tarefaId: number; documentoAvulsoUuid?: string }, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        const documento = new Documento();
        documento.id = event.documentoId;
        const documentoAvulsoUuid = event.documentoAvulsoUuid ?? null;
        this._store.dispatch(new fromStore.DeleteDocumento({
            documentoId: documento.id,
            documentoAvulsoUuid: documentoAvulsoUuid,
            operacaoId: operacaoId,
            tarefaId: event.tarefaId,
            loteId: loteId,
            redo: [
                new fromStore.DeleteDocumento({
                    documentoId: documento.id,
                    documentoAvulsoUuid: documentoAvulsoUuid,
                    operacaoId: operacaoId,
                    tarefaId: event.tarefaId,
                    loteId: loteId,
                    redo: 'inherent',
                    undo: 'inherent'
                    // redo e undo são herdados da ação original
                }),
                new fromStore.DeleteDocumentoFlush()
            ],
            undo: new fromStore.UndeleteDocumento({
                documento: documento,
                documentoAvulsoUuid: documentoAvulsoUuid,
                operacaoId: operacaoId,
                tarefaId: event.tarefaId,
                redo: null,
                undo: null
            })
        }));

        if (this.snackSubscription) {
            // temos um snack aberto, temos que ignorar
            this.snackSubscription.unsubscribe();
            this.sheetRef.dismiss();
            this.snackSubscription = null;
        }

        this.sheetRef = this._snackBar.openFromComponent(SnackBarDesfazerComponent, {
            duration: 3000,
            panelClass: ['cdk-white-bg'],
            data: {
                icon: 'delete',
                text: 'Deletado(s)'
            }
        });

        this.snackSubscription = this.sheetRef.afterDismissed().subscribe((data) => {
            if (data.dismissedByAction === true) {
                this._store.dispatch(new fromStore.DeleteDocumentoCancel());
            } else {
                this._store.dispatch(new fromStore.DeleteDocumentoFlush());
            }
            this.snackSubscription.unsubscribe();
            this.snackSubscription = null;
        });
    }

    /**
     * Download P7S de uma minuta assinada
     *
     * @param vinculacaoEtiqueta
     */
    doDownloadP7S(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        vinculacaoEtiqueta.objectContext['componentesDigitaisId']?.forEach((componenteDigitalId: number) => {
            this._store.dispatch(new fromStore.DownloadToP7S(componenteDigitalId));
        });
    }

    /**
     * Remove assinatura de uma minuta
     *
     * @param documentoId
     */
    doRemoveAssinaturaDocumento(documentoId: number): void {
        this._store.dispatch(new AssinaturaStore.RemoveAssinaturaDocumento(documentoId));
    }

    limparBuscaTodos(): void {
        this.buscarTodas = false;
        this.limpaFiltros();
    }

    /**
     * Remove documento vinculado
     *
     * @param documentoId
     * @param documentoPrincipalId
     * @param loteId
     */
    doDeleteDocumentoVinculado(documentoId: number, documentoPrincipalId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteDocumentoVinculado({
            documentoId: documentoId,
            documentoPrincipalId: documentoPrincipalId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    /**
     * Abre dialog para visualizar anexos e anexar novos documentos a uma minuta
     *
     * @param event
     */
    doUploadAnexos(event: { vinculacaoEtiqueta: VinculacaoEtiqueta; tarefa: Tarefa }): void {
        this._store.dispatch(new fromStore.UnloadDocumentosVinculados({reset: true}));
        const documentoId = event.vinculacaoEtiqueta.objectId;
        const tarefa = event.tarefa;
        const documentoHandle = `eq:${documentoId}`;

        const params = {
            filter: {
                'vinculacaoDocumentoPrincipal.documento.id': documentoHandle,
                'juntadaAtual': 'isNull'
            },
            limit: 10,
            offset: 0,
            sort: {id: 'DESC'},
            populate: [
                'tipoDocumento',
                'componentesDigitais',
                'processoOrigem',
            ],
            context: {'incluiVinculacaoDocumentoPrincipal': true}
        };
        this._store.dispatch(new fromStore.GetDocumentosVinculados({filters: params, documentoId: documentoId}));
        const documento = new Documento();
        documento.id = documentoId;
        documento.minuta = true;
        documento.tarefaOrigem = tarefa;
        const dialogRef = this._matDialog.open(CdkUploadDialogComponent, {
            width: '600px',
            data: {
                documento: documento,
                saving$: this.isSaving$,
                isLoading$: this.isLoadingDocumentosVinculados$,
                documentosVinculados$: this.documentosVinculados$,
                selectedDocumentosVinculados$: this.selectedDocumentosVinculados$,
                deletingDocumentosVinculadosId$: this.deletingDocumentosVinculadosId$,
                assinandoDocumentosVinculadosId$: this.assinandoDocumentosId$,
                removendoAssinaturaDocumentosVinculadosId$: this.removendoAssinaturaDocumentosId$,
                alterandoDocumentosId$: this.alterandoDocumentosVinculadosId$,
                downloadP7SDocumentosId$: this.downloadP7SDocumentoIds$,
                documentosPagination$: this.documentosVinculadosPagination$
            }
        });
        // Subscribe nos eventos do componente
        const alteraTipoSub = dialogRef.componentInstance.alteraTipoDocumento.subscribe((values) => {
            this._store.dispatch(new fromStore.UpdateDocumento(values));
        });
        const aprovaSub = dialogRef.componentInstance.aprovarDocumento.subscribe((aDocumento: Documento) => {
            this._store.dispatch(new fromStore.AprovarDocumento({
                documento: aDocumento,
                routeDocumento: this.routeAtividadeDocumento
            }));
            this._matDialog.closeAll();
        });
        const atualizaSub = dialogRef.componentInstance.atualizaDocumentosVinculados.subscribe(() => {
        });
        const assinaBlocoSub = dialogRef.componentInstance.assinaBloco.subscribe((result) => {
            if (result.certificadoDigital) {
                const documentosId = [];
                result.documentos.forEach((aDocumento) => {
                    documentosId.push(aDocumento.id);
                });
                this._store.dispatch(new AssinaturaStore.AssinaDocumento(documentosId));
            } else {
                const loteId = CdkUtils.makeId();
                result.documentos.forEach((aDocumento) => {
                    aDocumento.componentesDigitais.forEach((componenteDigital) => {
                        const assinatura = new Assinatura();
                        assinatura.componenteDigital = componenteDigital;
                        assinatura.algoritmoHash = 'A1';
                        assinatura.cadeiaCertificadoPEM = 'A1';
                        assinatura.cadeiaCertificadoPkiPath = 'A1';
                        assinatura.assinatura = 'A1';
                        assinatura.plainPassword = result.plainPassword;

                        const operacaoId = CdkUtils.makeId();
                        this._store.dispatch(new AssinaturaStore.AssinaDocumentoEletronicamente({
                            assinatura: assinatura,
                            documento: aDocumento,
                            operacaoId: operacaoId,
                            loteId: loteId
                        }));
                    });
                });
            }
        });
        const assinaSub = dialogRef.componentInstance.assina.subscribe((result) => {
            if (result.certificadoDigital) {
                this._store.dispatch(new AssinaturaStore.AssinaDocumento([result.documento.id]));
            } else {
                result.documento.componentesDigitais.forEach((componenteDigital) => {
                    const assinatura = new Assinatura();
                    assinatura.componenteDigital = componenteDigital;
                    assinatura.algoritmoHash = 'A1';
                    assinatura.cadeiaCertificadoPEM = 'A1';
                    assinatura.cadeiaCertificadoPkiPath = 'A1';
                    assinatura.assinatura = 'A1';
                    assinatura.plainPassword = result.plainPassword;

                    const operacaoId = CdkUtils.makeId();
                    this._store.dispatch(new AssinaturaStore.AssinaDocumentoEletronicamente({
                        assinatura: assinatura,
                        documento: result.documento,
                        operacaoId: operacaoId
                    }));
                });
            }
        });
        const changeSelectedSub = dialogRef.componentInstance.changeSelected.subscribe((selectedIds) => {
            this._store.dispatch(new fromStore.ChangeSelectedDocumentosVinculados(selectedIds));
        });
        const clickedSub = dialogRef.componentInstance.clickDocumento.subscribe((clickEvent) => {
            this.abreEditor(clickEvent.documento.id, clickEvent.documentoPrincipal.tarefaOrigem);
            dialogRef.close();
        });
        const completeSub = dialogRef.componentInstance.completeDocumentoVinculado.subscribe((result) => {
            delete result.componenteDigital.documentoOrigem;
            this._store.dispatch(new fromStore.CompleteDocumentoVinculado({
                documentoPrincipalId: result.documentoPrincipal.id,
                componenteDigital: result.componenteDigital
            }));
        });
        const deleteSub = dialogRef.componentInstance.deleteDocumento.subscribe((result) => {
            this.doDeleteDocumentoVinculado(result.documentoId, documentoId, result.loteId);
        });
        const downloadP7SSub = dialogRef.componentInstance.downloadP7S.subscribe((aDocumento: Documento) => {
            aDocumento.componentesDigitais.forEach((componenteDigital: ComponenteDigital) => {
                this._store.dispatch(new fromStore.DownloadToP7S(componenteDigital));
            });
        });
        const getMoreSub = dialogRef.componentInstance.getMore.subscribe(() => {
            if (this.documentosVinculados.length >= this.documentosVinculadosPagination.total) {
                return;
            }

            const nparams = {
                ...this.documentosVinculadosPagination,
                offset: this.documentosVinculadosPagination.offset + this.documentosVinculadosPagination.limit
            };

            this._store.dispatch(new fromStore.GetDocumentosVinculados({filters: nparams, documentoId: documentoId}));
        });
        const removeAssinaturaSub = dialogRef.componentInstance.removeAssinatura.subscribe((docId: number) => {
            this._store.dispatch(new AssinaturaStore.RemoveAssinaturaDocumento(docId));
        });
        // Unsubscribe em todas as assinaturas de eventos
        dialogRef.afterClosed().subscribe(() => {
            alteraTipoSub.unsubscribe();
            aprovaSub.unsubscribe();
            atualizaSub.unsubscribe();
            assinaBlocoSub.unsubscribe();
            assinaSub.unsubscribe();
            changeSelectedSub.unsubscribe();
            clickedSub.unsubscribe();
            completeSub.unsubscribe();
            deleteSub.unsubscribe();
            downloadP7SSub.unsubscribe();
            getMoreSub.unsubscribe();
            removeAssinaturaSub.unsubscribe();
            this._store.dispatch(new fromStore.UnloadDocumentosVinculados({reset: true}));
        });
    }

    /**
     * Visualizar documento de resposta
     *
     * @param event
     */
    doVerResposta(event: { documentoRespostaId: number; tarefa: Tarefa }): void {
        const tarefa = event.tarefa;
        const documentoRespostaId = event.documentoRespostaId;
        this.abreEditor(documentoRespostaId, tarefa);
    }

    doTarefaListViewModeChange(viewMode: ViewMode): void {
        this._cacheGenericUserDataService.get(TarefasComponent.LIST_DEFINITIONS_KEY)
            .pipe(
                takeUntil(this._unsubscribeAll),
                take(1),
                switchMap(configs => of(configs || {}))
            )
            .subscribe((configs) => {
                const scopeKey = TarefasComponent.generateScopeKey([this.generoHandle]);
                const updatedConfigs = {...configs};
                if (!updatedConfigs[scopeKey]) {
                    updatedConfigs[scopeKey] = {};
                }

                updatedConfigs[scopeKey] = {
                    ...(updatedConfigs[scopeKey] ?? {}),
                    viewMode: viewMode
                };

                this._cacheGenericUserDataService.set(updatedConfigs, TarefasComponent.LIST_DEFINITIONS_KEY, 60 * 60 * 24 * 1000).subscribe();

                if (viewMode === 'list') {
                    this.tarefaListViewMode = viewMode;
                    this._store.dispatch(new fromStore.ChangeViewMode(viewMode));

                    this.reload({
                        listFilter: this.pagination.listFilter,
                        listSort: (updatedConfigs[scopeKey]['tableDefinitions']?.sort || {[this._defaultSortField]: this._defaultSortOrder}),
                        limit: (updatedConfigs[scopeKey]['tableDefinitions']?.limit || 10),
                        tipoBusca: this.buscarTodas ? 'todas' : undefined,
                        offset: 0
                    });

                    this._changeDetectorRef.markForCheck();
                }

            });

        if (viewMode === 'grid') {
            this._tableDefinitionsService
                .getTableDefinitions(
                    this._tableDefinitionsService
                        .generateTableDeinitionIdentifier(TarefasComponent.GRID_DEFINITIONS_KEYS)
                )
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe((definitions: TableDefinitions) => {
                    this.tarefaListViewMode = viewMode;
                    this._store.dispatch(new fromStore.ChangeViewMode(viewMode));

                    this.reload({
                        listFilter: this.pagination.listFilter,
                        listSort: (definitions?.sort || {[this._defaultSortField]: this._defaultSortOrder}),
                        limit: (definitions?.limit || 10),
                        tipoBusca: this.buscarTodas ? 'todas' : undefined,
                        offset: 0
                    });

                    this._changeDetectorRef.markForCheck();
                });
        }
    }

    resetTableDefinitions(): void {
        this.reload({
            ...this.pagination,
            listSort: {[this._defaultSortField]: this._defaultSortOrder},
            limit: 10,
            offset: 0
        });
    }

    doPendencies({vinculacaoEtiqueta, tarefa}): void {
        this._store.dispatch(new fromStore.GetAcoesEtiqueta(vinculacaoEtiqueta.etiqueta.id));
        const dialogRef = this._matDialog
            .open(CdkVinculacaoEtiquetaAcoesDialogComponent, {
                data: {
                    vinculacaoEtiqueta: vinculacaoEtiqueta,
                    acoesEtiquetaList$: this.acoesEtiquetaList$,
                    isSaving$: this.savingVinculacaoEtiquetaId$
                        .pipe(switchMap((vinculacaoEtiquetaId: number) => of(vinculacaoEtiquetaId === vinculacaoEtiqueta.id))),
                    isLoading$: this.loadingAcoesEtiqueta$
                },
                width: '600px',
                height: '600px',
            });

        dialogRef.afterClosed()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((acoesId?: number[]) => {
                if (acoesId) {
                    this._store.dispatch(new fromStore.AprovarSugestao({
                        vinculacaoEtiqueta: vinculacaoEtiqueta,
                        acoesExecucaoSugestao: JSON.stringify(acoesId),
                        tarefa: tarefa
                    }));
                }
            });
    }

    doToggleGroup(groupData: CdkTarefaGroupDataInterface): void {
        this._store.dispatch(new fromStore.ToggleGroup(groupData));
    }

    doGroupOptionChange(sortOption: CdkTarefaSortOptionsInterface | null): void {
        this._store.dispatch(new fromStore.UnloadGroup());
    }

    doTableDefinitionsChange(tableDefinitions: TableDefinitions): void {
        if (this.tarefaListViewMode === 'grid') {
            tableDefinitions.identifier = this._tableDefinitionsService
                .generateTableDeinitionIdentifier(TarefasComponent.GRID_DEFINITIONS_KEYS);

            this._tableDefinitionsService.saveTableDefinitions(tableDefinitions);
        } else {
            this._cacheGenericUserDataService.get(TarefasComponent.LIST_DEFINITIONS_KEY)
                .pipe(
                    takeUntil(this._unsubscribeAll),
                    take(1),
                    switchMap(configs => of(configs || {}))
                )
                .subscribe((configs) => {
                    const scopeKey = TarefasComponent.generateScopeKey([this.generoHandle]);
                    const updatedConfigs = {...configs};
                    if (!updatedConfigs[scopeKey]) {
                        updatedConfigs[scopeKey] = {};
                    }

                    updatedConfigs[scopeKey]['tableDefinitions'] = tableDefinitions;

                    updatedConfigs[scopeKey] = {
                        ...updatedConfigs[scopeKey],
                        viewMode: this.tarefaListViewMode
                    };

                    this._cacheGenericUserDataService.set(updatedConfigs, TarefasComponent.LIST_DEFINITIONS_KEY, 60 * 60 * 24 * 1000).subscribe();
                });
        }
    }

    getFavoritosMinuta(autocomplete: HTMLInputElement): void {
        autocomplete.focus();
        this.modeloListIsLoading = true;
        this._favoritoService.query(
            JSON.stringify({
                objectClass: 'eq:SuppCore\\AdministrativoBackend\\Entity\\Modelo',
                context: 'eq:modelo' +
                    '_genero_' + this.routerState.params.generoHandle
            }),
            5,
            0,
            JSON.stringify({prioritario: 'DESC', qtdUso: 'DESC'}),
            JSON.stringify(this.modeloPagination.populate)
        ).pipe(
            finalize(() => this.modeloListIsLoading = false),
            catchError(() => of([]))
        ).subscribe(
            (response) => {
                this.modeloList = [];
                response['entities'].forEach((favorito) => {
                    this.modeloList.push(favorito.objFavoritoClass[0]);
                });
                this._changeDetectorRef.markForCheck();
            }
        );
    }
}
