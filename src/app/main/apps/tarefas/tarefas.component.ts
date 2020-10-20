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

import {Etiqueta, Folder, Pagination, Tarefa, Usuario} from '@cdk/models';
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
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {SnackBarDesfazerComponent} from '../../../../@cdk/components/snack-bar-desfazer/snack-bar-desfazer.component';

@Component({
    selector: 'tarefas',
    templateUrl: './tarefas.component.html',
    styleUrls: ['./tarefas.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TarefasComponent implements OnInit, OnDestroy, AfterViewInit {

    private _unsubscribeAll: Subject<any> = new Subject();

    routerState: any;

    searchInput: FormControl;

    folders$: Observable<Folder[]>;
    currentTarefaId: number;
    tarefas: Tarefa[] = [];

    tarefaListSize = 30;
    tarefaListOriginalSize: number;

    tarefas$: Observable<Tarefa[]>;

    loading$: Observable<boolean>;

    deletingIds$: Observable<number[]>;
    deletedIds$: Observable<number[]>;

    error$: Observable<any>;
    errorDelete$: Observable<any>;

    selectedIds$: Observable<number[]>;
    selectedIds: number[] = [];

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

    vinculacaoEtiquetaPagination: Pagination;

    private _profile: Usuario;

    mobileMode = false;

    loadingAssuntosProcessosId$: Observable<number[]>;

    cienciaIds$: Observable<number[]>;

    PesquisaTarefa: string;

    changingFolderIds$: Observable<number[]>;

    @ViewChild('tarefaListElement', {read: ElementRef, static: true}) tarefaListElement: ElementRef;

    routeAtividade = 'atividades/criar';
    routeAtividadeBloco = 'atividade-bloco';
    novaTarefa = false;

    sheetRef: MatSnackBarRef<SnackBarDesfazerComponent>;
    snackSubscription: any;

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _cdkTranslationLoaderService
     * @param _tarefaService
     * @param _router
     * @param _store
     * @param _loginService
     * @param _dynamicService
     * @param _snackBar
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
        private _snackBar: MatSnackBar
    ) {
        // Set the defaults
        this.searchInput = new FormControl('');
        this._cdkTranslationLoaderService.loadTranslations(english);
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.tarefas$ = this._store.pipe(select(fromStore.getTarefas));
        this.error$ = this._store.pipe(select(fromStore.getError));
        this.errorDelete$ = this._store.pipe(select(fromStore.getErrorDelete));

        this.folders$ = this._store.pipe(select(fromStore.getFolders));
        this.selectedTarefas$ = this._store.pipe(select(fromStore.getSelectedTarefas));
        this.selectedIds$ = this._store.pipe(select(fromStore.getSelectedTarefaIds));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.routerState$ = this._store.pipe(select(getRouterState));
        this.maximizado$ = this._store.pipe(select(fromStore.getMaximizado));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingTarefaIds));
        this.changingFolderIds$ = this._store.pipe(select(fromStore.getChangingFolderTarefaIds));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedTarefaIds));
        this.screen$ = this._store.pipe(select(getScreenState));
        this._profile = _loginService.getUserProfile();
        this.vinculacaoEtiquetaPagination = new Pagination();
        this.vinculacaoEtiquetaPagination.filter = {
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
                    'vinculacoesEtiquetas.modalidadeOrgaoCentral.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.modalidadeOrgaoCentral.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:TAREFA'
                },
                {
                    'sistema': 'eq:true',
                    'modalidadeEtiqueta.valor': 'eq:TAREFA'
                }
            ]
        };

        this.loadingAssuntosProcessosId$ = this._store.pipe(select(fromStore.getIsAssuntoLoading));
        this.cienciaIds$ = this._store.pipe(select(fromStore.getCienciaTarefaIds));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.novaTarefa = false;

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this._store
            .pipe(
                select(getMercureState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(message => {
            if (message && message.type === 'nova_tarefa') {
                if (message.content.genero === this.routerState.params.generoHandle) {
                    this.novaTarefa = true;
                }
            }
        });

        this.routerState$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(routerState => {
            this.currentTarefaId = parseInt(routerState.state.params['tarefaHandle'], 0);
        });

        this.tarefas$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(tarefas => !!tarefas)
        ).subscribe(tarefas => {
            this.tarefas = tarefas;
        });

        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(pagination => {
            this.pagination = pagination;
        });

        this.maximizado$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(maximizado => {
            this.maximizado = maximizado;
        });

        this.selectedTarefas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(selectedTarefas => {
            this.selectedTarefas = selectedTarefas;
        });

        this.selectedIds$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(selectedIds => {
            this.selectedIds = selectedIds;
        });

        this.screen$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(screen => {
            if (screen.size !== 'desktop') {
                this.mobileMode = true;
                if (this.maximizado) {
                    this._store.dispatch(new ToggleMaximizado());
                }
            } else {
                this.mobileMode = false;
            }
        });

        this.PesquisaTarefa = 'tarefa';
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

    proccessEtiquetaFilter(): any {
        this._store.dispatch(new fromStore.UnloadTarefas({reset: false}));
        const etiquetasId = [];
        this.etiquetas.forEach((e) => {
            etiquetasId.push(e.id);
        });
        const etiquetaFilter = {
            'vinculacoesEtiquetas.etiqueta.id': `in:${etiquetasId.join(',')}`
        };
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

        const nparams = {
            ...this.pagination,
            offset: this.pagination.offset + this.pagination.limit
        };

        this._store.dispatch(new fromStore.GetTarefas(nparams));
    }

    setCurrentTarefa(tarefa: Tarefa): void {
        if (!tarefa.dataHoraLeitura) {
            this._store.dispatch(new fromStore.ToggleLidaTarefa(tarefa));
        }
        this._store.dispatch(new fromStore.SetCurrentTarefa({
            tarefaId: tarefa.id,
            processoId: tarefa.processo.id,
            acessoNegado: tarefa.processo.acessoNegado
        }));
    }

    deleteTarefa(tarefaId: number): void {
        this._store.dispatch(new fromStore.DeleteTarefa(tarefaId));

        if (this.snackSubscription) {
            // temos um snack aberto, temos que ignorar
            this.snackSubscription.unsubscribe();
            this.sheetRef.dismiss();
            this.snackSubscription = null;
        }

        this.sheetRef = this._snackBar.openFromComponent(SnackBarDesfazerComponent, {
            duration: 3000,
            panelClass: ['fuse-white-bg'],
            data: {
                icon: 'delete',
                text: 'Deletado(a)'
            }
        });

        this.snackSubscription = this.sheetRef.afterDismissed().subscribe((data) => {
            if (data.dismissedByAction === true) {
                this._store.dispatch(new fromStore.DeleteTarefaCancel());
            } else {
                this._store.dispatch(new fromStore.DeleteTarefaFlush());
            }
        });
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

    setFolderOnSelectedTarefas(folder): void {
        this.selectedTarefas.forEach((tarefa) => {
            this._store.dispatch(new fromStore.SetFolderOnSelectedTarefas({tarefa: tarefa, folder: folder}));
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
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/tarefa/' + tarefaId + '/oficio']).then();
    }

    doCreateTarefa(params): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/criar/' + params.processoId]).then();
    }

    doMovimentar(tarefaId): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/tarefa/' + tarefaId + '/' + this.routeAtividade]).then();
    }

    doEditTarefa(tarefaId): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/tarefa/' + tarefaId + '/editar']).then();
    }

    doRedistribuirTarefa(tarefaId): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/tarefa/' + tarefaId + '/redistribuicao']).then();
    }

    doCienciaTarefa(tarefaId): void {
        const tarefa = new Tarefa();
        tarefa.id = tarefaId;
        this._store.dispatch(new fromStore.DarCienciaTarefa(tarefa));
    }

    doRemoveTarefa(tarefa: Tarefa): void {
        this._store.dispatch(new fromStore.RemoveTarefa(tarefa));
    }

    doCompartilhar(tarefaId): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/tarefa/' + tarefaId + '/compartilhamentos/listar']).then();
    }

    doCompartilharBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/compartilhamento-bloco']).then();
    }

    doEtiquetarBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/vinculacao-etiqueta-bloco']).then();
    }

    doMovimentarBloco(): void {
        // tslint:disable-next-line:max-line-length
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/' + this.routeAtividadeBloco]).then();
    }

    doEditTarefaBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/tarefa-edit-bloco']).then();
    }

    doRedistribuiTarefaBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/redistribuicao-edit-bloco']).then();
    }

    doCienciaBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/redistribuicao-edit-bloco']).then();
    }

    doCreateTarefaBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/tarefa-bloco']).then();
    }

    doUploadBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/upload-bloco']).then();
    }

    doEditorBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/modelo-bloco']).then();
    }

    doCreateDocumentoAvulsoBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/documento-avulso-bloco']).then();
    }

    /*
    * Função que carrega os assuntos do processo associado à tarefa
    * @tarefa
    * Recebe a referencia da tarefa carregada no componente de lista de tarefas
    */
    doLoadAssuntos(processoId): void {

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

}
