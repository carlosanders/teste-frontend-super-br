import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as RecebimentoActions from '../actions/recebimento.actions';
import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {tramitacao as tramitacaoSchema} from '@cdk/normalizr';
import {Tramitacao} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class RecebimentoEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _tramitacaoService: TramitacaoService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Tramitacao with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getTramitacao: any =
        this._actions
            .pipe(
                ofType<RecebimentoActions.GetTramitacao>(RecebimentoActions.GET_TRAMITACAO),
                switchMap(action => this._tramitacaoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]))),
                switchMap(response => [
                    new AddData<Tramitacao>({data: response['entities'], schema: tramitacaoSchema}),
                    new RecebimentoActions.GetTramitacaoSuccess({
                        loaded: {
                            id: 'tramitacaoHandle',
                            value: this.routerState.params.tramitacaoHandle
                        },
                        tramitacaoId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new RecebimentoActions.GetTramitacaoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Processo
     *
     * @type {Observable<any>}
     */
    @Effect()
    receberTramitacaoProcesso: any =
        this._actions
            .pipe(
                ofType<RecebimentoActions.ReceberTramitacaoProcesso>(RecebimentoActions.RECEBER_TRAMITACAO_PROCESSO),
                switchMap(action => this._tramitacaoService.patch(action.payload.tramitacao, action.payload.changes).pipe(
                        mergeMap((response: Tramitacao) => [
                            new RecebimentoActions.ReceberTramitacaoProcessoSuccess(response),
                            new AddData<Tramitacao>({data: [response], schema: tramitacaoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'tramitacao',
                                content: `Tramitação id ${response.id} recebida com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new RecebimentoActions.ReceberTramitacaoProcessoFailed(err));
                        })
                    ))
            );


    /**
     * Save Processo Success
     */
    @Effect({ dispatch: false })
    receberTramitacaoProcessoSuccess: any =
        this._actions
            .pipe(
                ofType<RecebimentoActions.ReceberTramitacaoProcesso>(RecebimentoActions.RECEBER_TRAMITACAO_PROCESSO_SUCCESS),
                tap(() => {
                    this._router.navigate(['apps/processo/' +
                    this.routerState.params.processoHandle +
                    '/editar/tramitacoes']).then();
                })
            );
}
