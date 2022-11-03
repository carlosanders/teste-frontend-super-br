import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';

import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {CdkTranslationLoaderService} from '@cdk/services/translation-loader.service';

import {Etiqueta, Pagination, Processo, Tarefa, Usuario, VinculacaoEtiqueta} from '@cdk/models';
import * as fromStore from 'app/main/apps/processo/store';
import {locale as english} from 'app/main/apps/processo/i18n/en';
import {cdkAnimations} from '@cdk/animations';
import {getRouterState} from '../../../store';
import {LoginService} from '../../auth/login/login.service';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {modulesConfig} from '../../../../modules/modules-config';
import {DynamicService} from '../../../../modules/dynamic.service';
import {CdkConfirmDialogComponent} from '@cdk/components/confirm-dialog/confirm-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CdkUtils} from '../../../../@cdk/utils';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

@Component({
    selector: 'processo',
    templateUrl: './processo.component.html',
    styleUrls: ['./processo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProcessoComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('dynamicComponent', {read: ViewContainerRef})
    container: ViewContainerRef;

    @ViewChild('dynamicComponentConverter', {read: ViewContainerRef})
    containerConverter: ViewContainerRef;

    confirmDialogRef: MatDialogRef<CdkConfirmDialogComponent>;
    dialogRef: any;

    processo$: Observable<Processo>;
    processo: Processo;

    showSolicitarDossie = true;

    loading$: Observable<boolean>;
    routerState: any;

    routerState$: Observable<any>;

    vinculacaoEtiquetaPagination: Pagination;
    savingVinculacaoEtiquetaId$: Observable<any>;
    errors$: Observable<any>;

    chaveAcesso: string;
    steps$: Observable<boolean>;

    pluginLoading$: Observable<string[]>;
    pluginLoading: string[];

    expandir$: Observable<boolean>;

    togglingAcompanharProcesso$: Observable<boolean>;

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    label = 'Protocolo';
    nup = '';
    generoProcesso = '';

    loadingTarefasProcesso$: Observable<boolean>;
    usuariosTarefa: Map<number, {usuario: Usuario, tarefas: Tarefa[]}> = new Map<number, {usuario: Usuario; tarefas: Tarefa[]}>();
    timedOutCloser: any;
    lastUsuarioMenuTrigger: MatMenuTrigger;

    private _profile: Usuario;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _cdkTranslationLoaderService
     * @param _store
     * @param _loginService
     * @param _router
     * @param _dynamicService
     * @param _matDialog
     * @param _snackBar
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _cdkTranslationLoaderService: CdkTranslationLoaderService,
        private _store: Store<fromStore.ProcessoAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _dynamicService: DynamicService,
        private _matDialog: MatDialog,
        private _snackBar: MatSnackBar
    ) {
        // Set the defaults
        this._profile = _loginService.getUserProfile();
        this._cdkTranslationLoaderService.loadTranslations(english);
        this.processo$ = this._store.pipe(select(fromStore.getProcesso));
        this.loading$ = this._store.pipe(select(fromStore.getProcessoIsLoading));
        this.togglingAcompanharProcesso$ = this._store.pipe(select(fromStore.getTogglingAcompanharProcesso));

        this.vinculacaoEtiquetaPagination = new Pagination();
        if (!_loginService.isGranted('ROLE_USUARIO_EXTERNO')) {
            this.vinculacaoEtiquetaPagination.filter = {
                orX: [
                    {
                        'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.id,
                        'modalidadeEtiqueta.valor': 'eq:PROCESSO'
                    },
                    {
                        'vinculacoesEtiquetas.setor.id': 'in:' + this._profile.colaborador?.lotacoes.map(lotacao => lotacao.setor.id).join(','),
                        'modalidadeEtiqueta.valor': 'eq:PROCESSO'
                    },
                    {
                        'vinculacoesEtiquetas.unidade.id': 'in:' + this._profile.colaborador?.lotacoes.map(lotacao => lotacao.setor.unidade.id).join(','),
                        'modalidadeEtiqueta.valor': 'eq:PROCESSO'
                    },
                    {
                        // eslint-disable-next-line max-len
                        'vinculacoesEtiquetas.modalidadeOrgaoCentral.id': 'in:' + this._profile.colaborador?.lotacoes.map(lotacao => lotacao.setor.unidade.modalidadeOrgaoCentral.id).join(','),
                        'modalidadeEtiqueta.valor': 'eq:PROCESSO'
                    }
                ]
            };
        }
        this.routerState$ = this._store.pipe(select(getRouterState));
        this.savingVinculacaoEtiquetaId$ = this._store.pipe(select(fromStore.getSavingVinculacaoEtiquetaId));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.steps$ = this._store.pipe(select(fromStore.getSteps));
        this.expandir$ = this._store.pipe(select(fromStore.getExpandirTela));
        this.pluginLoading$ = this._store.pipe(select(fromStore.getPluginLoadingProcesso));
        this.loadingTarefasProcesso$ = this._store.pipe(select(fromStore.getLoadingTarefasProcesso));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            this.chaveAcesso = routerState.state.params['chaveAcessoHandle'];
        });

        this.processo$.pipe(
            filter(processo => !!processo)
        ).subscribe((processo) => {
            if (this.processo?.id !== processo.id) {
                this.iniciaModulos();
            }
            this.processo = processo;
            this.label = 'Protocolo';
            switch (this.processo?.unidadeArquivistica) {
                case 1:
                    this.label = 'Processo';
                    this.nup = this.processo?.NUPFormatado;
                    this.generoProcesso = this.processo?.especieProcesso?.generoProcesso?.nome;
                    break;
                case 2:
                    this.label = 'Documento Avulso';
                    this.nup = this.processo?.NUPFormatado;
                    this.generoProcesso = this.processo?.especieProcesso?.generoProcesso?.nome;
                    break;
                case 3:
                    this.label = 'Pasta';
                    this.nup = this.processo?.outroNumero;
                    this.generoProcesso = this.processo?.especieProcesso?.generoProcesso?.nome;
                    break;
                default:
                    this.label = 'Protocolo';
                    this.nup = '';
                    this.generoProcesso = '';
            }
            this.refresh();
        });

        this.pluginLoading$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(pluginLoading => this.pluginLoading = pluginLoading);

        this.errors$.pipe(
            filter(errors => !!errors),
            takeUntil(this._unsubscribeAll)
        ).subscribe((errors) => {
            const error = 'Erro! ' + (errors.error.message || errors.statusText);
            this._snackBar.open(error, null, {
                duration: 5000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                panelClass: ['danger-snackbar']
            });
        });

        this._store.pipe(
            select(fromStore.getTarefaList),
            filter(tarefas => !!tarefas),
            takeUntil(this._unsubscribeAll)
        ).subscribe((tarefas: Tarefa[]) => {
            this.usuariosTarefa = new Map<number, {usuario: Usuario; tarefas: Tarefa[]}>();
            tarefas.forEach((tarefa) => {
               if (!this.usuariosTarefa.has(tarefa.usuarioResponsavel.id)) {
                   this.usuariosTarefa.set(tarefa.usuarioResponsavel.id, {usuario: tarefa.usuarioResponsavel, tarefas: []});
               }

               const usuarioTarefas = this.usuariosTarefa.get(tarefa.usuarioResponsavel.id);
               usuarioTarefas.tarefas.push(tarefa);

                this.usuariosTarefa.set(tarefa.usuarioResponsavel.id, usuarioTarefas);
            });
        });
    }

    ngAfterViewInit(): void {
        this.iniciaModulos();
    }

    iniciaModulos(): void {
        if (this.container !== undefined) {
            this.container.clear();
        }

        let path = 'app/main/apps/processo';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    if (this.container !== undefined) {
                        this._dynamicService.loadComponent(c)
                            .then((componentFactory) => {
                                this.container.createComponent(componentFactory);
                                this._changeDetectorRef.markForCheck();
                            });
                    }
                }));
            }
        });
        if (this.containerConverter !== undefined) {
            this.containerConverter.clear();
        }
        path = 'app/main/apps/processo#converter';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    if (this.containerConverter !== undefined) {
                        this._dynamicService.loadComponent(c)
                            .then((componentFactory) => {
                                this.containerConverter.createComponent(componentFactory);
                                this._changeDetectorRef.markForCheck();
                            });
                    }
                }));
            }
        });
        this._changeDetectorRef.detectChanges();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // this._changeDetectorRef.detach();
        // Unsubscribe from all subscriptions
        if (this.processo && this.routerState.url.indexOf('/processo/' + this.processo.id) === -1) {
            this._store.dispatch(new fromStore.UnloadProcesso());
        }
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

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

    doAutuar(): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.AutuarProcesso({processo: this.processo, operacaoId: operacaoId}));
    }

    onEtiquetaCreate(etiqueta: Etiqueta): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.CreateVinculacaoEtiqueta({
            processo: this.processo,
            etiqueta: etiqueta,
            operacaoId: operacaoId
        }));
    }

    onEtiquetaEdit(values): void {
        const vinculacaoEtiqueta = new VinculacaoEtiqueta();
        vinculacaoEtiqueta.id = values.id;
        this._store.dispatch(new fromStore.SaveConteudoVinculacaoEtiqueta({
            vinculacaoEtiqueta: vinculacaoEtiqueta,
            changes: {conteudo: values.conteudo, privada: values.privada}
        }));
    }

    onEtiquetaDelete(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this._store.dispatch(new fromStore.DeleteVinculacaoEtiqueta({
            processoId: this.processo.id,
            vinculacaoEtiquetaId: vinculacaoEtiqueta.id
        }));
    }

    visualizarProcessoNovaAba(): void {
        const chaveAcesso = this.processo.chaveAcesso ? '/chave/' + this.processo.chaveAcesso : '';
        window.open('apps/processo/' + this.processo.id + chaveAcesso + '/visualizar', '_blank');
    }

    imprimirEtiqueta(): void {
        this._router.navigate([this.routerState.url.split('processo/' + this.processo.id)[0] + 'processo/' + this.processo.id + '/' + 'etiqueta']).then();
    }

    imprimirRelatorio(): void {
        this._router.navigate([this.routerState.url.split('processo/' + this.processo.id)[0] + 'processo/' + this.processo.id + '/' + 'relatorio']).then();
    }

    arquivarProcesso(): void {
        this._store.dispatch(new fromStore.AddPluginLoading('arquivar_processo'));
        this.confirmDialogRef = this._matDialog.open(CdkConfirmDialogComponent, {
            data: {
                title: 'Confirmação',
                confirmLabel: 'Sim',
                message: 'Deseja realmente arquivar o processo ' + this.processo.NUPFormatado + '?',
                cancelLabel: 'Não',
            },
            disableClose: false
        });

        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                const populate = JSON.stringify([
                    'setorAtual',
                    'setorAtual.especieSetor',
                    'setorAtual.unidade',
                    'modalidadeFase'
                ]);
                const operacaoId = CdkUtils.makeId();
                this._store.dispatch(new fromStore.ArquivarProcesso({
                    processo: this.processo,
                    populate: populate,
                    operacaoId: operacaoId
                }));
            } else {
                this._store.dispatch(new fromStore.RemovePluginLoading('arquivar_processo'));
            }
            this.confirmDialogRef = null;
        });
    }

    acompanharProcesso(processo: Processo): void {
        if (!this.processo.compartilhamentoUsuario) {
            const operacaoId = CdkUtils.makeId();
            this._store.dispatch(new fromStore.SaveAcompanhamento({processo: processo, operacaoId: operacaoId}));
        } else {
            const payload = {
                'acompanhamentoId': processo.compartilhamentoUsuario.id,
                'processoId': processo.id
            };
            this._store.dispatch(new fromStore.DeleteAcompanhamento(payload));
        }
    }

    sincronizarBarramento(processo: Processo): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SincronizaBarramento({processo: processo, operacaoId: operacaoId}));
    }

    solicitarDossies(): void {
        this._router.navigate([this.routerState.url.split('processo/' + this.processo.id)[0] + 'processo/' + this.processo.id + '/' + 'dossies']).then();
    }

    mouseEnter(trigger: MatMenuTrigger): void {
        if (this.timedOutCloser) {
            clearTimeout(this.timedOutCloser);
        }
        if (this.lastUsuarioMenuTrigger && this.lastUsuarioMenuTrigger.menu.panelId !== trigger.menu.panelId) {
            this.timedOutCloser = setTimeout(() => {
                this.lastUsuarioMenuTrigger.closeMenu();
                this.lastUsuarioMenuTrigger = trigger;
                trigger.openMenu();
            }, 1);
        } else {
            this.lastUsuarioMenuTrigger = trigger;
            trigger.openMenu();
        }
    }

    mouseLeave(trigger) {
        this.timedOutCloser = setTimeout(() => {
            trigger.closeMenu();
        }, 100);
    }
}
