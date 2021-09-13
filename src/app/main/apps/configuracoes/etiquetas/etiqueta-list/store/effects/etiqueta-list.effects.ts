import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as EtiquetaListActions from '../actions';

import {EtiquetaService} from '@cdk/services/etiqueta.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Etiqueta} from '@cdk/models';
import {etiqueta as etiquetaSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class EtiquetaListEffect {

    routerState: any;
    /**
     * Get Etiquetas with router parameters
     *
     * @type {Observable<any>}
     */
    getEtiquetas: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<EtiquetaListActions.GetEtiquetas>(EtiquetaListActions.GET_ETIQUETAS),
        switchMap(action => this._etiquetaService.query(
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
                new AddData<Etiqueta>({data: response['entities'], schema: etiquetaSchema}),
                new EtiquetaListActions.GetEtiquetasSuccess({
                    entitiesId: response['entities'].map(etiqueta => etiqueta.id),
                    loaded: {
                        id: 'usuarioHandle',
                        value: this._loginService.getUserProfile().id
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new EtiquetaListActions.GetEtiquetasFailed(err));
            })
        ))
    ));
    /**
     * Delete Etiqueta
     *
     * @type {Observable<any>}
     */
    deleteEtiqueta: Observable<EtiquetaListActions.EtiquetaListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<EtiquetaListActions.DeleteEtiqueta>(EtiquetaListActions.DELETE_ETIQUETA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'etiqueta',
            content: 'Apagando a etiqueta id ' + action.payload.etiquetaId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._etiquetaService.destroy(action.payload.etiquetaId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'etiqueta',
                    content: 'Etiqueta id ' + action.payload.etiquetaId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Etiqueta>({
                    id: response.id,
                    schema: etiquetaSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new EtiquetaListActions.DeleteEtiquetaSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.etiquetaId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'etiqueta',
                    content: 'Erro ao apagar a etiqueta id ' + action.payload.etiquetaId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new EtiquetaListActions.DeleteEtiquetaFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _etiquetaService: EtiquetaService,
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
