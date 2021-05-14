import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as TramitacaoListActions from '../actions';

import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Tramitacao} from '@cdk/models';
import {tramitacao as tramitacaoSchema} from '@cdk/normalizr';
import {CdkUtils} from "../../../../../../../../../@cdk/utils";

@Injectable()
export class TramitacaoListEffect {

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
                ofType<TramitacaoListActions.GetTramitacoes>(TramitacaoListActions.GET_TRAMITACOES),
                switchMap((action) => {
                    return this._tramitacaoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context));
                }),
                mergeMap((response) => [
                    new AddData<Tramitacao>({data: response['entities'], schema: tramitacaoSchema}),
                    new TramitacaoListActions.GetTramitacoesSuccess({
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
                    this._store.dispatch(new TramitacaoListActions.GetTramitacoesFailed(err));
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
                ofType<TramitacaoListActions.DeleteTramitacao>(TramitacaoListActions.DELETE_TRAMITACAO),
                mergeMap((action) => {
                    return this._tramitacaoService.destroy(action.payload).pipe(
                        map((response) => new TramitacaoListActions.DeleteTramitacaoSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new TramitacaoListActions.DeleteTramitacaoFailed(
                                {
                                    [action.payload]: CdkUtils.errorsToString(err)
                                })
                            );
                        })
                    );
                })
            );
}
