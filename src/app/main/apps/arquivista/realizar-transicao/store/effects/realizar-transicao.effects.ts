import {Actions, Effect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import * as moment from 'moment';

import {Processo, Transicao} from '@cdk/models';
import {ProcessoService} from '@cdk/services/processo.service';
import {LoginService} from '../../../../../auth/login/login.service';
import {TransicaoService} from '@cdk/services/transicao.service';
import {AddData, RemoveData} from '@cdk/ngrx-normalizr';
import {transicao as transicaoSchema} from '@cdk/normalizr/transicao.schema';
import {processo as processoSchema} from '@cdk/normalizr/processo.schema';

import {getRouterState, State} from '../../../../../../store/reducers';
import * as RealizarTransicaoActions from '../actions/realizar-transicao.actions';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as fromStore from '../../store';

@Injectable()
export class RealizarTransicaoEffects {


    constructor(
        private _actions: Actions,
        private _transicaoService: TransicaoService,
        private _processoService: ProcessoService,
        private _store: Store<State>,
        private _loginService: LoginService,
        private _router: Router

    ) {
        this.initRouterState();
        this.setorAtual = this._loginService.getUserProfile().colaborador.lotacoes[0].setor.id;
    }
    routerState: any;
    private currentDate: any;
    setorAtual: number;

    /**
     * Save RealizarTransicao
     * @type {Observable<any>}
     */
    @Effect()
    saveRealizarTransicao: any =
        this._actions
            .pipe(
                ofType<RealizarTransicaoActions.SaveRealizarTransicao>(RealizarTransicaoActions.SAVE_REALIZAR_TRANSICAO),
                switchMap((action) => {
                    return this._transicaoService.save(action.payload).pipe(
                        mergeMap((response: Transicao) => [
                            new RealizarTransicaoActions.SaveRealizarTransicaoSuccess(),
                            new AddData<Transicao>({data: [response], schema: transicaoSchema})
                        ]),
                        catchError((err) => {
                            this._store.dispatch(new OperacoesActions.Resultado({
                                type: 'realizar-transicao',
                                content: `Houve um erro ao realizar a transição para o processo id ${action.payload.processo.id}! ${err.error.message}`,
                                success: false,
                                dateTime: moment()
                            }));
                            return of(new RealizarTransicaoActions.SaveRealizarTransicaoFailed(err));
                        })
                    );
                })
            );

    /**
     * Save RealizarTransicao Success
     */
    @Effect({dispatch: false})
    saveRealizarTransicaoSuccess: any =
        this._actions
            .pipe(
                ofType<RealizarTransicaoActions.SaveRealizarTransicaoSuccess>(RealizarTransicaoActions.SAVE_REALIZAR_TRANSICAO_SUCCESS),
                tap(() => {
                    // Foi autorizado pelo Leo para ser refatorado esse codigo posteriormente.
                    this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle
                    + '/aguardando-decurso']).then();
                    setTimeout(() => {
                        this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle
                        + '/pronto-transicao']).then();
                    }, 1000);
                })
            );

    /**
     * Get Processos with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getProcessos: Observable<any> =
        this._actions
            .pipe(
                ofType<RealizarTransicaoActions.GetProcessos>(RealizarTransicaoActions.GET_PROCESSOS),
                switchMap((action) => {
                    return this._processoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.listFilter,
                            ...action.payload.etiquetaFilter
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate));
                }),
                mergeMap((response) => [
                    new AddData<Processo>({data: response['entities'], schema: processoSchema}),
                    new RealizarTransicaoActions.GetProcessosSuccess({
                        entitiesId: response['entities'].map(processo => processo.id),
                        loaded: {
                            id: 'unidadeHandle_typeHandle',
                            value: this.routerState.params.unidadeHandle + '_' +
                                this.routerState.params.typeHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new RealizarTransicaoActions.GetProcessosFailed(err));
                    return caught;
                })
            );


    initRouterState(): void{
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }
}
