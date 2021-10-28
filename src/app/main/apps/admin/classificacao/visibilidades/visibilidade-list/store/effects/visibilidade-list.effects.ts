import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as fromStore from '../index'

import {ClassificacaoService} from '@cdk/services/classificacao.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Visibilidade} from '@cdk/models';
import {visibilidade as visibilidadeSchema} from '@cdk/normalizr';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class VisibilidadeListEffect {
    routerState: any;

    constructor(private _actions: Actions,
                private _classificacaoService: ClassificacaoService,
                private _store: Store<State>) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    /**
     * Get Visibilidades with router parameters
     *
     * @type {Observable<any>}
     */
    getVisibilidades: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.GetVisibilidades>(fromStore.GET_VISIBILIDADES),
        switchMap(action => this._classificacaoService.getVisibilidade(
            action.payload)),
        mergeMap(response => [
            new AddData<Visibilidade>({data: response, schema: visibilidadeSchema}),
            new fromStore.GetVisibilidadesSuccess({
                entitiesId: response.map(visibilidade => visibilidade.id),
                loaded: {
                    id: 'classificacaoHandle',
                    value: this.routerState.params['classificacaoHandle']
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            return of(new fromStore.GetVisibilidadesFailed(err));
        })
    ));

    /**
     * Delete Visibilidade
     *
     * @type {Observable<any>}
     */
    deleteVisibilidade: Observable<fromStore.VisibilidadeListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<fromStore.DeleteVisibilidade>(fromStore.DELETE_VISIBILIDADE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'classificacao visibilidade',
            content: 'Apagando a visibilidade id ' + action.payload.visibilidadeId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._classificacaoService.destroyVisibilidade(action.payload.classificacaoId, action.payload.visibilidadeId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'classificacao visibilidade',
                    content: 'Visibilidade id ' + action.payload.visibilidadeId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                return new fromStore.DeleteVisibilidadeSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.visibilidadeId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'classificacao visibilidade',
                    content: 'Erro ao apagar a visibilidade id ' + action.payload.visibilidadeId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                return of(new fromStore.DeleteVisibilidadeFailed(payload));
            })
        ), 25)
    ));
}
