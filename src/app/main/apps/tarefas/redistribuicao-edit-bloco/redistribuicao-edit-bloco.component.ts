import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Processo, Tarefa} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {getSelectedTarefas} from '../store/selectors';
import {getOperacoesState, getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {filter, skip, take, takeUntil, tap} from 'rxjs/operators';
import * as fromStoreTarefas from 'app/main/apps/tarefas/store';
import {Back} from 'app/store/actions';
import {MatDialog} from "@cdk/angular/material";
import {ModalAvisoRestricaoNupComponent} from "../modal-aviso-restricao-nup/modal-aviso-restricao-nup.component";
import {getTarefasProcessoRestritoValidadas} from "./store";

@Component({
    selector: 'redistribuicao-edit-bloco',
    templateUrl: './redistribuicao-edit-bloco.component.html',
    styleUrls: ['./redistribuicao-edit-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RedistribuicaoEditBlocoComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    tarefas$: Observable<Tarefa[]>;
    tarefas: Tarefa[];

    processosRestritos: Processo[] = [];

    tarefasProcessoRestritoValidadas$: Observable<number[]>;
    tarefasProcessoRestritoValidadas: number[];

    tarefa: Tarefa;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    operacoes: any[] = [];

    private _profile: any;

    routerState: any;

    pagination$: Observable<any>;
    pagination: any;

    blocoEditDistribuicao = true;

    /**
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     * @param dialog
     */
    constructor(
        private _store: Store<fromStore.RedistribuicaoEditBlocoAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        public dialog: MatDialog
    ) {
        this.tarefas$ = this._store.pipe(select(getSelectedTarefas));
        this.tarefasProcessoRestritoValidadas$ = this._store.pipe(select(getTarefasProcessoRestritoValidadas));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._profile = _loginService.getUserProfile().colaborador;
        this.pagination$ = this._store.pipe(select(fromStoreTarefas.getPagination));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this.blocoEditDistribuicao = true;
        let tarefasValidadas = true;

        this.tarefasProcessoRestritoValidadas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            tarefasProcessoRestritoValidadas =>
                this.tarefasProcessoRestritoValidadas = tarefasProcessoRestritoValidadas
        );

        this.tarefas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(tarefas => {
            this.tarefas = tarefas;

            tarefas.forEach(tarefa => {
                if (tarefa.processo.acessoRestrito === true && !this.processosRestritos.includes(tarefa.processo)) {
                    this.processosRestritos.push(tarefa.processo);

                    if(!this.tarefasProcessoRestritoValidadas.includes(tarefa.id)) {
                        tarefasValidadas = false;
                    }
                }
            });
        });

        if (!tarefasValidadas) {

            const dialogRef = this.dialog.open(ModalAvisoRestricaoNupComponent, {
                data: {},
                hasBackdrop: false,
                closeOnNavigation: true
            });

            dialogRef.afterClosed()
                .pipe(
                    tap(
                        (value) => {
                            let tarefasValidadas = [];
                            this.tarefas.forEach(tarefa => tarefasValidadas.push(tarefa.id))
                            this._store.dispatch(
                                new fromStore.TarefasProcessoRestritoValidadasSuccess(
                                    tarefasValidadas
                                )
                            );
                        }
                    ),
                    tap(() => dialogRef.close()),
                    take(1)
                ).subscribe();
        }

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(pagination => {
            this.pagination = pagination;
        });

        this._store
            .pipe(
                select(getOperacoesState),
                skip(1),
                takeUntil(this._unsubscribeAll),
                filter(op => !!op && !!op.content && op.type === 'tarefa')
            )
            .subscribe(
                operacao => {

                    this.reloadTarefas();

                    this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' +
                    this.routerState.params.typeHandle + '/' +
                    '/' + this.routerState.params.targetHandle]).then();
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

        this.tarefa = new Tarefa();
        this.tarefa.unidadeResponsavel = this._profile.lotacoes[0].setor.unidade;
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    reloadTarefas(): void {

        this._store.dispatch(new fromStoreTarefas.UnloadTarefas({reset: false}));

        const nparams = {
            ...this.pagination,
            filter: {
                ...this.pagination.filter
            },
            sort: this.pagination.sort,
            limit: this.pagination.limit,
            offset: this.pagination.offset,
            populate: this.pagination.populate
        };

        this._store.dispatch(new fromStoreTarefas.GetTarefas(nparams));
        this._store.dispatch(new fromStoreTarefas.ChangeSelectedTarefas([]));
    }

    submit(values): void {

        this.operacoes = [];

        this.tarefas.forEach(tarefaBloco => {
            const tarefa = new Tarefa();

            Object.entries(tarefaBloco).forEach(
                ([key, value]) => {
                    tarefa[key] = value;
                }
            );

            tarefa.id = tarefaBloco.id;
            tarefa.setorResponsavel = values.setorResponsavel;

            if (values.usuarioResponsavel) {
                tarefa.usuarioResponsavel = values.usuarioResponsavel;
            } else {
                tarefa.distribuicaoAutomatica = values.distribuicaoAutomatica;
                tarefa.usuarioResponsavel = null;
            }

            this._store.dispatch(new fromStore.SaveTarefa({tarefa: tarefa}));
        });
    }

    doRestricoesAcesso(processo:Processo): void {
        this._router.navigate(['apps/tarefas/' +
        this.routerState.params.generoHandle + '/' +
        this.routerState.params.typeHandle + '/' +
        this.routerState.params.targetHandle + '/visibilidade/' + processo.id]);
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
