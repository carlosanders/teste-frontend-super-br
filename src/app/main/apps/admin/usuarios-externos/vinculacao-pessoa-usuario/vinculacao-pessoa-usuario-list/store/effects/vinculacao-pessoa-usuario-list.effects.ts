import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../../store/reducers';
import * as VinculacaoPessoaUsuarioListActions from '../actions';
import {LoginService} from '../../../../../../../auth/login/login.service';
import {VinculacaoPessoaUsuarioService} from '@cdk/services/vinculacao-pessoa-usuario.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {VinculacaoPessoaUsuario} from '@cdk/models';
import {vinculacaoPessoaUsuario as vinculacaoPessoaUsuarioSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class VinculacaoPessoaUsuarioListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _vinculacaoPessoaUsuarioService: VinculacaoPessoaUsuarioService,
        private _loginService: LoginService,
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
     * Get VinculacaoPessoaUsuario with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getVinculacaoPessoaUsuario: any =
        this._actions
            .pipe(
                ofType<VinculacaoPessoaUsuarioListActions.GetVinculacaoPessoaUsuario>(VinculacaoPessoaUsuarioListActions.GET_VINCULACAO_PESSOA_USUARIO),
                switchMap(action => this._vinculacaoPessoaUsuarioService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context)).pipe(
                        mergeMap(response => [
                            new AddData<VinculacaoPessoaUsuario>({data: response['entities'], schema: vinculacaoPessoaUsuarioSchema}),
                            new VinculacaoPessoaUsuarioListActions.GetVinculacaoPessoaUsuarioSuccess({
                                entitiesId: response['entities'].map(vinculacaoPessoaUsuario => vinculacaoPessoaUsuario.id),
                                loaded: {
                                    id: 'vinculacaoPessoaUsuarioHandle',
                                    value: this.routerState.params.usuariosExternosHandler
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new VinculacaoPessoaUsuarioListActions.GetVinculacaoPessoaUsuarioFailed(err));
                        })
                    ))
            );

    /**
     * Delete VinculacaoPessoaUsuario
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteVinculacaoPessoaUsuario: Observable<VinculacaoPessoaUsuarioListActions.VinculacaoPessoaUsuarioListActionsAll> =
        this._actions
            .pipe(
                ofType<VinculacaoPessoaUsuarioListActions.DeleteVinculacaoPessoaUsuario>(VinculacaoPessoaUsuarioListActions.DELETE_VINCULACAO_PESSOA_USUARIO),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'vinculacaoPessoaUsuario',
                        content: 'Apagando a vinculacaoPessoaUsuario id ' + action.payload.vinculacaoPessoaUsuarioId + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap((action) => {
                    return this._vinculacaoPessoaUsuarioService.destroy(action.payload.vinculacaoPessoaUsuarioId).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'vinculacaoPessoaUsuario',
                                content: 'VinculacaoPessoaUsuario id ' + action.payload.vinculacaoPessoaUsuarioId + ' deletada com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId
                            }));
                            new UpdateData<VinculacaoPessoaUsuario>({
                                id: response.id,
                                schema: vinculacaoPessoaUsuarioSchema,
                                changes: {apagadoEm: response.apagadoEm}
                            });
                            return new VinculacaoPessoaUsuarioListActions.DeleteVinculacaoPessoaUsuarioSuccess(response.id);
                        }),
                        catchError((err) => {
                            const payload = {
                                id: action.payload.vinculacaoPessoaUsuarioId,
                                error: err
                            };
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'vinculacaoPessoaUsuario',
                                content: 'Erro ao apagar a vinculacaoPessoaUsuario id ' + action.payload.vinculacaoPessoaUsuarioId + '!',
                                status: 2, // erro
                                lote: action.payload.loteId
                            }));
                            console.log(err);
                            return of(new VinculacaoPessoaUsuarioListActions.DeleteVinculacaoPessoaUsuarioFailed(payload));
                        })
                    );
                }, 25)
            );
}
