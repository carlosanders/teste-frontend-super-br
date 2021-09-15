import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../store';
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
    /**
     * Get EspecieSetor with router parameters
     *
     * @type {Observable<any>}
     */
    getEspecieSetor: Observable<any> = createEffect(() => this._actions.pipe(
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
    ));
    /**
     * Delete EspecieSetor
     *
     * @type {Observable<any>}
     */
    deleteEspecieSetor: Observable<EspecieSetorListActions.EspecieSetorListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<EspecieSetorListActions.DeleteEspecieSetor>(EspecieSetorListActions.DELETE_ESPECIE_SETOR),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'espécie setor',
            content: 'Apagando a espécie setor id ' + action.payload.especieSetorId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._especieSetorService.destroy(action.payload.especieSetorId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'espécie setor',
                    content: 'Espécie setor id ' + action.payload.especieSetorId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<EspecieSetor>({
                    id: response.id,
                    schema: especieSetorSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new EspecieSetorListActions.DeleteEspecieSetorSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.especieSetorId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'espécie setor',
                    content: 'Erro ao apagar a espécie setor id ' + action.payload.especieSetorId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new EspecieSetorListActions.DeleteEspecieSetorFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _especieSetorService: EspecieSetorService,
        private _loginService: LoginService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
