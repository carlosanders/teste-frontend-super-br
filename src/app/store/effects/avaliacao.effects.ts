import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {of, catchError, mergeMap, tap, switchMap} from 'rxjs';

import * as AvaliacaoActions from '../actions/avaliacao.actions';
import * as ObjetoAvaliadoActions from '../actions/objeto-avaliado.actions';

import {AvaliacaoService} from '@cdk/services/avaliacao.service';
import {ObjetoAvaliadoService} from '@cdk/services/objeto-avaliado.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {avaliacao as avaliacaoSchema, objetoAvaliado as objetoAvaliadoSchema} from '@cdk/normalizr';
import {Avaliacao, ObjetoAvaliado} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {getObjetoAvaliadoFromRedux, getObjetoAvaliadoLoaded} from '../selectors';

@Injectable()
export class AvaliacaoEffects {

    /**
     * Get Avaliacao with router parameters
     *
     * @type {Observable<any>}
     */
    getAvaliacao: any = createEffect(() => this._actions.pipe(
        ofType<AvaliacaoActions.GetAvaliacao>(AvaliacaoActions.GET_AVALIACAO),
        switchMap(action => this._avaliacaoService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify(['populateAll']),
            JSON.stringify({isAdmin: true}))),
        switchMap(response => [
            new AddData<Avaliacao>({data: response['entities'], schema: avaliacaoSchema}),
            new AvaliacaoActions.GetAvaliacaoSuccess({avaliacaoId: response['entities'][0].id})
        ]),
        catchError((err, caught) => {
            console.log(err);
            this._store.dispatch(new AvaliacaoActions.GetAvaliacaoFailed(err));
            return caught;
        })
    ));

    /**
     * Save Avaliacao
     *
     * @type {Observable<any>}
     */
    saveAvaliacao: any = createEffect(() => this._actions.pipe(
        ofType<AvaliacaoActions.SaveAvaliacao>(AvaliacaoActions.SAVE_AVALIACAO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'avaliação',
            content: 'Salvando uma avaliação ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._avaliacaoService.avaliar(action.payload.avaliacao, JSON.stringify(['objetoAvaliado'])).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'avaliação',
                content: 'Avaliação id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap(response => [
                new AvaliacaoActions.SaveAvaliacaoSuccess(response),
                new AddData<Avaliacao>({data: [response], schema: avaliacaoSchema}),
                new UpdateData<ObjetoAvaliado>({
                    id: response.objetoAvaliado.id,
                    schema: objetoAvaliadoSchema,
                    changes: {
                        quantidadeAvaliacoes: response.objetoAvaliado.quantidadeAvaliacoes,
                        avaliacaoResultante: response.objetoAvaliado.avaliacaoResultante
                    }
                })
            ]),
            catchError((err, caught) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'avaliação',
                    content: 'Erro ao salvar o avaliação!',
                    status: 2, // erro
                }));
                return of(new AvaliacaoActions.SaveAvaliacaoFailed(err));
            }))
        )
    ));

    getObjetoAvaliado2: any = createEffect(() => this._actions.pipe(
        ofType<ObjetoAvaliadoActions.GetObjetoAvaliado>(ObjetoAvaliadoActions.GET_OBJETO_AVALIADO),
        concatLatestFrom(action => this._store.pipe(select(getObjetoAvaliadoFromRedux(action.payload.objetoId, action.payload.classe)))),
        switchMap(([action, objetoAvaliado]) => {
            if (objetoAvaliado) {
                return of(new ObjetoAvaliadoActions.GetObjetoAvaliadoSuccess({objetoAvaliadoId: objetoAvaliado.id}));
            } else {
                return this._objetoAvaliadoService.consultar(action.payload).pipe(
                    switchMap(response => [
                        new AddData<ObjetoAvaliado>({data: [response], schema: objetoAvaliadoSchema}),
                        new ObjetoAvaliadoActions.GetObjetoAvaliadoSuccess({objetoAvaliadoId: response.id})
                    ]),
                    catchError((err, caught) => {
                        console.log(err);
                        this._store.dispatch(new ObjetoAvaliadoActions.GetObjetoAvaliadoFailed(err));
                        return caught;
                    })
                )
            }
        })
    ));

    routerState: any;

    constructor(
        private _actions: Actions,
        private _avaliacaoService: AvaliacaoService,
        private _objetoAvaliadoService: ObjetoAvaliadoService,
        private _store: Store<State>,
        public _loginService: LoginService,
        private _router: Router,
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }
}
