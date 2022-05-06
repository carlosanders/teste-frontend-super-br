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
import {Desentranhamento, Juntada, Pagination} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {getRouterState, getScreenState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkUtils} from '@cdk/utils';
import {SnackBarDesfazerComponent} from '@cdk/components/snack-bar-desfazer/snack-bar-desfazer.component';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
    selector: 'desentranhamento-create',
    templateUrl: './desentranhamento-create-bloco.component.html',
    styleUrls: ['./desentranhamento-create-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DesentranhamentoCreateBlocoComponent implements OnInit, OnDestroy {

    juntadas$: Observable<Juntada[]>;
    juntadasSelecionadas$: Observable<Juntada[]>;
    juntadas: Juntada[] = [];
    juntadasSelecionadas: Juntada[] = [];

    juntadasBloco: Juntada[] = [];

    desentranhamento: Desentranhamento;

    processoDestinoPagination: Pagination;

    errors$: Observable<any>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    screen$: Observable<any>;

    pagination: any;
    routerState: any;

    mobileMode = false;

    sheetRef: MatSnackBarRef<SnackBarDesfazerComponent>;
    snackSubscription: any;
    private _profile: any;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     * @param _snackBar
     */
    constructor(
        private _store: Store<fromStore.DesentranhamentoCreateBlocoAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _snackBar: MatSnackBar
    ) {
        this.juntadas$ = this._store.pipe(select(fromStore.getJuntadaList));
        this.juntadasSelecionadas$ = this._store.pipe(select(fromStore.getSelectedJuntadas));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._profile = _loginService.getUserProfile();
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.screen$ = this._store.pipe(select(getScreenState));
        this.processoDestinoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    ngOnInit(): void {
        this.juntadas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((juntadas) => {
            this.juntadas = juntadas;
            this.processoDestinoPagination.filter = {
                'id':'neq:' + this.juntadas[0].volume.processo?.id
            };
        });

        this.juntadasSelecionadas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((juntadas) => {
            this.juntadasSelecionadas = juntadas;
            this._changeDetectorRef.markForCheck();
        });

        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            this.pagination = pagination;
        });

        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;

            //caso estiver snack aberto esperando alguma confirmacao se sair da url faz o flush
            if (this.snackSubscription) {
                this.sheetRef.dismiss();
            }
        });

        this.screen$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((screen) => {
            this.juntadas = this.juntadas?.filter(x => !this.juntadasSelecionadas.includes(x));
            if (screen.size !== 'desktop') {
                this.mobileMode = true;
            } else {
                this.mobileMode = false;
            }
        });
    }

    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.SetSelectedJuntadas([]));
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    submit(values): void {
        const lote = CdkUtils.makeId();
        this.juntadasSelecionadas.forEach((juntada) => {
            const operacaoId = CdkUtils.makeId();
            const desentranhamento = new Desentranhamento();
            Object.entries(values).forEach(
                ([key, value]) => {
                    desentranhamento[key] = value;
                }
            );
            desentranhamento.juntada = juntada;
            desentranhamento.juntadasBloco = this.juntadasBloco;
            this._store.dispatch(new fromStore.SaveDesentranhamento({
                desentranhamento: desentranhamento,
                operacaoId: operacaoId,
                loteId: lote,
                redo: [
                    new fromStore.SaveDesentranhamento({
                        desentranhamento: desentranhamento,
                        operacaoId: operacaoId,
                        loteId: lote,
                        redo: 'inherent'
                        // redo e undo são herdados da ação original
                    }),
                    new fromStore.SaveDesentranhamentoFlush()
                ],
                undo: null
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
                    icon: 'low_priority',
                    text: 'Desentranhada(s)'
                }
            });

            this.snackSubscription = this.sheetRef.afterDismissed().subscribe((data) => {
                if (data.dismissedByAction === true) {
                    this._store.dispatch(new fromStore.SaveDesentranhamentoCancel());
                } else {
                    this._store.dispatch(new fromStore.SaveDesentranhamentoFlush());
                }
                this.snackSubscription.unsubscribe();
                this.snackSubscription = null;
            });
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
        const juntadasIds = [];
        juntadas.forEach((juntada) => {
            juntadasIds.push(juntada.id);
            if (!this.juntadasBloco.find(j => j.id === juntada.id)){
                this.juntadasBloco.push(juntada);
            }
        });
        this._store.dispatch(new fromStore.SetSelectedJuntadas(juntadasIds));
    }

    back(): void {
        this._router.navigate([this.routerState.url.replace('juntadas/desentranhar', 'juntadas/listar')])
            .then();
    }
}
