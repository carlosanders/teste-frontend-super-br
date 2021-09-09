import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

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
    /**
     * Get Tramitacao with router parameters
     *
     * @type {Observable<any>}
     */
    getTramitacao: any = createEffect(() => this._actions.pipe(
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
        catchError((err) => {
            console.log(err);
            return of(new RecebimentoActions.GetTramitacaoFailed(err));
        })
    ));
    /**
     * Save Processo
     *
     * @type {Observable<any>}
     */
    receberTramitacaoProcesso: any = createEffect(() => this._actions.pipe(
        ofType<RecebimentoActions.ReceberTramitacaoProcesso>(RecebimentoActions.RECEBER_TRAMITACAO_PROCESSO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tramitação',
            content: 'Recebendo tramitação ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._tramitacaoService.patch(action.payload.tramitacao, action.payload.changes).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'tramitação',
                content: `Tramitação id ${response.id} recebida com sucesso.`,
                status: 1, // sucesso
            }))),
            mergeMap((response: Tramitacao) => [
                new RecebimentoActions.ReceberTramitacaoProcessoSuccess(response),
                new AddData<Tramitacao>({data: [response], schema: tramitacaoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tramitação',
                    content: 'Ocorreu um erro no recebimento de tramitação.',
                    status: 2, // sucesso
                }));
                return of(new RecebimentoActions.ReceberTramitacaoProcessoFailed(err));
            })
        ))
    ));
    /**
     * Save Processo Success
     */
    receberTramitacaoProcessoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<RecebimentoActions.ReceberTramitacaoProcesso>(RecebimentoActions.RECEBER_TRAMITACAO_PROCESSO_SUCCESS),
        tap(() => {
            this._router.navigate(['apps/processo/' +
            this.routerState.params.processoHandle +
            '/editar/remessas']).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _tramitacaoService: TramitacaoService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
