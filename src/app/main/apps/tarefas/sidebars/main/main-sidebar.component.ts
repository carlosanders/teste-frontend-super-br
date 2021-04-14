import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
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
    Setor,
    Usuario,
    VinculacaoUsuario,
    Pagination,
    Lotacao,
    ModalidadeOrgaoCentral
} from '@cdk/models';
import {filter, takeUntil} from 'rxjs/operators';
import {LoginService} from 'app/main/auth/login/login.service';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {NavigationEnd, Router} from '@angular/router';
import forEach = CKEDITOR.tools.array.forEach;
import {CounterState} from "../../../../../store/reducers/counter.reducer";
import {MatSort} from '@cdk/angular/material';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {SnackBarDesfazerComponent} from '@cdk/components/snack-bar-desfazer/snack-bar-desfazer.component';

@Component({
    selector: 'tarefas-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TarefasMainSidebarComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    @Output()
    reload = new EventEmitter<any>();

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

    loading$: Observable<boolean>;
    orgaoCentralLoading$: Observable<boolean>
    unidadeLoading$: Observable<boolean>
    lotacaoLoading$: Observable<boolean>

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    pagination$: Observable<any>;
    pagination: any;

    gridFilter: any;

    listFilter = {};

    mode = 'Tarefas';

    links: any;

    routerState: any;

    generoHandle = '';
    typeHandle = '';

    orgaoCentralCoordenacao: ModalidadeOrgaoCentral[] = [];
    unidadesCoordenacao: Setor[] = [];
    setoresCoordenacao: Setor[] = [];

    usuariosAssessor: Usuario[] = [];

    @ViewChild('inputFolder') inputFolder: ElementRef;

    showAddFolder = false;

    modulo: string;
    sheetRef: MatSnackBarRef<SnackBarDesfazerComponent>;
    snackSubscription: any;

    usuariosOpen = false;
    orgaoCentralOpen = false;
    unidadeOpen = false;

    tarefasPendentes = [];
    private counterState: CounterState;

    /**
     *
     * @param _store
     * @param _changeDetectorRef
     * @param _loginService
     * @param router
     * @param _snackBar
     */
    constructor(
        private _store: Store<fromStore.TarefasAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        public _loginService: LoginService,
        private router: Router,
        private _snackBar: MatSnackBar
    ) {
        this.lotacoes$ = this._store.pipe(select(fromStore.getLotacaoList));
        this.setorLotacaoId$ = this._store.pipe(select(fromStore.getSetorId));
        this.unidadeId$ = this._store.pipe(select(fromStore.getUnidadeId));
        this.orgaoCentralId$ = this._store.pipe(select(fromStore.getOrgaoCentralId));
        this.unidades$ = this._store.pipe(select(fromStore.getUnidades));
        this.setores$ = this._store.pipe(select(fromStore.getSetores));

        this.pagination$ = this._store.pipe(select(fromStore.getPagination));

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

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            takeUntil(this._unsubscribeAll)
        ).subscribe((event: NavigationEnd) => {
            if (this.router.url && this.router.url.split('/').length >= 3) {
                this.modulo = (this.router.url.split('/')[3]);
                this.modulo = decodeURIComponent((this.modulo[0].toUpperCase() + this.modulo.substr(1).toLowerCase()));
            }
        });
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this._store
            .pipe(
                select(getCounterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(value => {
            this.counterState = value;
            this.preencherContador();
        });

        this._store
            .pipe(
                select(fromStore.getFolders),
                takeUntil(this._unsubscribeAll)
            ).subscribe(folders => {
                this.folders = folders;
                this.preencherContador();
            }
        );

        this.pagination$.subscribe(pagination => {
            this.pagination = pagination;
        });

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
                if (routerState.state.params['targetHandle'] === 'compartilhadas') {
                    this.mode = 'Compartilhadas';
                } else {
                    this.mode = 'Tarefas';
                }
                this.generoHandle = routerState.state.params['generoHandle'];
                this.typeHandle = routerState.state.params['typeHandle'];
                this.preencherContador();
            }
        });

        this.unidades$.subscribe(
            unidades => {
                this.unidades = unidades;
                this._changeDetectorRef.markForCheck();
            }
        );

        this.setores$.subscribe(
            setores => {
                this.setores = setores;
                this._changeDetectorRef.markForCheck();
            }
        );

        this.lotacoes$.subscribe(
            lotacoes => {
                this.lotacoes = lotacoes;
                this._changeDetectorRef.markForCheck();
            }
        );

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

        this.usuariosAssessor = [];
        this._loginService.getUserProfile().vinculacoesUsuariosPrincipais?.forEach((vinculacaoUsuario: VinculacaoUsuario) => {
            this.usuariosAssessor.push(vinculacaoUsuario.usuario);
        });

        if (this.router.url && this.router.url.split('/').length >= 3) {
            this.modulo = (this.router.url.split('/')[3]);
            this.modulo = decodeURIComponent((this.modulo[0].toUpperCase() + this.modulo.substr(1).toLowerCase()));
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // this._changeDetectorRef.detach();
        this._unsubscribeAll.next();
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
    }

    fechaOrgaoCentral(): void {
        this.orgaoCentralOpen = false;
    }

    listaUnidades(orgaoCentral: ModalidadeOrgaoCentral): void {
        this.orgaoCentralOpen = true;
        if (orgaoCentral.id !== this.orgaoCentralId) {
            this._store.dispatch(new fromStore.GetUnidades({
                ...this.pagination,
                filter: {
                    "modalidadeOrgaoCentral.id": "eq:" + orgaoCentral.id,
                    "id": "notIn:" + this.unidadesCoordenacao.map(setor => setor.id).join(',')
                },
                gridFilter: {
                    ...this.gridFilter
                },
                limit: this.pagination.pageSize,
                populate: ["populateAll", "setor"],
                context: this.pagination.context,
                offset: (this.pagination.pageSize * this.pagination.pageIndex),
                sort: {},
                orgaoCentralId: orgaoCentral.id
            }));
        }
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
            this._store.dispatch(new fromStore.GetSetores({
                ...this.pagination,
                filter: {
                    "unidade.id": "eq:" + unidade.id,
                    "id": "notIn:" + this.setoresCoordenacao.map(setor => setor.id).join(','),
                    "parent": 'isNotNull'
                },
                gridFilter: {
                    ...this.gridFilter
                },
                limit: this.pagination.pageSize,
                populate: ["populateAll", "unidade", "parent"],
                context: this.pagination.context,
                offset: (this.pagination.pageSize * this.pagination.pageIndex),
                sort: {},
                unidadeId: unidade.id
            }));
        }
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
            this._store.dispatch(new fromStore.GetLotacoes({
                ...this.pagination,
                filter: {
                    "setor.id": "eq:" + setor.id
                },
                gridFilter: {
                    ...this.gridFilter
                },
                limit: this.pagination.pageSize,
                populate: ["populateAll", "colaborador.usuario"],
                context: this.pagination.context,
                offset: (this.pagination.pageSize * this.pagination.pageIndex),
                sort: {},
                setorId: setor.id
            }));
        }
    }

    onDropDistribuir($event, usuario: Usuario = null): void {
        if (this.snackSubscription) {
            this.snackSubscription.unsubscribe();
            this.sheetRef.dismiss();
            this.snackSubscription = null;
        }

        this.sheetRef = this._snackBar.openFromComponent(SnackBarDesfazerComponent, {
            duration: 3000,
            panelClass: ['cdk-white-bg'],
            data: {
                icon: 'delete',
                text: 'Desistir de enviar'
            }
        });

        this.snackSubscription = this.sheetRef.afterDismissed().subscribe((data) => {
            if (data.dismissedByAction === false) {
                this._store.dispatch(new fromStore.SetSetorOnSelectedTarefas({
                    tarefa: $event[0].data, setorResponsavel: $event[1].id,
                    distribuicaoAutomatica: !usuario,
                    usuarioResponsavel: usuario? usuario.id : null
                }));
            }
        });
    }

    onDrop($event): void {
        if (this.mode === 'Tarefas') {
            this._store.dispatch(new fromStore.SetFolderOnSelectedTarefas({tarefa: $event[0].data, folder: $event[1]}));

        }
    }

    preencherContador() {
        if (this.generoHandle && this.counterState) {
            if (this.folders) {
                for (let folder of this.folders) {
                    let nomePasta = 'folder_' + this.generoHandle + '_' + folder.nome.toLowerCase();
                    if (this.counterState && this.counterState[nomePasta] !== undefined) {
                        this.tarefasPendentes[folder.nome] = this.counterState[nomePasta];
                    } else {
                        this.tarefasPendentes[folder.nome] = 0;
                    }
                }
            }
            if (this.counterState['caixa_entrada_' + this.generoHandle] !== undefined) {
                this.tarefasPendentes['caixa_entrada_' + this.generoHandle] = this.counterState['caixa_entrada_' + this.generoHandle];
            } else {
                this.tarefasPendentes['caixa_entrada_' + this.generoHandle] = 0;
            }
        }
    }

    showFolderComponent(): void {
        this.showAddFolder = true;
        setTimeout(() => { // this will make the execution after the above boolean has changed
            this.inputFolder.nativeElement.focus();
        }, 200);
    }

    addFolder(): void {
        if (this.inputFolder.nativeElement.value.length > 2) {
            const folder = new Folder();
            folder.nome = this.inputFolder.nativeElement.value;
            folder.descricao = this.inputFolder.nativeElement.value;
            folder.usuario = this._loginService.getUserProfile();
            this._store.dispatch(new fromStore.SaveFolder(folder));
            this.showAddFolder = false;
        }
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
}
