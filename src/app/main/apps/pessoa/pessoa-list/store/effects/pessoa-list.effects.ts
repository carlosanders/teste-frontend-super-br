import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as PessoaListActions from 'app/main/apps/pessoa/pessoa-list/store/actions';

import {PessoaService} from '@cdk/services/pessoa.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Pessoa} from '@cdk/models';
import {pessoa as pessoaSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../store/actions/operacoes.actions';

@Injectable()
export class PessoaListEffect {
    routerState: any;
    /**
     * Get Pessoas with router parameters
     *
     * @type {Observable<any>}
     */
    getPessoas: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<PessoaListActions.GetPessoas>(PessoaListActions.GET_PESSOAS),
        switchMap(action => this._pessoaService.search(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(['populateAll'])
        )),
        mergeMap(response => [
            new AddData<Pessoa>({data: response['entities'], schema: pessoaSchema}),
            new PessoaListActions.GetPessoasSuccess({
                entitiesId: response['entities'].map(pessoa => pessoa.id),
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new PessoaListActions.GetPessoasFailed(err));
        })
    ));
    /**
     * Delete Pessoa
     *
     * @type {Observable<any>}
     */
    deletePessoa: Observable<PessoaListActions.PessoaListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<PessoaListActions.DeletePessoa>(PessoaListActions.DELETE_PESSOA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'pessoa',
            content: 'Apagando a pessoa id ' + action.payload.pessoaId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._pessoaService.destroy(action.payload.pessoaId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'pessoa',
                    content: 'Pessoa id ' + action.payload.pessoaId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Pessoa>({
                    id: response.id,
                    schema: pessoaSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new PessoaListActions.DeletePessoaSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.pessoaId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'pessoa',
                    content: 'Erro ao apagar a pessoa id ' + action.payload.pessoaId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new PessoaListActions.DeletePessoaFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _pessoaService: PessoaService,
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
