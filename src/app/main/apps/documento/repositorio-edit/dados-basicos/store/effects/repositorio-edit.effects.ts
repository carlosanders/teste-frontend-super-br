import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as RepositoriosActions from '../actions/repositorio-edit.actions';

import {RepositorioService} from '@cdk/services/repositorio.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Repositorio} from '@cdk/models';
import {repositorio as repositorioSchema} from '@cdk/normalizr';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class RepositorioEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _repositorioService: RepositorioService,
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
     * Save Documento
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveRepositorio: any =
        this._actions
            .pipe(
                ofType<RepositoriosActions.SaveRepositorio>(RepositoriosActions.SAVE_REPOSITORIO),
                tap((action) => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'repositório',
                    content: 'Salvando o repositório ...',
                    status: 0, // carregando
                }))),
                switchMap(action => {
                    return this._repositorioService.save(action.payload.repositorio).pipe(
                        tap((response) =>
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'repositório',
                                content: 'Repositório id ' + response.id + ' salvo com sucesso.',
                                status: 1, // sucesso
                            }))
                        ),
                        mergeMap((response: Repositorio) => [
                            new RepositoriosActions.SaveRepositorioSuccess(),
                            new AddData<Repositorio>({data: [response], schema: repositorioSchema})
                        ]),
                        catchError((err) => {
                            console.log(err);
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'repositório',
                                content: 'Erro ao salvar o repositório!',
                                status: 2, // erro
                            }));
                            return of(new RepositoriosActions.SaveRepositorioFailed(err));
                        })
                    )
                })
            );

}
