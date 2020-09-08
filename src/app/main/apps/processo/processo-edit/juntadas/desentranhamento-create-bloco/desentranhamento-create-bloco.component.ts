import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import {Desentranhamento, Juntada} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {getOperacoesState, getRouterState, getScreenState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'desentranhamento-create',
    templateUrl: './desentranhamento-create-bloco.component.html',
    styleUrls: ['./desentranhamento-create-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DesentranhamentoCreateBlocoComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    juntadas$: Observable<Juntada[]>;
    juntadas: Juntada[] = [];
    juntadasSelecionadas: Juntada[] = [];

    desentranhamento: Desentranhamento;

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    screen$: Observable<any>;

    operacoes: any[] = [];
    pagination: any;
    routerState: any;

    mobileMode = false;

    private _profile: any;

    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.DesentranhamentoCreateBlocoAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
        this.juntadas$ = this._store.pipe(select(fromStore.getJuntadaList));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._profile = _loginService.getUserProfile();
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.screen$ = this._store.pipe(select(getScreenState));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    ngOnInit(): void {
        this.juntadas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(juntadas => {
            if (juntadas !== undefined) {
                if (this.juntadas.length===0) {
                    this.juntadas = juntadas.filter(j => j.ativo);
                }
            }
        });

        this._store
            .pipe(
                select(getOperacoesState),
                takeUntil(this._unsubscribeAll),
                filter(op => !!op && !!op.content && op.type === 'desentranhamento')
            )
            .subscribe(
                operacao => {
                    this.operacoes.push(operacao);
                    this._changeDetectorRef.markForCheck();
                }
            );

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
                this.operacoes = [];
            }
        });

        this.screen$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(screen => {
            this.juntadasSelecionadas = this.juntadasSelecionadas;
            let diferencaArray = this.juntadas.filter(x => !this.juntadasSelecionadas.includes(x));
            this.juntadas = diferencaArray;
            if (screen.size !== 'desktop') {
                this.mobileMode = true;
            } else {
                this.mobileMode = false;
            }
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    submit(values): void {
        this.operacoes = [];
        this.juntadasSelecionadas.forEach(juntada => {
            const desentranhamento = new Desentranhamento();
            Object.entries(values).forEach(
                ([key, value]) => {
                    desentranhamento[key] = value;
                }
            );
            desentranhamento.juntada = juntada;
            this._store.dispatch(new fromStore.SaveDesentranhamento(desentranhamento));
        });
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetJuntadas({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
            },
            gridFilter: {
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate
        }));
    }

    juntadasAdicionadas(juntadas: Juntada[]): void {
        this.juntadasSelecionadas = juntadas;
    }
}
