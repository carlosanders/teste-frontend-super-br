import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

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
    /**
     * Get VinculacoesUsuarios with router parameters
     *
     * @type {Observable<any>}
     */
    getVinculacoesUsuarios: any = createEffect(() => this._actions.pipe(
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
        catchError((err) => {
            console.log(err);
            return of(new VinculacaoUsuarioListActions.GetVinculacoesUsuariosFailed(err));
        })
    ));
    /**
     * Delete VinculacaoUsuario
     *
     * @type {Observable<any>}
     */
    deleteVinculacaoUsuario: Observable<VinculacaoUsuarioListActions.VinculacaoUsuarioListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<VinculacaoUsuarioListActions.DeleteVinculacaoUsuario>(VinculacaoUsuarioListActions.DELETE_VINCULACAO_USUARIO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'vinculação usuário',
            content: 'Apagando a vinculação usuário id ' + action.payload.vinculacaoUsuarioId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._vinculacaoUsuarioService.destroy(action.payload.vinculacaoUsuarioId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'vinculação usuário',
                    content: 'Vinculação usuário id ' + action.payload.vinculacaoUsuarioId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<VinculacaoUsuario>({
                    id: response.id,
                    schema: vinculacaoUsuarioSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new VinculacaoUsuarioListActions.DeleteVinculacaoUsuarioSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.vinculacaoUsuarioId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'vinculação usuário',
                    content: 'Erro ao apagar a vinculação usuário id ' + action.payload.vinculacaoUsuarioId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new VinculacaoUsuarioListActions.DeleteVinculacaoUsuarioFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _vinculacaoUsuarioService: VinculacaoUsuarioService,
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
