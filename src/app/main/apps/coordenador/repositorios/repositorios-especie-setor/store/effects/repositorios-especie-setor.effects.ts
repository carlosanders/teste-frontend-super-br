import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

import * as RepositoriosEspecieSetorActions from '../actions/repositorios-especie-setor.actions';

import {RepositorioService} from '@cdk/services/repositorio.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {repositorio as repositorioSchema} from '@cdk/normalizr/repositorio.schema';
import {Repositorio} from '@cdk/models';

@Injectable()
export class RepositoriosEspecieSetorEffects {
    routerState: any;

    /**
     *
     * @param _actions
     * @param _repositorioService
     * @param _store
     * @param _router
     */
    constructor(
        private _actions: Actions,
        private _repositorioService: RepositorioService,
        private _store: Store<State>,
        private _router: Router
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
     * Get Repositorio with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getRepositorio: any =
        this._actions
            .pipe(
                ofType<RepositoriosEspecieSetorActions.GetRepositorio>(RepositoriosEspecieSetorActions.GET_REPOSITORIO),
                switchMap((action) => {
                    return this._repositorioService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll',
                            'documento.componentesDigitais',
                            'vinculacoesRepositorios',
                            'vinculacoesRepositorios.setor',
                            'vinculacoesRepositorios.orgaoCentral',
                        ]));
                }),
                switchMap(response => [
                    new AddData<Repositorio>({data: response['entities'], schema: repositorioSchema}),
                    new RepositoriosEspecieSetorActions.GetRepositorioSuccess({
                        loaded: {
                            id: 'repositorioHandle',
                            value: this.routerState.params.repositorioHandle
                        },
                        repositorioId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new RepositoriosEspecieSetorActions.GetRepositorioFailed(err));
                    return caught;
                })
            );
}
