import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../store/reducers';
import * as EspecieSetorListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {EspecieSetorService} from '@cdk/services/especie-setor.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {EspecieSetor} from '@cdk/models';
import {especieSetor as especieSetorSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class EspecieSetorListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _especieSetorService: EspecieSetorService,
        private _loginService: LoginService,
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
     * Get EspecieSetor with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getEspecieSetor: any =
        this._actions
            .pipe(
                ofType<EspecieSetorListActions.GetEspecieSetor>(EspecieSetorListActions.GET_ESPECIE_SETOR),
                switchMap(action => this._especieSetorService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context)).pipe(
                        mergeMap(response => [
                            new AddData<EspecieSetor>({data: response['entities'], schema: especieSetorSchema}),
                            new EspecieSetorListActions.GetEspecieSetorSuccess({
                                entitiesId: response['entities'].map(especieSetor => especieSetor.id),
                                loaded: {
                                    id: 'especieSetorHandle',
                                    value: this.routerState.params.especieSetorHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new EspecieSetorListActions.GetEspecieSetorFailed(err));
                        })
                    ))
            );

    /**
     * Delete EspecieSetor
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteEspecieSetor: Observable<EspecieSetorListActions.EspecieSetorListActionsAll> =
        this._actions
            .pipe(
                ofType<EspecieSetorListActions.DeleteEspecieSetor>(EspecieSetorListActions.DELETE_ESPECIE_SETOR),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'especieSetor',
                        content: 'Apagando a especieSetor id ' + action.payload.especieSetorId + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap((action) => {
                    return this._especieSetorService.destroy(action.payload.especieSetorId).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'especieSetor',
                                content: 'EspecieSetor id ' + action.payload.especieSetorId + ' deletada com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId
                            }));
                            new UpdateData<EspecieSetor>({
                                id: response.id,
                                schema: especieSetorSchema,
                                changes: {apagadoEm: response.apagadoEm}
                            });
                            return new EspecieSetorListActions.DeleteEspecieSetorSuccess(response.id);
                        }),
                        catchError((err) => {
                            const payload = {
                                id: action.payload.especieSetorId,
                                error: err
                            };
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'especieSetor',
                                content: 'Erro ao apagar a especieSetor id ' + action.payload.especieSetorId + '!',
                                status: 2, // erro
                                lote: action.payload.loteId
                            }));
                            console.log(err);
                            return of(new EspecieSetorListActions.DeleteEspecieSetorFailed(payload));
                        })
                    );
                }, 25)
            );
}
