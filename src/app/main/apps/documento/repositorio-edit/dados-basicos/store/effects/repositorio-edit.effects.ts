import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

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
    /**
     * Save Documento
     *
     * @type {Observable<any>}
     */
    saveRepositorio: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RepositoriosActions.SaveRepositorio>(RepositoriosActions.SAVE_REPOSITORIO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tese',
            content: 'Salvando a tese ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._repositorioService.save(action.payload.repositorio).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'tese',
                content: 'Repositório id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Repositorio) => [
                new RepositoriosActions.SaveRepositorioSuccess(),
                new AddData<Repositorio>({data: [response], schema: repositorioSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tese',
                    content: 'Erro ao salvar a tese!',
                    status: 2, // erro
                }));
                return of(new RepositoriosActions.SaveRepositorioFailed(err));
            })
        ))
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
