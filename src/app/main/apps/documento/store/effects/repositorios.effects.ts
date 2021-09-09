import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as RepositoriosActions from '../actions/repositorios.actions';

import {RepositorioService} from '@cdk/services/repositorio.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Repositorio} from '@cdk/models';
import {repositorio as repositorioSchema} from '@cdk/normalizr';

@Injectable()
export class RepositoriosEffect {
    routerState: any;
    /**
     * Get Repositorios with router parameters
     *
     * @type {Observable<any>}
     */
    getRepositorios: any = createEffect(() => this._actions.pipe(
        ofType<RepositoriosActions.GetRepositorios>(RepositoriosActions.GET_REPOSITORIOS),
        switchMap(action => this._repositorioService.search(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate))),
        mergeMap(response => [
            new AddData<Repositorio>({data: response['entities'], schema: repositorioSchema}),
            new RepositoriosActions.GetRepositoriosSuccess({
                entitiesId: response['entities'].map(repositorio => repositorio.id),
                loaded: {
                    id: this.routerState.params.processoHandle ? 'processoHandle' : 'tarefaHandle',
                    value: this.routerState.params.processoHandle ? this.routerState.params.processoHandle : this.routerState.params.tarefaHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new RepositoriosActions.GetRepositoriosFailed(err));
        })
    ));

    constructor(
        private _actions: Actions,
        private _repositorioService: RepositorioService,
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
