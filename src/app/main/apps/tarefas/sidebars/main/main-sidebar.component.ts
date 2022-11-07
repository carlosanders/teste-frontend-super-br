import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';

import * as fromStore from 'app/main/apps/tarefas/store';
import {getCounterState, getRouterState} from 'app/store/reducers';
import {
    Coordenador,
    Folder,
    Lotacao,
    ModalidadeOrgaoCentral,
    Setor,
    Tarefa,
    Usuario,
    VinculacaoUsuario
} from '@cdk/models';
import {distinctUntilChanged, filter, takeUntil} from 'rxjs/operators';
import {LoginService} from 'app/main/auth/login/login.service';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {Router} from '@angular/router';
import {CounterState} from '../../../../../store/reducers/counter.reducer';
import {MatSort} from '@cdk/angular/material';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {SnackBarDesfazerComponent} from '@cdk/components/snack-bar-desfazer/snack-bar-desfazer.component';
import {CdkUtils} from '@cdk/utils';
import {DndDropEvent} from 'ngx-drag-drop';
import {navigationConverter} from '../../../../../navigation/navigation';
import {FormControl} from '@angular/forms';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {
    ViewMode
} from '@cdk/components/tarefa/cdk-tarefa-list/cdk-tarefa-list.service';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';

@Component({
    selector: 'tarefas-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TarefasMainSidebarComponent implements OnInit, OnDestroy {

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    changeViewMode: EventEmitter<ViewMode> = new EventEmitter<ViewMode>();

    @Input()
    viewMode: ViewMode;

    @Input()
    buscarTodas: boolean = false;

    @Input()
    doLimpaFiltros: Subject<boolean> = new Subject<boolean>();

    @Output()
    limparBuscaTodos: EventEmitter<any> = new EventEmitter<any>();

    @Input()
    draggingIds: number[];

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @ViewChild('inputFolder') inputFolder: ElementRef;

    folders$: Observable<Folder[]>;
    folders: Folder[];
    lotacoes$: Observable<Lotacao[]>;
    lotacoes: Lotacao[] = [];
    setorLotacaoId$: Observable<number>;
    setorLotacaoId: number = null;
    setores$: Observable<Setor[]>;
    setores: Setor[] = [];
    unidadeId$: Observable<number>;
    unidadeId: number = null;
    unidades$: Observable<Setor[]>;
    unidades: Setor[] = [];
    orgaoCentralId$: Observable<number>;
    orgaoCentralId: number = null;
    coordenacaoMenuOpen: boolean = false;
    assessoriaMenuOpen: boolean = false;
    distribuicaoMenuOpen: boolean = false;
    filtrosMenuOpen: boolean = false;

    setoresDistribuidor: Setor[] = [];

    errors$: Observable<any>;
    error = '';

    loading$: Observable<boolean>;
    orgaoCentralLoading$: Observable<boolean>;
    unidadeLoading$: Observable<boolean>;
    lotacaoLoading$: Observable<boolean>;

    pagination$: Observable<any>;
    pagination: any;
    paginationLotacoes$: Observable<any>;
    paginationLotacoes: any;
    paginationSetores$: Observable<any>;
    paginationSetores: any;
    paginationUnidades$: Observable<any>;
    paginationUnidades: any;

    gridFilter: any;

    listFilter = {};

    mode = 'Tarefas';

    links: any;

    routerState: any;

    generoHandle = '';
    generoHandleAcentuado = '';
    typeHandle = '';

    orgaoCentralCoordenacao: ModalidadeOrgaoCentral[] = [];
    unidadesCoordenacao: Setor[] = [];
    setoresCoordenacao: Setor[] = [];

    usuariosAssessor: Usuario[] = [];

    showAddFolder = false;
    newFolderCtrl: FormControl = new FormControl();
    isSavingFolder$: Observable<boolean>;

    modulo: string;
    sheetRef: MatSnackBarRef<SnackBarDesfazerComponent>;
    snackSubscription: any;
    snackSubscriptionType: string;

    usuariosOpen = false;
    orgaoCentralOpen = false;
    unidadeOpen = false;

    tarefasPendentes = [];

    placeholderId = null;

    selectedTarefas: Tarefa[] = [];

    loaded: any;
    isXSmallScreen: boolean = false;

    private counterState: CounterState;
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        private _store: Store<fromStore.TarefasAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        public _loginService: LoginService,
        private router: Router,
        private _snackBar: MatSnackBar,
        private _cdkSidebarService: CdkSidebarService,
        private _breakpointObserver: BreakpointObserver
    ) {
        this.folders$ = this._store.pipe(select(fromStore.getFolders));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.lotacoes$ = this._store.pipe(select(fromStore.getLotacaoList));
        this.setorLotacaoId$ = this._store.pipe(select(fromStore.getSetorId));
        this.unidadeId$ = this._store.pipe(select(fromStore.getUnidadeId));
        this.orgaoCentralId$ = this._store.pipe(select(fromStore.getOrgaoCentralId));
        this.unidades$ = this._store.pipe(select(fromStore.getUnidades));
        this.setores$ = this._store.pipe(select(fromStore.getSetores));
        this.isSavingFolder$ = this._store.pipe(select(fromStore.getIsSaving));

        this._store.pipe(select(fromStore.getTarefasLoaded)).subscribe((loaded) => {
            this.loaded = loaded;
        });

        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.paginationUnidades$ = this._store.pipe(select(fromStore.getPaginationUnidades));
        this.paginationSetores$ = this._store.pipe(select(fromStore.getPaginationSetores));
        this.paginationLotacoes$ = this._store.pipe(select(fromStore.getPaginationLotacao));

        this.setorLotacaoId$.pipe(filter(setorId => !!setorId)).subscribe(id => this.setorLotacaoId = id);
        this.unidadeId$.pipe(filter(setorId => !!setorId)).subscribe(id => this.unidadeId = id);
        this.orgaoCentralId$.pipe(filter(id => !!id)).subscribe(id => this.orgaoCentralId = id);

        this.loading$ = this._store.pipe(select(fromStore.getIsLoadingFolder));
        this.lotacaoLoading$ = this._store.pipe(select(fromStore.getLotacaoIsLoading));
        this.unidadeLoading$ = this._store.pipe(select(fromStore.getUnidadeIsLoading));
        this.orgaoCentralLoading$ = this._store.pipe(select(fromStore.getOrgaoCentralIsLoading));

        this.gridFilter = {};
        const path = 'app/main/apps/tarefas/sidebars/main';

        modulesConfig.forEach((module) => {
            if (module.sidebars.hasOwnProperty(path)) {
                module.sidebars[path].forEach((s => this.links.push(s)));
            }
        });

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
            if (routerState.state.params['targetHandle'] === 'compartilhadas') {
                this.mode = 'Compartilhadas';
            } else {
                this.mode = 'Tarefas';
            }
            this.generoHandle = routerState.state.params['generoHandle'];
            this.generoHandleAcentuado = this.generoHandle;
            if (navigationConverter.hasOwnProperty(this.routerState.params['generoHandle'])) {
                this.generoHandleAcentuado = navigationConverter[this.routerState.params['generoHandle']];
            }

            this.typeHandle = routerState.state.params['typeHandle'];
            this.preencherContador();
        });


        this._breakpointObserver
            .observe([Breakpoints.XSmall])
            .pipe(
                takeUntil(this._unsubscribeAll),
                distinctUntilChanged()
            )
            .subscribe((state: BreakpointState) => this.isXSmallScreen = state.matches);
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this._store.pipe(
            select(getCounterState),
            takeUntil(this._unsubscribeAll),
            distinctUntilChanged(counterState => counterState !== this.counterState)
        ).subscribe((value) => {
            this.counterState = value;
            this.preencherContador();
        });

        this.isSavingFolder$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((saving) => {
            this.showAddFolder = saving;
            if (!saving) {
                this.newFolderCtrl.setValue('');
            }
        });

        this._store.pipe(
            select(fromStore.getFolders),
            takeUntil(this._unsubscribeAll),
            filter(folders => folders?.length !== this.folders?.length)
        ).subscribe((folders) => {
            this.folders = folders;
            this.preencherContador();
        });

        this._store.pipe(
            select(fromStore.getSelectedTarefas),
            takeUntil(this._unsubscribeAll)
        ).subscribe((tarefas) => {
            this.selectedTarefas = tarefas;
        });

        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            this.pagination = pagination;
        });

        this.paginationUnidades$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            this.paginationUnidades = pagination;
        });

        this.paginationSetores$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            this.paginationSetores = pagination;
        });

        this.paginationLotacoes$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            this.paginationLotacoes = pagination;
        });

        this.unidades$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((unidades) => {
            this.unidades = unidades;
            this._changeDetectorRef.markForCheck();
        });

        this.errors$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((errors) => {
            this.error = '';
            if (errors && errors.status && (errors.status === 400 || errors.status === 422)) {
                try {
                    const data = JSON.parse(errors.error.message);
                    const fields = Object.keys(data || {});
                    fields.forEach((field) => {
                        this.error += data[field].join(' - ');
                    });
                } catch (e) {
                    this.error = errors.error.message;
                }
            }

            this._changeDetectorRef.markForCheck();
        });

        this.setores$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((setores) => {
            this.setores = setores;
            this._changeDetectorRef.markForCheck();
        });

        this.lotacoes$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((lotacoes) => {
            this.lotacoes = lotacoes;
            this._changeDetectorRef.markForCheck();
        });

        this._loginService.getUserProfile().coordenadores.forEach((coordenador: Coordenador) => {
            if (coordenador.setor) {
                this.setoresCoordenacao.push(coordenador.setor);
            }
            if (coordenador.unidade) {
                this.unidadesCoordenacao.push(coordenador.unidade);
            }
            if (coordenador.orgaoCentral) {
                this.orgaoCentralCoordenacao.push(coordenador.orgaoCentral);
            }
        });

        this._loginService.getUserProfile().colaborador.lotacoes.forEach((lotacao: Lotacao) => {
            if (lotacao.distribuidor) {
                const hasSetor = this.setoresCoordenacao.findIndex(setor => setor.id === lotacao.setor.id);
                const hasUnidade = this.unidadesCoordenacao.findIndex(unidade => unidade.id === lotacao.setor.unidade.id);
                const hasOrgao = this.orgaoCentralCoordenacao
                    .findIndex(orgaoCentral => orgaoCentral.id === lotacao.setor.unidade.modalidadeOrgaoCentral.id);
                if (hasSetor === -1 && hasUnidade === -1 && hasOrgao === -1) {
                    this.setoresDistribuidor.push(lotacao.setor);
                }
            }
        });

        this.usuariosAssessor = [];
        this._loginService.getUserProfile().vinculacoesUsuariosPrincipais?.forEach((vinculacaoUsuario: VinculacaoUsuario) => {
            this.usuariosAssessor.push(vinculacaoUsuario.usuario);
        });

        if (this.router.url && this.router.url.split('/').length >= 3) {
            this.modulo = (this.router.url.split('/')[3]);
            this.modulo = decodeURIComponent((this.modulo[0].toUpperCase() + this.modulo.substr(1).toLowerCase()));
        }

        this.newFolderCtrl.valueChanges.pipe(
            takeUntil(this._unsubscribeAll),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 2),
        ).subscribe(() => {
            this.error = '';
        });

        if (this.routerState.params['targetHandle'] === 'meus-compartilhamentos') {
            this.filtrosMenuOpen = true;
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // this._changeDetectorRef.detach();
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Compose dialog
     */
    create(): void {
        this._store.dispatch(new fromStore.CreateTarefa());
        this.fecharSidebar();
    }

    fechaOrgaoCentral(): void {
        this.orgaoCentralOpen = false;
    }

    listaUnidades(orgaoCentral: ModalidadeOrgaoCentral): void {
        this.orgaoCentralOpen = true;
        if (orgaoCentral.id !== this.orgaoCentralId) {
            this._store.dispatch(new fromStore.UnloadUnidades());
            this._store.dispatch(new fromStore.GetUnidades({
                ...this.paginationUnidades,
                filter: {
                    'modalidadeOrgaoCentral.id': 'eq:' + orgaoCentral.id,
                    'id': 'notIn:' + this.unidadesCoordenacao.map(setor => setor.id).join(',')
                },
                limit: this.paginationUnidades.limit,
                populate: ['populateAll', 'setor'],
                context: this.paginationUnidades.context,
                offset: 0,
                sort: {},
                orgaoCentralId: orgaoCentral.id
            }));
        }
    }

    paginaUnidades(): void {
        if (this.unidades.length >= this.paginationUnidades.total) {
            return;
        }

        const nparams = {
            ...this.paginationUnidades,
            orgaoCentralId: this.orgaoCentralId,
            offset: this.paginationUnidades.offset + this.paginationUnidades.limit
        };

        this._store.dispatch(new fromStore.GetUnidades(nparams));
    }

    fechaUnidade(): void {
        this.unidadeOpen = false;
    }

    listaSetores(unidade: Setor, closeOthers = false): void {
        this.unidadeOpen = true;
        if (closeOthers) {
            this.orgaoCentralOpen = false;
        }
        if (unidade.id !== this.unidadeId) {
            const filtros: any = {
                'unidade.id': 'eq:' + unidade.id,
                'parent': 'isNotNull'
            };
            if (this.setoresCoordenacao.length) {
                filtros.id = 'notIn:' + this.setoresCoordenacao.map(setor => setor.id).join(',');
            }

            this._store.dispatch(new fromStore.UnloadSetores());
            this._store.dispatch(new fromStore.GetSetores({
                ...this.paginationSetores,
                filter: {
                    ...filtros
                },
                limit: this.paginationSetores.limit,
                populate: ['populateAll', 'unidade', 'parent'],
                context: this.paginationSetores.context,
                offset: 0,
                sort: {},
                unidadeId: unidade.id
            }));
        }
    }

    paginaSetores(): void {
        if (this.setores.length >= this.paginationSetores.total) {
            return;
        }

        const nparams = {
            ...this.paginationSetores,
            unidadeId: this.unidadeId,
            offset: this.paginationSetores.offset + this.paginationSetores.limit
        };

        this._store.dispatch(new fromStore.GetSetores(nparams));
    }

    fechaUsuarios(): void {
        this.usuariosOpen = false;
    }

    listaUsuario(setor: Setor, closeOthers = false): void {
        this.usuariosOpen = true;
        if (closeOthers) {
            this.unidadeOpen = false;
            this.orgaoCentralOpen = false;
        }
        if (setor.id !== this.setorLotacaoId) {
            this._store.dispatch(new fromStore.UnloadLotacoes());
            this._store.dispatch(new fromStore.GetLotacoes({
                ...this.paginationLotacoes,
                filter: {
                    'setor.id': 'eq:' + setor.id
                },
                limit: this.paginationLotacoes.limit,
                populate: ['populateAll', 'colaborador.usuario'],
                context: {'semAfastamento': true},
                offset: 0,
                sort: {},
                setorId: setor.id
            }));
        }
    }

    paginaUsuarios(): void {
        if (this.lotacoes.length >= this.paginationLotacoes.total) {
            return;
        }

        const nparams = {
            ...this.paginationLotacoes,
            setorId: this.setorLotacaoId,
            offset: this.paginationLotacoes.offset + this.paginationLotacoes.limit
        };

        this._store.dispatch(new fromStore.GetLotacoes(nparams));
    }

    onDropDistribuir($event, usuario: Usuario = null, enabled = true): void {
        if (enabled) {
            const setor = $event[1].id;
            const usuarioId = usuario ? usuario.id : null;
            if (this.selectedTarefas.length > 1) {
                const lote = CdkUtils.makeId();
                this.selectedTarefas.forEach((tarefa) => {
                    this.doDistribuir(tarefa, setor, usuarioId, lote);
                });
            } else {
                const tarefa = $event[0].data;
                this.doDistribuir(tarefa, setor, usuarioId);
            }
        }
        this.placeholderId = null;
        this._store.dispatch(new fromStore.ChangeDraggedTarefas([]));
    }

    doDistribuir(tarefa: Tarefa, setor: number, usuario: number, loteId: string = ''): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DistribuirTarefas({
            tarefa: tarefa,
            setorResponsavel: setor,
            distribuicaoAutomatica: !usuario,
            usuarioResponsavel: usuario,
            operacaoId: operacaoId,
            loteId: loteId,
            redo: [
                new fromStore.DistribuirTarefas({
                    tarefa: tarefa,
                    setorResponsavel: setor,
                    distribuicaoAutomatica: !usuario,
                    usuarioResponsavel: usuario,
                    operacaoId: operacaoId,
                    loteId: loteId,
                    redo: 'inherent',
                    undo: 'inherent'
                    // redo e undo são herdados da ação original
                }),
                new fromStore.DistribuirTarefasFlush()
            ],
            undo: null
        }));

        if (this.snackSubscription) {
            if (this.snackSubscriptionType === 'distribuir') {
                // temos um snack de distribuição aberto, temos que ignorar
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
                text: 'Distribuindo'
            }
        });

        this.snackSubscriptionType = 'distribuir';
        this.snackSubscription = this.sheetRef.afterDismissed().subscribe((data) => {
            if (data.dismissedByAction === true) {
                this._store.dispatch(new fromStore.DistribuirTarefasCancel());
            } else {
                this._store.dispatch(new fromStore.DistribuirTarefasFlush());
            }
            this.snackSubscription.unsubscribe();
            this.snackSubscriptionType = null;
            this.snackSubscription = null;
        });
    }

    onDrop($event, enabled: boolean): void {
        if (enabled) {
            if (this.mode === 'Tarefas') {
                if (this.routerState.params['targetHandle'] !== 'lixeira') {
                    if (this.selectedTarefas.length > 1) {
                        const loteId = CdkUtils.makeId();
                        this._store.dispatch(new fromStore.SetFolderOnSelectedTarefasStart(this.selectedTarefas.map(tarefa => tarefa.id)));
                        this.selectedTarefas.forEach((tarefa) => {
                            const operacaoId = CdkUtils.makeId();
                            this._store.dispatch(new fromStore.SetFolderOnSelectedTarefas({
                                tarefa: tarefa,
                                folder: $event[1],
                                operacaoId: operacaoId,
                                loteId: loteId
                            }));
                        });
                    } else {
                        const operacaoId = CdkUtils.makeId();
                        this._store.dispatch(new fromStore.SetFolderOnSelectedTarefasStart([$event[0].data.id]));
                        this._store.dispatch(new fromStore.SetFolderOnSelectedTarefas({
                            tarefa: $event[0].data,
                            folder: $event[1],
                            operacaoId: operacaoId
                        }));
                    }
                } else {
                    // Restaurando tarefas da lixeira
                    if (this.selectedTarefas.length > 1) {
                        this.selectedTarefas.forEach((tarefa) => {
                            this.doRestauraTarefa(tarefa, $event[1]);
                        });
                    } else {
                        this.doRestauraTarefa($event[0].data, $event[1]);
                    }
                }
            }
        }
        this.placeholderId = null;
        this._store.dispatch(new fromStore.ChangeDraggedTarefas([]));
    }

    onDropDelete($event, enabled: boolean): void {
        if (enabled) {
            if (this.mode === 'Tarefas') {
                if (this.selectedTarefas.length > 1) {
                    const lote = CdkUtils.makeId();
                    this.selectedTarefas.forEach((tarefa) => {
                        this.deleteTarefa(tarefa, lote);
                    });
                } else {
                    this.deleteTarefa($event.data);
                }
            }
        }
        this.placeholderId = null;
        this._store.dispatch(new fromStore.ChangeDraggedTarefas([]));
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
                text: 'Deletado(s)'
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

    doRestauraTarefa(tarefa: Tarefa, folder: Folder): void {
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

    preencherContador(): void {
        if (this.generoHandle && this.counterState) {
            if (this.folders) {
                for (const folder of this.folders) {
                    const nomePasta = 'folder_' + this.generoHandleAcentuado + '_' + folder.nome.toLowerCase();
                    if (this.counterState && this.counterState[nomePasta] !== undefined) {
                        this.tarefasPendentes[folder.nome] = this.counterState[nomePasta];
                    } else {
                        this.tarefasPendentes[folder.nome] = 0;
                    }
                }
            }

            if (this.counterState['caixa_entrada_' + this.generoHandleAcentuado] !== undefined) {
                this.tarefasPendentes['caixa_entrada_' + this.generoHandleAcentuado] = this.counterState['caixa_entrada_' + this.generoHandleAcentuado];
            } else {
                this.tarefasPendentes['caixa_entrada_' + this.generoHandleAcentuado] = 0;
            }

            if (this.counterState['lixeira_' + this.generoHandleAcentuado] !== undefined) {
                this.tarefasPendentes['lixeira_' + this.generoHandleAcentuado] = this.counterState['lixeira_' + this.generoHandleAcentuado];
            } else {
                this.tarefasPendentes['lixeira_' + this.generoHandleAcentuado] = 0;
            }

            if (this.counterState['tarefas_compartilhadas_' + this.generoHandleAcentuado] !== undefined) {
                this.tarefasPendentes['tarefas_compartilhadas_' + this.generoHandleAcentuado] = this.counterState['tarefas_compartilhadas_' + this.generoHandleAcentuado];
            } else {
                this.tarefasPendentes['tarefas_compartilhadas_' + this.generoHandleAcentuado] = 0;
            }
        }
        this._changeDetectorRef.markForCheck();
    }

    showFolderComponent(): void {
        this.showAddFolder = true;
        setTimeout(() => { // this will make the execution after the above boolean has changed
            this.inputFolder.nativeElement.focus();
        }, 500);
    }

    addFolder(): void {
        if (this.inputFolder.nativeElement.value.length > 2) {
            const folder = new Folder();
            folder.nome = this.newFolderCtrl.value;
            folder.descricao = this.newFolderCtrl.value;
            folder.usuario = this._loginService.getUserProfile();
            this._store.dispatch(new fromStore.SaveFolder(folder));
        }
    }

    cancelAddFolder(): void {
        this.showAddFolder = false;
        this.newFolderCtrl.setValue('', {emitEvent: false});
        this.error = '';
    }

    delFolder(folder: Folder): void {
        this._store.dispatch(new fromStore.DeleteFolder(folder.id));
        setTimeout(() => {
            this.reloadTarefa();
        }, 3000);
    }

    reloadTarefa(): void {
        const tarefaFilter = {
            'listFilter: {usuarioResponsavel.id': 'eq:' + this._loginService.getUserProfile().id,
            'dataHoraConclusaoPrazo': 'isNull',
            'especieTarefa.generoTarefa.nome': 'eq:' + 'ADMINISTRATIVO}'
        };
        const params = {listFilter: tarefaFilter};
        this.reload.emit({params});
    }

    dragOver($event: DragEvent, element: HTMLElement, enabled: boolean): void {
        if (enabled && this.placeholderId !== element.id) {
            this.placeholderId = element.id;
            const elementClass = element.getAttribute('class').replace('custom-drag-over-disabled', '');
            element.setAttribute('class', elementClass + ' custom-drag-over');
            this._changeDetectorRef.detectChanges();
        }
        if (!enabled && element.getAttribute('class').indexOf('custom-drag-over-disabled') === -1) {
            this.placeholderId = null;
            element.setAttribute('class', element.getAttribute('class') + ' custom-drag-over-disabled');
            this._changeDetectorRef.detectChanges();
        }
    }

    /**
     * Issue-176
     * Verifica se é permitido arrastar tarefas e soltar nas pastas
     * Caso esteja listando tarefas que não sejam minhas, desabilitar
     */
    dropzoneEnabledFolders(folder: any = 'entrada'): boolean {
        return this.routerState.params['typeHandle'] === 'minhas-tarefas' && this.routerState.params['targetHandle'] !== folder && this.draggingIds.length > 0;
    }

    /**
     * Issue-176
     * Verifica se é permitido arrastar tarefas para um determinado setor
     * Caso a tarefa já esteja no setor, não permitir
     */
    dropzoneEnabledSetor(event: DragEvent, setor: Setor): boolean {
        if (!this.draggingIds.length) {
            return false;
        }
        if (this.routerState.params['typeHandle'] === 'minhas-tarefas' && this.routerState.params['targetHandle'] === 'lixeira') {
            // restauração de tarefas excluídas não pode ser para usuário/setor
            return false;
        }
        if (this.selectedTarefas.length > 1) {
            return true;
        }
        const dataTarefa = JSON.parse(event.dataTransfer.types[0]);
        return !(dataTarefa.setor === setor.id && dataTarefa.distribuicao);
    }

    /**
     * Issue-176
     * Verifica se é permitido soltar tarefas em um determinado setor
     *
     * @param event: DndDropEvent
     * @param setor: Setor
     */
    dropEnabledSetor(event: DndDropEvent, setor: Setor): boolean {
        if (!this.draggingIds.length) {
            return false;
        }
        if (this.routerState.params['typeHandle'] === 'minhas-tarefas' && this.routerState.params['targetHandle'] === 'lixeira') {
            // restauração de tarefas excluídas não pode ser para usuário/setor
            return false;
        }
        if (this.selectedTarefas.length > 1) {
            return true;
        }
        const tarefa = event.data;
        // eslint-disable-next-line eqeqeq
        return !(tarefa.setorResponsavel.id == setor.id && tarefa.distribuicaoAutomatica);
    }

    /**
     * Issue-176
     * Verifica se é permitido arrastar tarefas sobre um usuário específico
     * Caso o usuário esteja indisponível, retorna falso
     */
    dropzoneEnabledUsuario(event: DragEvent, usuario: Usuario): boolean {
        if (!this.draggingIds.length) {
            return false;
        }
        if (this.routerState.params['typeHandle'] === 'minhas-tarefas' && this.routerState.params['targetHandle'] === 'lixeira') {
            // restauração de tarefas excluídas não pode ser para usuário/setor
            return false;
        }
        if (this.selectedTarefas.length > 1) {
            return usuario.isDisponivel;
        }
        const dataTarefa = JSON.parse(event.dataTransfer.types[0]);
        // eslint-disable-next-line eqeqeq
        return usuario.isDisponivel && dataTarefa.usuario != usuario.id;
    }

    /**
     * Issue-176
     * Verifica se é permitido arrastar tarefas e soltar em um usuário específico
     * Caso o usuário esteja indisponível, desabilitar o drop nele
     */
    dropEnabledUsuario(event: DndDropEvent, usuario: Usuario): boolean {
        if (!this.draggingIds.length) {
            return false;
        }
        if (this.routerState.params['typeHandle'] === 'minhas-tarefas' && this.routerState.params['targetHandle'] === 'lixeira') {
            // restauração de tarefas excluídas não pode ser para usuário/setor
            return false;
        }
        if (this.selectedTarefas.length > 1) {
            return usuario.isDisponivel;
        }
        const tarefa = event.data;
        return usuario.isDisponivel && tarefa.usuarioResponsavel.id !== usuario.id;
    }

    fecharSidebar(link = null): void {
        if (link && this.buscarTodas === true && link == this.routerState.params['targetHandle']) {
            this.doLimpaFiltros.next(true);
            this.changeViewMode.emit(this.viewMode);
        }
        if (!this._cdkSidebarService.getSidebar('tarefas-main-sidebar').isLockedOpen) {
            this._cdkSidebarService.getSidebar('tarefas-main-sidebar').close();
        }
    }

    doToogleViewMode(): void {
        this.changeViewMode.emit(this.viewMode == 'list' ? 'grid' : 'list');
        this.router.navigate(['/apps/tarefas/' + this.generoHandle + '/' + this.typeHandle + '/' + this.routerState.params['targetHandle']], {state: {'viewMode': this.viewMode == 'list' ? 'grid' : 'list'}}).then();
    }

    isLinkActive(link): boolean {
        if (this.buscarTodas === true) {
            return false;
        }
        return link == this.routerState.params['targetHandle'];
    }
}
