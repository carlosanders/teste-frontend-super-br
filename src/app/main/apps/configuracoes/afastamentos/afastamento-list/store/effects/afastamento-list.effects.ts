import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as AfastamentoListActions from '../actions';

import {AfastamentoService} from '@cdk/services/afastamento.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Afastamento} from '@cdk/models';
import {afastamento as afastamentoSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import {CdkUtils} from '../../../../../../../../@cdk/utils';

@Injectable()
export class AfastamentoListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _afastamentoService: AfastamentoService,
        public _loginService: LoginService,
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
     * Get Afastamentos with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getAfastamentos: any =
        this._actions
            .pipe(
                ofType<AfastamentoListActions.GetAfastamentos>(AfastamentoListActions.GET_AFASTAMENTOS),
                switchMap(action => this._afastamentoService.query(
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
                            new AddData<Afastamento>({data: response['entities'], schema: afastamentoSchema}),
                            new AfastamentoListActions.GetAfastamentosSuccess({
                                entitiesId: response['entities'].map(afastamento => afastamento.id),
                                loaded: {
                                    id: 'usuarioHandle',
                                    value: this._loginService.getUserProfile().id
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new AfastamentoListActions.GetAfastamentosFailed(err));
                        })
                    ))
            );

    /**
     * Delete Afastamento
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteAfastamento: any =
        this._actions
            .pipe(
                ofType<AfastamentoListActions.DeleteAfastamento>(AfastamentoListActions.DELETE_AFASTAMENTO),
                mergeMap(action => this._afastamentoService.destroy(action.payload).pipe(
                        map(response => new AfastamentoListActions.DeleteAfastamentoSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new AfastamentoListActions.DeleteAfastamentoFailed(
                                {
                                    [action.payload]: CdkUtils.errorsToString(err)
                                })
                            );
                        })
                    ), 25)
            );
}
