import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';

import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {CdkTranslationLoaderService} from '@cdk/services/translation-loader.service';

import {Documento, Etiqueta, Folder, Pagination, Tarefa, Usuario} from '@cdk/models';
import {TarefaService} from '@cdk/services/tarefa.service';
import * as fromStore from 'app/main/apps/tarefas/store';
import {ToggleMaximizado} from 'app/main/apps/tarefas/store';
import {getMercureState, getRouterState, getScreenState} from 'app/store/reducers';
import {locale as english} from 'app/main/apps/tarefas/i18n/en';
import {ResizeEvent} from 'angular-resizable-element';
import {cdkAnimations} from '@cdk/animations';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {LoginService} from '../../auth/login/login.service';
import {DynamicService} from 'modules/dynamic.service';
import {modulesConfig} from '../../../../modules/modules-config';
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
import {CdkAssinaturaEletronicaPluginComponent} from '@cdk/components/componente-digital/cdk-componente-digital-ckeditor/cdk-plugins/cdk-assinatura-eletronica-plugin/cdk-assinatura-eletronica-plugin.component';
import {UpdateData} from '@cdk/ngrx-normalizr';
import {documento as documentoSchema} from '@cdk/normalizr';
import {SearchBarEtiquetasFiltro} from '@cdk/components/search-bar-etiquetas/search-bar-etiquetas-filtro';

@Component({
    selector: 'tarefas',
    templateUrl: './tarefas.component.html',
    styleUrls: ['./tarefas.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TarefasComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('tarefaListElement', {read: ElementRef, static: true}) tarefaListElement: ElementRef;

    confirmDialogRef: MatDialogRef<CdkConfirmDialogComponent>;

    routerState: any;

    searchInput: FormControl;

    folders$: Observable<Folder[]>;
    currentTarefaId: number;
    tarefas: Tarefa[] = [];

    loaded: any;

    tarefaListSize = 30;
    tarefaListOriginalSize: number;

    tarefas$: Observable<Tarefa[]>;

    loading$: Observable<boolean>;
    loading: boolean;

    togglingUrgenteIds$: Observable<number[]>;
    savingObservacao$: Observable<boolean>;
    assinandoTarefasIds$: Observable<number[]>;
    assinandoTarefasEletronicamenteIds$: Observable<number[]>;
    assinaturaInterval = null;

    deletingIds$: Observable<number[]>;
    deletedIds$: Observable<number[]>;
    undeletingTarefaIds$: Observable<number[]>;

    error$: Observable<any>;
    errorDelete$: Observable<any>;
    errorDistribuir$: Observable<any>;

    selectedIds$: Observable<number[]>;
    selectedIds: number[] = [];
    draggingIds$: Observable<number[]>;

    selectedTarefas$: Observable<Tarefa[]>;

    selectedTarefas: Tarefa[] = [];

    screen$: Observable<any>;

    filter = {};

    etiquetas: Etiqueta[] = [];

    pagination$: Observable<any>;
    pagination: any;

    routerState$: Observable<any>;

    maximizado$: Observable<boolean>;
    maximizado = false;

    mobileMode = false;

    mostraCriar = false;

    loadingAssuntosProcessosId$: Observable<number[]>;

    loadingInteressadosProcessosId$: Observable<number[]>;

    totalInteressadosProcessosId$: Observable<any[]>;

    cienciaIds$: Observable<number[]>;

    pesquisaTarefa: string;

    changingFolderIds$: Observable<number[]>;

    targetHandle: string;

    routeAtividade = 'atividades/criar';
    routeAtividadeBloco = 'atividade-bloco';
    novaTarefa = false;

    sheetRef: MatSnackBarRef<SnackBarDesfazerComponent>;
    snackSubscription: any;
    snackSubscriptionType: string;
    lote: string;

    usuarioAtual: Usuario;

    javaWebStartOK = false;

    arrayFiltrosEtiquetas: SearchBarEtiquetasFiltro[] = [];
    filtroEtiquetas: SearchBarEtiquetasFiltro;

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    private _unsubscribeAll: Subject<any> = new Subject();

    private _profile: Usuario;

    /**
     *
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _cdkTranslationLoaderService
     * @param _tarefaService
     * @param _router
     * @param _store
     * @param _loginService
     * @param _dynamicService
     * @param _snackBar
     * @param _matDialog
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _cdkTranslationLoaderService: CdkTranslationLoaderService,
        private _tarefaService: TarefaService,
        private _router: Router,
        private _store: Store<fromStore.TarefasAppState>,
        private _loginService: LoginService,
        private _dynamicService: DynamicService,
        private _snackBar: MatSnackBar,
        private _matDialog: MatDialog
    ) {
        // Set the defaults
        this.searchInput = new FormControl('');
        this._cdkTranslationLoaderService.loadTranslations(english);
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.togglingUrgenteIds$ = this._store.pipe(select(fromStore.getIsTogglingUrgenteIds));
        this.tarefas$ = this._store.pipe(select(fromStore.getTarefas));
        this.error$ = this._store.pipe(select(fromStore.getError));
        this.errorDelete$ = this._store.pipe(select(fromStore.getErrorDelete));
        this.errorDistribuir$ = this._store.pipe(select(fromStore.getErrorDistribuir));
        this.savingObservacao$ = this._store.pipe(select(fromStore.getIsSavingObservacao));
        this.assinandoTarefasIds$ = this._store.pipe(select(fromStore.getAssinandoTarefasId));
        this.assinandoTarefasEletronicamenteIds$ = this._store.pipe(select(fromStore.getAssinandoTarefasEletronicamenteId));

        this._store.pipe(select(fromStore.getTarefasLoaded)).subscribe((loaded) => {
            this.loaded = loaded;
        });

        this.folders$ = this._store.pipe(select(fromStore.getFolders));
        this.selectedTarefas$ = this._store.pipe(select(fromStore.getSelectedTarefas));
        this.selectedIds$ = this._store.pipe(select(fromStore.getSelectedTarefaIds));
        this.draggingIds$ = this._store.pipe(select(fromStore.getDraggedTarefasIds));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.routerState$ = this._store.pipe(select(getRouterState));
        this.maximizado$ = this._store.pipe(select(fromStore.getMaximizado));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingTarefaIds));
        this.undeletingTarefaIds$ = this._store.pipe(select(fromStore.getUnDeletingTarefaIds));
        this.changingFolderIds$ = this._store.pipe(select(fromStore.getChangingFolderTarefaIds));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedTarefaIds));
        this.screen$ = this._store.pipe(select(getScreenState));
        this._profile = _loginService.getUserProfile();
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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

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
            // eslint-disable-next-line radix
            this.currentTarefaId = parseInt(routerState.state.params['tarefaHandle'], 0);
            this.targetHandle = routerState.state.params['targetHandle'];

            const path = 'app/main/apps/tarefas';
            modulesConfig.forEach((module) => {
                if (module.routerLinks.hasOwnProperty(path) &&
                    module.routerLinks[path].hasOwnProperty('atividades') &&
                    module.routerLinks[path]['atividades'].hasOwnProperty(this.routerState.params.generoHandle)) {
                    this.routeAtividade = module.routerLinks[path]['atividades'][this.routerState.params.generoHandle];
                }

                if (module.routerLinks.hasOwnProperty(path) &&
                    module.routerLinks[path].hasOwnProperty('atividade-bloco') &&
                    module.routerLinks[path]['atividade-bloco'].hasOwnProperty(this.routerState.params.generoHandle)) {
                    this.routeAtividadeBloco = module.routerLinks[path]['atividade-bloco'][this.routerState.params.generoHandle];
                }
            });
        });

        this._store.pipe(
            select(getMercureState),
            takeUntil(this._unsubscribeAll)
        ).subscribe((message) => {
            if (message && message.type === 'nova_tarefa') {
                if (message.content.genero === this.routerState.params.generoHandle) {
                    this.novaTarefa = true;
                }
            }
            if (message && message.type === 'assinatura') {
                switch (message.content.action) {
                    case 'assinatura_iniciada':
                        this.javaWebStartOK = true;
                        break;
                    case 'assinatura_cancelada':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoFailed({documentoId: message.content.documentoId}));
                        break;
                    case 'assinatura_erro':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoFailed({documentoId: message.content.documentoId}));
                        break;
                    case 'assinatura_finalizada':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoSuccess(message.content.documentoId));
                        this._store.dispatch(new UpdateData<Documento>({
                            id: message.content.documentoId,
                            schema: documentoSchema,
                            changes: {assinado: true}
                        }));
                        break;
                }
            }
        });

        this.assinandoTarefasIds$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((assinandoTarefasIds) => {
            if (assinandoTarefasIds.length > 0) {
                this.assinaturaInterval = setInterval(() => {
                    // monitoramento do java
                    if (!this.javaWebStartOK && (assinandoTarefasIds.length > 0)) {
                        assinandoTarefasIds.forEach(
                            tarefaId => this._store.dispatch(new fromStore.AssinaDocumentoFailed({tarefaId: tarefaId}))
                        );
                    }
                }, 30000);
            } else {
                clearInterval(this.assinaturaInterval);
            }
        });

        this.tarefas$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(tarefas => !!tarefas)
        ).subscribe((tarefas) => {
            this.tarefas = tarefas;
        });

        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            this.pagination = pagination;
        });

        this.maximizado$.pipe(
            takeUntil(this._unsubscribeAll)
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
                this.mobileMode = true;
                if (this.maximizado) {
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
        });

        this.pesquisaTarefa = 'tarefa';
    }

    ngAfterViewInit(): void {
        this.tarefaListOriginalSize = this.tarefaListElement.nativeElement.offsetWidth;

        const path = 'app/main/apps/tarefas';
        modulesConfig.forEach((module) => {
            if (module.routerLinks.hasOwnProperty(path) &&
                module.routerLinks[path].hasOwnProperty('atividades') &&
                module.routerLinks[path]['atividades'].hasOwnProperty(this.routerState.params.generoHandle)) {
                this.routeAtividade = module.routerLinks[path]['atividades'][this.routerState.params.generoHandle];
            }

            if (module.routerLinks.hasOwnProperty(path) &&
                module.routerLinks[path].hasOwnProperty('atividade-bloco') &&
                module.routerLinks[path]['atividade-bloco'].hasOwnProperty(this.routerState.params.generoHandle)) {
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
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    reload(params): void {
        this.novaTarefa = false;
        this._store.dispatch(new fromStore.UnloadTarefas({reset: false}));

        const nparams = {
            ...this.pagination,
            listFilter: params.listFilter,
            sort: params.listSort && Object.keys(params.listSort).length ? params.listSort : this.pagination.sort
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
            offset: this.pagination.offset + this.pagination.limit
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
                const url = this._router.createUrlTree([
                    'apps/tarefa/' + tarefa.id + '/processo/' + tarefa.processo.id + '/visualizar'
                ]);
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
    }

    changeDraggedIds(ids: number[]): void {
        this._store.dispatch(new fromStore.ChangeDraggedTarefas(ids));
    }

    setFolderOnSelectedTarefas(folder): void {
        const loteId = CdkUtils.makeId();
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
                this.tarefaListOriginalSize = this.tarefaListElement.nativeElement.offsetWidth;
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

    doMovimentar(tarefaId): void {
        // eslint-disable-next-line max-len
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/tarefa/' + tarefaId + '/' + this.routeAtividade]).then();
    }

    doEditTarefa(tarefaId): void {
        // eslint-disable-next-line max-len
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/tarefa/' + tarefaId + '/editar']).then();
    }

    doEditProcesso(params): void {
        // eslint-disable-next-line max-len
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/tarefa/' + params.id + '/processo/' + params.processo.id + '/editar/dados-basicos']).then();
    }

    doRedistribuirTarefa(tarefaId): void {
        // eslint-disable-next-line max-len
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/tarefa/' + tarefaId + '/redistribuicao']).then();
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

    doUploadBloco(): void {
        // eslint-disable-next-line max-len
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/upload-bloco']).then();
    }

    doEditorBloco(): void {
        // eslint-disable-next-line max-len
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/modelo-bloco']).then();
    }

    doCreateDocumentoAvulsoBloco(): void {
        // eslint-disable-next-line max-len
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/documento-avulso-bloco']).then();
    }

    doAssinaturaMinutas(tarefa: Tarefa): void {
        const dialogRef = this._matDialog.open(CdkAssinaturaEletronicaPluginComponent, {
            width: '600px'
        });

        dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe((result) => {
            if (result.certificadoDigital) {
                this._store.dispatch(new fromStore.GetDocumentos({tarefaId: tarefa.id, certificadoDigital: true}));
            } else {
                this._store.dispatch(new fromStore.GetDocumentos({
                    tarefaId: tarefa.id,
                    assinatura: {plainPassword: result.plainPassword}
                }));
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
        this.currentTarefaId = null;
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
            },
            disableClose: false
        });

        this.confirmDialogRef
            .componentInstance
            .confirmMessage = 'Deseja gerar um relatório com a listagem completa de tarefas? Você receberá uma notificação quando o relatório estiver disponível.';

        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this._store.dispatch(new fromStore.GerarRelatorioTarefaExcel());
            }
            this.confirmDialogRef = null;
        });
    }

    doEditarDocumentoEtiqueta(event): void {
        const tarefa = event.tarefa;
        const vinculacaoEtiqueta = event.vinculacaoEtiqueta;
        if (!tarefa.apagadoEm && vinculacaoEtiqueta.objectClass === 'SuppCore\\AdministrativoBackend\\Entity\\Documento') {
            this._store.dispatch(new fromStore.SetCurrentTarefa({
                tarefaId: tarefa.id,
                processoId: tarefa.processo.id,
                acessoNegado: tarefa.processo.acessoNegado,
                documentoUuidEdit: vinculacaoEtiqueta.objectUuid
            }));
        }
        if (!tarefa.apagadoEm && vinculacaoEtiqueta.objectClass === 'SuppCore\\AdministrativoBackend\\Entity\\DocumentoAvulso') {
            this._store.dispatch(new fromStore.SetCurrentTarefa({
                tarefaId: tarefa.id,
                processoId: tarefa.processo.id,
                acessoNegado: tarefa.processo.acessoNegado,
                documentoUuidEdit: vinculacaoEtiqueta.objectUuid
            }));
        }
    }
}
