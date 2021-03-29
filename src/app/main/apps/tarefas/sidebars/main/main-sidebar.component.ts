import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter, OnChanges,
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
import {Coordenador, Folder, Setor, Usuario, VinculacaoUsuario, Pagination} from '@cdk/models';
import {getRouterState} from 'app/store/reducers';
import {filter, takeUntil} from 'rxjs/operators';
import {LoginService} from 'app/main/auth/login/login.service';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {NavigationEnd, Router} from '@angular/router';
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

    loading$: Observable<boolean>;

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

    setoresCoordenacao: Setor[] = [];

    usuariosAssessor: Usuario[] = [];


    @ViewChild('inputFolder') inputFolder: ElementRef;

    showAddFolder = false;

    modulo: string;
    sheetRef: MatSnackBarRef<SnackBarDesfazerComponent>;
    snackSubscription: any;

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
        this.folders$ = this._store.pipe(select(fromStore.getFolders));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
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
            }
        });

        this.loading$ = this._store.pipe(select(fromStore.getIsLoadingFolder));

        this.setoresCoordenacao = [];
        this._loginService.getUserProfile().coordenadores.forEach((coordenador: Coordenador) => {
            if (coordenador.setor) {
                this.setoresCoordenacao.push(coordenador.setor);

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


    listaUsuario(setor): void{
        setor.numeracaoDocumentoUnidade = true;
        this._store.dispatch(new fromStore.GetLotacoes({
            ...this.pagination,
            filter: {
                "setor.id":"eq:"+setor.id
            },
            gridFilter: {
                ...this.gridFilter
            },
            limit: this.pagination.pageSize,
            populate: ["populateAll","colaborador.usuario"],
            context: this.pagination.context,
            offset: (this.pagination.pageSize * this.pagination.pageIndex),
            sort: {},
        }));
    }

    fechaUsuarioCoordenacao(setor): void {
        setor.numeracaoDocumentoUnidade = false;

    }

    onDropSetor($event): void {
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
                    this._store.dispatch(new fromStore.SetSetorOnSelectedTarefas({tarefa: $event[0].data, setorResponsavel: $event[1].id,
                                                                                distribuicaoAutomatica: true,
                                                                                usuarioResponsavel: null}));
                }
            });
    }

    onDrop($event): void {
        if (this.mode === 'Tarefas') {
                this._store.dispatch(new fromStore.SetFolderOnSelectedTarefas({tarefa: $event[0].data, folder: $event[1]}));

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
