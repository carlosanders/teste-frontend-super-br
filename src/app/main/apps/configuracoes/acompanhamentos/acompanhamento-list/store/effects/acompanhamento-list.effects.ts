import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as AcompanhamentoListActions from '../actions';

import {AcompanhamentoService} from '@cdk/services/acompanhamento.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Compartilhamento} from '@cdk/models';
import {compartilhamento as acompanhamentoSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class AcompanhamentoListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _acompanhamentoService: AcompanhamentoService,
        public _loginService: LoginService,
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
     * Get Acompanhamentos with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getAcompanhamentos: any =
        this._actions
            .pipe(
                ofType<AcompanhamentoListActions.GetAcompanhamentos>(AcompanhamentoListActions.GET_ACOMPANHAMENTOS),
                switchMap((action) => {
                    return this._acompanhamentoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context)).pipe(
                        mergeMap((response) => [
                                    new AddData<Compartilhamento>({
                                        data: response['entities'],
                                        schema: acompanhamentoSchema
                                    }),
                                    new AcompanhamentoListActions.GetAcompanhamentosSuccess({
                                        entitiesId: response['entities'].map(acompanhamento => acompanhamento.id),
                                        loaded: {
                                            id: 'usuarioHandle',
                                            value: this._loginService.getUserProfile().id
                                        },
                                        total: response['total']
                                    })
                                ]
                        ),
                        catchError((err) => {
                            console.log(err);
                            return of(new AcompanhamentoListActions.GetAcompanhamentosFailed(err));
                        })
                    );
                })
            );

    /**
     * Delete Acompanhamento
     * @type {Observable<any>}
     */
    @Effect()
    deleteAcompanhamento: any =
        this._actions
            .pipe(
                ofType<AcompanhamentoListActions.DeleteAcompanhamento>(AcompanhamentoListActions.DELETE_ACOMPANHAMENTO),
                mergeMap((action) => {
                    return this._acompanhamentoService.destroy(action.payload).pipe(
                        map((response) => new AcompanhamentoListActions.DeleteAcompanhamentoSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new AcompanhamentoListActions.DeleteAcompanhamentoFailed(action.payload));
                        })
                    );
                })
            );
}
