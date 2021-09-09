import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap} from 'rxjs/operators';

import * as RepositoriosEspecieSetorActions from '../actions/repositorios-especie-setor.actions';

import {RepositorioService} from '@cdk/services/repositorio.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {repositorio as repositorioSchema} from '@cdk/normalizr';
import {Repositorio} from '@cdk/models';

@Injectable()
export class RepositoriosEspecieSetorEffects {
    routerState: any;
    /**
     * Get Repositorio with router parameters
     *
     * @type {Observable<any>}
     */
    getRepositorio: any = createEffect(() => this._actions.pipe(
        ofType<RepositoriosEspecieSetorActions.GetRepositorio>(RepositoriosEspecieSetorActions.GET_REPOSITORIO),
        switchMap(action => this._repositorioService.get(
            action.payload.id,
            JSON.stringify([
                'populateAll',
                'vinculacoesRepositorios',
                'vinculacoesRepositorios.setor',
                'vinculacoesRepositorios.usuario',
                'vinculacoesRepositorios.modalidadeOrgaoCentral',
            ]),
            JSON.stringify({isAdmin: true}),
        )),
        switchMap(response => [
            new AddData<Repositorio>({data: [response], schema: repositorioSchema}),
            new RepositoriosEspecieSetorActions.GetRepositorioSuccess({
                loaded: {
                    id: 'repositorioHandle',
                    value: this.routerState.params.repositorioHandle
                },
                repositorioId: this.routerState.params.repositorioHandle
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new RepositoriosEspecieSetorActions.GetRepositorioFailed(err));
        })
    ));

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
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
