import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as NomeListActions from '../actions';

import {NomeService} from '@cdk/services/nome.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Nome} from '@cdk/models';
import {nome as nomeSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class NomeListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _nomeService: NomeService,
        private _store: Store<State>
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
     * Get Nomes with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getNomes: any =
        this._actions
            .pipe(
                ofType<NomeListActions.GetNomes>(NomeListActions.GET_NOMES),
                switchMap(action => this._nomeService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify([
                            'populateAll'
                        ]))),
                mergeMap(response => [
                    new AddData<Nome>({data: response['entities'], schema: nomeSchema}),
                    new NomeListActions.GetNomesSuccess({
                        entitiesId: response['entities'].map(nome => nome.id),
                        loaded: {
                            id: 'pessoaHandle',
                            value: this.routerState.params.pessoaHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log (err);
                    this._store.dispatch(new NomeListActions.GetNomesFailed(err));
                    return caught;
                })

            );

    /**
     * Delete Nome
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteNome: Observable<NomeListActions.NomeListActionsAll> =
        this._actions
            .pipe(
                ofType<NomeListActions.DeleteNome>(NomeListActions.DELETE_NOME),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'nome',
                        content: 'Apagando a nome id ' + action.payload.nomeId + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap((action) => {
                    return this._nomeService.destroy(action.payload.nomeId).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'nome',
                                content: 'Nome id ' + action.payload.nomeId + ' deletada com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId
                            }));
                            new UpdateData<Nome>({
                                id: response.id,
                                schema: nomeSchema,
                                changes: {apagadoEm: response.apagadoEm}
                            });
                            return new NomeListActions.DeleteNomeSuccess(response.id);
                        }),
                        catchError((err) => {
                            const payload = {
                                id: action.payload.nomeId,
                                error: err
                            };
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'nome',
                                content: 'Erro ao apagar a nome id ' + action.payload.nomeId + '!',
                                status: 2, // erro
                                lote: action.payload.loteId
                            }));
                            console.log(err);
                            return of(new NomeListActions.DeleteNomeFailed(payload));
                        })
                    );
                }, 25)
            );
}
