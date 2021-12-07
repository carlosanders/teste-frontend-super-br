import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Colaborador, Tarefa} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from 'app/main/apps/tarefas/tarefa-detail/store';
import {
    RedistribuirTarefa,
    RedistribuirTarefaCancel,
    RedistribuirTarefaFlush
} from 'app/main/apps/tarefas/tarefa-detail/store';
import {filter, take, takeUntil, tap} from 'rxjs/operators';
import {LoginService} from '../../../../auth/login/login.service';
import {Back, getRouterState} from '../../../../../store';
import {Router} from '@angular/router';
import * as fromStoreTarefas from 'app/main/apps/tarefas/store';
import {CdkUtils} from '@cdk/utils';
import {SnackBarDesfazerComponent} from '@cdk/components/snack-bar-desfazer/snack-bar-desfazer.component';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {MatDialog} from '@cdk/angular/material';
import {CdkVisibilidadePluginComponent} from '@cdk/components/visibilidade/cdk-visibilidade-plugin/cdk-visibilidade-plugin.component';

@Component({
    selector: 'redistribuicao-edit',
    templateUrl: './redistribuicao-edit.component.html',
    styleUrls: ['./redistribuicao-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RedistribuicaoEditComponent implements OnInit, OnDestroy {

    tarefa$: Observable<Tarefa>;
    tarefa: Tarefa;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    pagination$: Observable<any>;
    pagination: any;

    _profile: Colaborador;

    operacoes: any[] = [];
    routerState: any;

    sheetRef: MatSnackBarRef<SnackBarDesfazerComponent>;
    snackSubscription: any;
    lote: string;

    tarefaProcessoRestritoValidada$: Observable<number>;
    tarefaProcessoRestritoValidada: number;

    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _store
     * @param _loginService
     * @param _router
     * @param _snackBar
     * @param dialog
     */
    constructor(
        private _store: Store<fromStore.TarefaDetailAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _snackBar: MatSnackBar,
        public dialog: MatDialog
    ) {
        this.tarefa$ = this._store.pipe(select(fromStore.getTarefa));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._profile = _loginService.getUserProfile().colaborador;
        this.pagination$ = this._store.pipe(select(fromStoreTarefas.getPagination));
        this.tarefaProcessoRestritoValidada$ = this._store.pipe(select(fromStore.getTarefaProcessoRestritoValidada));
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
            //caso estiver snack aberto esperando alguma confirmacao se sair da url faz o flush
            if (this.snackSubscription && this.routerState?.url.indexOf('operacoes-bloco') === -1) {
                this.sheetRef.dismiss();
            }

            this.routerState = routerState.state;
        });

        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            this.pagination = pagination;
        });

        this.tarefaProcessoRestritoValidada$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            tarefaProcessoRestritoValidada =>
                this.tarefaProcessoRestritoValidada = tarefaProcessoRestritoValidada
        );

        this.tarefa$.pipe(
            filter(tarefa => !this.tarefa || (tarefa.id !== this.tarefa.id)),
            takeUntil(this._unsubscribeAll)
        ).subscribe((tarefa) => {
            this.tarefa = tarefa;
            this.tarefa.unidadeResponsavel = tarefa.setorResponsavel.unidade;
            this.tarefa.setorResponsavel = null;
            this.tarefa.usuarioResponsavel = null;

            if (this.tarefa.processo.acessoRestrito === true && this.tarefa.id != this.tarefaProcessoRestritoValidada) {
                const dialogRef = this.dialog.open(CdkVisibilidadePluginComponent, {
                    data: {
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        NUP: this.tarefa.processo.NUP
                    },
                    hasBackdrop: false,
                    closeOnNavigation: true
                });

                dialogRef.afterClosed()
                    .pipe(
                        tap(
                            (value) => {
                                const processoId = this.routerState.params.processoHandle ?
                                    this.routerState.params.processoHandle : this.tarefa.processo.id;
                                if (value === 1 && processoId) {

                                    this._store.dispatch(
                                        new fromStore.TarefaProcessoRestritoValidadaSuccess(
                                            this.tarefa.id
                                        )
                                    );

                                    this._router.navigate(['apps/tarefas/' +
                                    this.routerState.params.generoHandle + '/' +
                                    this.routerState.params.typeHandle + '/' +
                                    this.routerState.params.targetHandle + '/visibilidade/' + processoId]).then();
                                }
                            }
                        ),
                        tap(() => dialogRef.close()),
                        take(1)
                    ).subscribe();
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        const tarefa = new Tarefa();

        Object.entries(values).forEach(
            ([key, value]) => {
                tarefa[key] = value;
            }
        );

        tarefa.vinculacoesEtiquetas = this.tarefa.vinculacoesEtiquetas;

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new RedistribuirTarefa({
            tarefa: tarefa,
            operacaoId: operacaoId,
            loteId: null,
            redo: [
                new RedistribuirTarefa({
                    tarefa: tarefa,
                    operacaoId: operacaoId,
                    loteId: null,
                    redo: 'inherent',
                    // redo e undo são herdados da ação original
                    url: this._router.url
                }),
                new RedistribuirTarefaFlush()
            ],
            url: this._router.url,
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
                icon: 'forward',
                text: 'Redistribuindo'
            }
        });

        this.snackSubscription = this.sheetRef.afterDismissed().subscribe((data) => {
            if (data.dismissedByAction === true) {
                this._store.dispatch(new RedistribuirTarefaCancel());
            } else {
                this._store.dispatch(new RedistribuirTarefaFlush());
            }
            this.snackSubscription.unsubscribe();
            this.snackSubscription = null;
        });
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
