import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as VinculacaoUsuarioListActions from '../actions';

import {VinculacaoUsuarioService} from '@cdk/services/vinculacao-usuario.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {VinculacaoUsuario} from '@cdk/models';
import {vinculacaoUsuario as vinculacaoUsuarioSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class VinculacaoUsuarioListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _vinculacaoUsuarioService: VinculacaoUsuarioService,
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
     * Get VinculacoesUsuarios with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getVinculacoesUsuarios: any =
        this._actions
            .pipe(
                ofType<VinculacaoUsuarioListActions.GetVinculacoesUsuarios>(VinculacaoUsuarioListActions.GET_VINCULACOES_USUARIOS),
                switchMap(action => this._vinculacaoUsuarioService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context))),
                mergeMap(response => [
                    new AddData<VinculacaoUsuario>({data: response['entities'], schema: vinculacaoUsuarioSchema}),
                    new VinculacaoUsuarioListActions.GetVinculacoesUsuariosSuccess({
                        entitiesId: response['entities'].map(vinculacaoUsuario => vinculacaoUsuario.id),
                        loaded: {
                            id: 'usuarioHandle',
                            value: this.routerState.params.usuarioHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log (err);
                    this._store.dispatch(new VinculacaoUsuarioListActions.GetVinculacoesUsuariosFailed(err));
                    return caught;
                })

            );

    /**
     * Delete VinculacaoUsuario
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteVinculacaoUsuario: Observable<VinculacaoUsuarioListActions.VinculacaoUsuarioListActionsAll> =
        this._actions
            .pipe(
                ofType<VinculacaoUsuarioListActions.DeleteVinculacaoUsuario>(VinculacaoUsuarioListActions.DELETE_VINCULACAO_USUARIO),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'vinculacaoUsuario',
                        content: 'Apagando a vinculacaoUsuario id ' + action.payload.vinculacaoUsuarioId + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap((action) => {
                    return this._vinculacaoUsuarioService.destroy(action.payload.vinculacaoUsuarioId).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'vinculacaoUsuario',
                                content: 'VinculacaoUsuario id ' + action.payload.vinculacaoUsuarioId + ' deletada com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId
                            }));
                            new UpdateData<VinculacaoUsuario>({
                                id: response.id,
                                schema: vinculacaoUsuarioSchema,
                                changes: {apagadoEm: response.apagadoEm}
                            });
                            return new VinculacaoUsuarioListActions.DeleteVinculacaoUsuarioSuccess(response.id);
                        }),
                        catchError((err) => {
                            const payload = {
                                id: action.payload.vinculacaoUsuarioId,
                                error: err
                            };
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'vinculacaoUsuario',
                                content: 'Erro ao apagar a vinculacaoUsuario id ' + action.payload.vinculacaoUsuarioId + '!',
                                status: 2, // erro
                                lote: action.payload.loteId
                            }));
                            console.log(err);
                            return of(new VinculacaoUsuarioListActions.DeleteVinculacaoUsuarioFailed(payload));
                        })
                    );
                }, 25)
            );
}
