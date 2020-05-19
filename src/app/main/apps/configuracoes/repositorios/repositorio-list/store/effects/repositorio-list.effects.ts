import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as RepositorioListActions from '../actions';

import {RepositorioService} from '@cdk/services/repositorio.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Repositorio} from '@cdk/models';
import {repositorio as repositorioSchema} from '@cdk/normalizr/repositorio.schema';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class RepositorioListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _repositorioService: RepositorioService,
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
     * Get Repositorios with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getRepositorios: any =
        this._actions
            .pipe(
                ofType<RepositorioListActions.GetRepositorios>(RepositorioListActions.GET_REPOSITORIOS),
                switchMap((action) => {
                    return this._repositorioService.query(
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
                            new AddData<Repositorio>({data: response['entities'], schema: repositorioSchema}),
                            new RepositorioListActions.GetRepositoriosSuccess({
                                entitiesId: response['entities'].map(repositorio => repositorio.id),
                                loaded: {
                                    id: 'usuarioHandle',
                                    value: this._loginService.getUserProfile().id
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new RepositorioListActions.GetRepositoriosFailed(err));
                        })
                    );
                })
            );

    /**
     * Delete Repositorio
     * @type {Observable<any>}
     */
    @Effect()
    deleteRepositorio: any =
        this._actions
            .pipe(
                ofType<RepositorioListActions.DeleteRepositorio>(RepositorioListActions.DELETE_REPOSITORIO),
                mergeMap((action) => {
                    return this._repositorioService.destroy(action.payload).pipe(
                        map((response) => new RepositorioListActions.DeleteRepositorioSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new RepositorioListActions.DeleteRepositorioFailed(action.payload));
                        })
                    );
                })
            );
}
