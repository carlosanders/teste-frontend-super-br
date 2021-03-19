import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, switchMap, mergeMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as RepositoriosActions from '../actions/repositorios.actions';

import {RepositorioService} from '@cdk/services/repositorio.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Repositorio} from '@cdk/models';
import {repositorio as repositorioSchema} from '@cdk/normalizr';

@Injectable()
export class RepositoriosEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _repositorioService: RepositorioService,
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
                ofType<RepositoriosActions.GetRepositorios>(RepositoriosActions.GET_REPOSITORIOS),
                switchMap((action) => {
                    const filter = {
                        ...action.payload.filter,
                        ...action.payload.gridFilter,
                    };
                    let mode = 'query';
                    if (filter.hasOwnProperty('documento.componentesDigitais.conteudo')) {
                        mode = 'search';
                    }
                    return this._repositorioService[`${mode}`](
                        JSON.stringify(filter),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate));
                }),
                mergeMap((response) => [
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
                catchError((err, caught) => {
                    console.log (err);
                    this._store.dispatch(new RepositoriosActions.GetRepositoriosFailed(err));
                    return caught;
                })

            );
}
