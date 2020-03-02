import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as RemessaListActions from '../actions';

import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Tramitacao} from '@cdk/models';
import {tramitacao as tramitacaoSchema} from '@cdk/normalizr/tramitacao.schema';

@Injectable()
export class RemessaListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _tramitacaoService: TramitacaoService,
        private _store: Store<State>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Tramitacoes with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getTramitacoes: any =
        this._actions
            .pipe(
                ofType<RemessaListActions.GetTramitacoes>(RemessaListActions.GET_TRAMITACOES),
                switchMap((action) => {
                    return this._tramitacaoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate));
                }),
                mergeMap((response) => [
                    new AddData<Tramitacao>({data: response['entities'], schema: tramitacaoSchema}),
                    new RemessaListActions.GetTramitacoesSuccess({
                        entitiesId: response['entities'].map(tramitacao => tramitacao.id),
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new RemessaListActions.GetTramitacoesFailed(err));
                    return caught;
                })
            );

    /**
     * Delete Tramitacao
     * @type {Observable<any>}
     */
    @Effect()
    deleteTramitacao: any =
        this._actions
            .pipe(
                ofType<RemessaListActions.DeleteTramitacao>(RemessaListActions.DELETE_TRAMITACAO),
                mergeMap((action) => {
                    return this._tramitacaoService.destroy(action.payload).pipe(
                        map((response) => new RemessaListActions.DeleteTramitacaoSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new RemessaListActions.DeleteTramitacaoFailed(action.payload));
                        })
                    );
                })
            );
}
