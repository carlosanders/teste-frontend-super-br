import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

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
    /**
     * Get Repositorio with router parameters
     *
     * @type {Observable<any>}
     */
    getRepositorio: any = createEffect(() => this._actions.pipe(
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
        catchError((err) => {
            console.log(err);
            return of(new RepositorioEditActions.GetRepositorioFailed(err));
        })
    ));
    /**
     * Save Repositorio
     *
     * @type {Observable<any>}
     */
    saveRepositorio: any = createEffect(() => this._actions.pipe(
        ofType<RepositorioEditActions.SaveRepositorio>(RepositorioEditActions.SAVE_REPOSITORIO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'repositorio',
            content: 'Salvando a repositório ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._repositorioService.save(action.payload.repositorio).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'repositorio',
                content: 'Repositório id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Repositorio) => [
                new RepositorioEditActions.SaveRepositorioSuccess(),
                new RepositorioListActions.ReloadRepositorios(),
                new AddData<Repositorio>({data: [response], schema: repositorioSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'repositorio',
                    content: 'Erro ao salvar a repositório!',
                    status: 2, // erro
                }));
                return of(new RepositorioEditActions.SaveRepositorioFailed(err));
            })
        ))
    ));
    /**
     * Save Repositorio Success
     */
    saveRepositorioSuccess: any = createEffect(() => this._actions.pipe(
        ofType<RepositorioEditActions.SaveRepositorioSuccess>(RepositorioEditActions.SAVE_REPOSITORIO_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.repositorioHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _repositorioService: RepositorioService,
        private _store: Store<State>,
        public _loginService: LoginService,
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
