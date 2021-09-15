import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as NomeEditActions from '../actions/nome-edit.actions';
import * as NomeListActions from '../../../nome-list/store/actions/nome-list.actions';

import {NomeService} from '@cdk/services/nome.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {nome as nomeSchema} from '@cdk/normalizr';
import {Nome} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class NomeEditEffect {
    routerState: any;
    /**
     * Get Nome with router parameters
     *
     * @type {Observable<any>}
     */
    getNome: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<NomeEditActions.GetNome>(NomeEditActions.GET_NOME),
        switchMap(action => this._nomeService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
        switchMap(response => [
            new AddData<Nome>({data: response['entities'], schema: nomeSchema}),
            new NomeEditActions.GetNomeSuccess({
                loaded: {
                    id: 'nomeHandle',
                    value: this.routerState.params.nomeHandle
                },
                nomeId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new NomeEditActions.GetNomeFailed(err));
        })
    ));
    /**
     * Save Nome
     *
     * @type {Observable<any>}
     */
    saveNome: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<NomeEditActions.SaveNome>(NomeEditActions.SAVE_NOME),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'nome',
            content: 'Salvando o nome ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._nomeService.save(action.payload.nome).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'nome',
                content: 'Nome id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Nome) => [
                new NomeEditActions.SaveNomeSuccess(),
                new NomeListActions.ReloadNomes(),
                new AddData<Nome>({data: [response], schema: nomeSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'nome',
                    content: 'Erro ao salvar o nome!',
                    status: 2, // erro
                }));
                return of(new NomeEditActions.SaveNomeFailed(err));
            })
        ))
    ));
    /**
     * Save Nome Success
     */
    saveNomeSuccess: any = createEffect(() => this._actions.pipe(
        ofType<NomeEditActions.SaveNomeSuccess>(NomeEditActions.SAVE_NOME_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.nomeHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _nomeService: NomeService,
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
