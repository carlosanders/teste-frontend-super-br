import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as EnderecoListActions from '../actions';

import {EnderecoService} from '@cdk/services/endereco.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Endereco} from '@cdk/models';
import {endereco as enderecoSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class EnderecoListEffect {
    routerState: any;
    /**
     * Get Enderecos with router parameters
     *
     * @type {Observable<any>}
     */
    getEnderecos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<EnderecoListActions.GetEnderecos>(EnderecoListActions.GET_ENDERECOS),
        switchMap(action => this._enderecoService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify([
                'municipio', 'municipio.estado', 'pais', 'pessoa', 'origemDados'
            ]))),
        mergeMap(response => [
            new AddData<Endereco>({data: response['entities'], schema: enderecoSchema}),
            new EnderecoListActions.GetEnderecosSuccess({
                entitiesId: response['entities'].map(endereco => endereco.id),
                loaded: {
                    id: 'pessoaHandle',
                    value: this.routerState.params.pessoaHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new EnderecoListActions.GetEnderecosFailed(err));
        })
    ));
    /**
     * Delete Endereco
     *
     * @type {Observable<any>}
     */
    deleteEndereco: Observable<EnderecoListActions.EnderecoListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<EnderecoListActions.DeleteEndereco>(EnderecoListActions.DELETE_ENDERECO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'endereço',
            content: 'Apagando endereço id ' + action.payload.enderecoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._enderecoService.destroy(action.payload.enderecoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'endereço',
                    content: 'Endereço id ' + action.payload.enderecoId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Endereco>({
                    id: response.id,
                    schema: enderecoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new EnderecoListActions.DeleteEnderecoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.enderecoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'endereço',
                    content: 'Erro ao apagar endereço id ' + action.payload.enderecoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new EnderecoListActions.DeleteEnderecoFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _enderecoService: EnderecoService,
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
