import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as InteressadoListActions
    from 'app/main/apps/processo/processo-edit/interessados/interessado-list/store/actions';

import {InteressadoService} from '@cdk/services/interessado.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Interessado} from '@cdk/models';
import {interessado as interessadoSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class InteressadoListEffect {
    routerState: any;
    /**
     * Get Interessados with router parameters
     *
     * @type {Observable<any>}
     */
    getInteressados: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<InteressadoListActions.GetInteressados>(InteressadoListActions.GET_INTERESSADOS),
        switchMap(action => this._interessadoService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context))),
        mergeMap(response => [
            new AddData<Interessado>({data: response['entities'], schema: interessadoSchema}),
            new InteressadoListActions.GetInteressadosSuccess({
                entitiesId: response['entities'].map(interessado => interessado.id),
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new InteressadoListActions.GetInteressadosFailed(err));
        })
    ));
    /**
     * Delete Interessado
     *
     * @type {Observable<any>}
     */
    deleteInteressado: Observable<InteressadoListActions.InteressadoListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<InteressadoListActions.DeleteInteressado>(InteressadoListActions.DELETE_INTERESSADO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'interessado',
            content: 'Apagando o interessado id ' + action.payload.interessadoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._interessadoService.destroy(action.payload.interessadoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'interessado',
                    content: 'Interessado id ' + action.payload.interessadoId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Interessado>({
                    id: response.id,
                    schema: interessadoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new InteressadoListActions.DeleteInteressadoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.interessadoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'interessado',
                    content: 'Erro ao apagar o interessado id ' + action.payload.interessadoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new InteressadoListActions.DeleteInteressadoFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _interessadoService: InteressadoService,
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
