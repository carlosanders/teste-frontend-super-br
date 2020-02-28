import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as AcaoListActions from '../actions';

import {AcaoService} from '@cdk/services/acao.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Acao} from '@cdk/models';
import {acao as acaoSchema} from '@cdk/normalizr/acao.schema';

@Injectable()
export class AcaoListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _acaoService: AcaoService,
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
     * Get Acoes with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getAcoes: any =
        this._actions
            .pipe(
                ofType<AcaoListActions.GetAcoes>(AcaoListActions.GET_ACOES),
                switchMap((action) => {
                    return this._acaoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate)).pipe(
                        mergeMap((response) => [
                            new AddData<Acao>({data: response['entities'], schema: acaoSchema}),
                            new AcaoListActions.GetAcoesSuccess({
                                entitiesId: response['entities'].map(acao => acao.id),
                                loaded: {
                                    id: 'etiquetaHandle',
                                    value: this.routerState.params.etiquetaHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new AcaoListActions.GetAcoesFailed(err));
                        })
                    );
                })
            );

    /**
     * Delete Acao
     * @type {Observable<any>}
     */
    @Effect()
    deleteAcao: any =
        this._actions
            .pipe(
                ofType<AcaoListActions.DeleteAcao>(AcaoListActions.DELETE_ACAO),
                mergeMap((action) => {
                    return this._acaoService.destroy(action.payload).pipe(
                        map((response) => new AcaoListActions.DeleteAcaoSuccess(response.id)),
                        catchError((err) => {
                            console.log (err);
                            return of(new AcaoListActions.DeleteAcaoFailed(action.payload));
                        })
                    );
                })
            );
}
