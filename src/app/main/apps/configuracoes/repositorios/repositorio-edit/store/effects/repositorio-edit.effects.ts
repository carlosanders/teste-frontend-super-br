import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as RepositorioEditActions from '../actions/repositorio-edit.actions';
import * as RepositorioListActions from '../../../repositorio-list/store/actions/repositorio-list.actions';

import {RepositorioService} from '@cdk/services/repositorio.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {repositorio as repositorioSchema} from '@cdk/normalizr';
import {Repositorio} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class RepositorioEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _repositorioService: RepositorioService,
        private _store: Store<State>,
        public _loginService: LoginService,
        private _router: Router
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
     * Get Repositorio with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getRepositorio: any =
        this._actions
            .pipe(
                ofType<RepositorioEditActions.GetRepositorio>(RepositorioEditActions.GET_REPOSITORIO),
                switchMap(action => this._repositorioService.get(
                        action.payload.id,
                        JSON.stringify([
                            'populateAll'
                        ]),
                        JSON.stringify({isAdmin: true}))),
                switchMap(response => [
                    new AddData<Repositorio>({data: [response], schema: repositorioSchema}),
                    new RepositorioEditActions.GetRepositorioSuccess({
                        loaded: {
                            id: 'repositorioHandle',
                            value: this.routerState.params.repositorioHandle
                        },
                        repositorioId: this.routerState.params.repositorioHandle
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new RepositorioEditActions.GetRepositorioFailed(err));
                    return caught;
                })
            );

    /**
     * Save Repositorio
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveRepositorio: any =
        this._actions
            .pipe(
                ofType<RepositorioEditActions.SaveRepositorio>(RepositorioEditActions.SAVE_REPOSITORIO),
                tap(() => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        type: 'repositorio',
                        content: 'Salvando a repositorio ...',
                        status: 0, // carregando
                    }));
                }),
                switchMap(action => this._repositorioService.save(action.payload).pipe(
                    tap(() =>
                        this._store.dispatch(new OperacoesActions.Operacao({
                            type: 'repositorio',
                            content: 'Repositorio salva com sucesso.',
                            status: 1, // sucesso
                        }))),
                    mergeMap((response: Repositorio) => [
                        new RepositorioEditActions.SaveRepositorioSuccess(),
                        new RepositorioListActions.ReloadRepositorios(),
                        new AddData<Repositorio>({data: [response], schema: repositorioSchema})
                    ])
                )),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        type: 'repositorio',
                        content: 'Erro ao salvar a repositorio!',
                        status: 2, // erro
                    }));
                    return of(this._store.dispatch(new RepositorioEditActions.SaveRepositorioFailed(err)));
                })
            );

    /**
     * Save Repositorio Success
     */
    @Effect({dispatch: false})
    saveRepositorioSuccess: any =
        this._actions
            .pipe(
                ofType<RepositorioEditActions.SaveRepositorioSuccess>(RepositorioEditActions.SAVE_REPOSITORIO_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.repositorioHandle), 'listar')]).then();
                })
            );
}
