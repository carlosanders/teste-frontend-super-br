import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../store';
import * as EspecieProcessoListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {EspecieProcessoService} from '@cdk/services/especie-processo.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {EspecieProcesso} from '@cdk/models';
import {especieProcesso as especieProcessoSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class EspecieProcessoListEffects {
    routerState: any;
    /**
     * Get EspecieProcesso with router parameters
     *
     * @type {Observable<any>}
     */
    getEspecieProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<EspecieProcessoListActions.GetEspecieProcesso>(EspecieProcessoListActions.GET_ESPECIE_PROCESSO),
        switchMap(action => this._especieProcessoService.query(
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
                new AddData<EspecieProcesso>({data: response['entities'], schema: especieProcessoSchema}),
                new EspecieProcessoListActions.GetEspecieProcessoSuccess({
                    entitiesId: response['entities'].map(especieProcesso => especieProcesso.id),
                    loaded: {
                        id: 'especieProcessoHandle',
                        value: this.routerState.params.especieProcessoHandle
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new EspecieProcessoListActions.GetEspecieProcessoFailed(err));
            })
        ))
    ));
    /**
     * Delete EspecieProcesso
     *
     * @type {Observable<any>}
     */
    deleteEspecieProcesso: Observable<EspecieProcessoListActions.EspecieProcessoListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<EspecieProcessoListActions.DeleteEspecieProcesso>(EspecieProcessoListActions.DELETE_ESPECIE_PROCESSO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'espécie processo',
            content: 'Apagando a espécie processo id ' + action.payload.especieProcessoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._especieProcessoService.destroy(action.payload.especieProcessoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'espécie processo',
                    content: 'Espécie Processo id ' + action.payload.especieProcessoId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<EspecieProcesso>({
                    id: response.id,
                    schema: especieProcessoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new EspecieProcessoListActions.DeleteEspecieProcessoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.especieProcessoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'espécie processo',
                    content: 'Erro ao apagar a espécie processo id ' + action.payload.especieProcessoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new EspecieProcessoListActions.DeleteEspecieProcessoFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _especieProcessoService: EspecieProcessoService,
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
