import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as GrupoContatoListActions from '../actions';

import {GrupoContatoService} from '@cdk/services/grupo-contato.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {GrupoContato} from '@cdk/models';
import {grupoContato as grupoContatoSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class GrupoContatoListEffect {
    routerState: any;
    /**
     * Get GrupoContato with router parameters
     *
     * @type {Observable<any>}
     */
    getGrupoContato: any = createEffect(() => this._actions.pipe(
        ofType<GrupoContatoListActions.GetGrupoContato>(GrupoContatoListActions.GET_GRUPO_CONTATOS),
        switchMap(action => this._grupoContatoService.query(
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
                new AddData<GrupoContato>({data: response['entities'], schema: grupoContatoSchema}),
                new GrupoContatoListActions.GetGrupoContatoSuccess({
                    entitiesId: response['entities'].map(grupoContato => grupoContato.id),
                    loaded: {
                        id: 'usuarioHandle',
                        value: this._loginService.getUserProfile().id
                    },
                    total: response['total']
                })
            ]),
            catchError(err => of(new GrupoContatoListActions.GetGrupoContatoFailed(err)))
        ))
    ));
    /**
     * Delete GrupoContato
     *
     * @type {Observable<any>}
     */
    deleteGrupoContato: Observable<GrupoContatoListActions.GrupoContatoListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<GrupoContatoListActions.DeleteGrupoContato>(GrupoContatoListActions.DELETE_GRUPO_CONTATO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'grupo contato',
            content: 'Apagando o grupo contato id ' + action.payload.grupoContatoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._grupoContatoService.destroy(action.payload.grupoContatoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'grupo contato',
                    content: 'Grupo contato id ' + action.payload.grupoContatoId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<GrupoContato>({
                    id: response.id,
                    schema: grupoContatoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new GrupoContatoListActions.DeleteGrupoContatoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.grupoContatoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'grupo contato',
                    content: 'Erro ao apagar o grupo contato id ' + action.payload.grupoContatoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new GrupoContatoListActions.DeleteGrupoContatoFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _grupoContatoService: GrupoContatoService,
        public _loginService: LoginService,
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
