import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as CoordenadoresListActions from '../actions';

import {CoordenadorService} from '@cdk/services/coordenador.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Coordenador} from '@cdk/models/coordenador.model';
import {coordenador as coordenadorSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class CoordenadoresListEffects {
    routerState: any;
    /**
     * Get Coordenadores with router parameters
     *
     * @type {Observable<any>}
     */
    getCoordenadores: any = createEffect(() => this._actions.pipe(
        ofType<CoordenadoresListActions.GetCoordenadores>(CoordenadoresListActions.GET_COORDENADORES),
        switchMap(action => this._coordenadorService.query(
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
                new AddData<Coordenador>({data: response['entities'], schema: coordenadorSchema}),
                new CoordenadoresListActions.GetCoordenadoresSuccess({
                    entitiesId: response['entities'].map(coordenador => coordenador.id),
                    loaded: {
                        id: 'usuarioHandle',
                        value: this.routerState.params.usuarioHandle
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new CoordenadoresListActions.GetCoordenadoresFailed(err));
            })
        ))
    ));
    /**
     * Delete Coordenador
     *
     * @type {Observable<any>}
     */
    deleteCoordenador: Observable<CoordenadoresListActions.CoordenadoresListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<CoordenadoresListActions.DeleteCoordenador>(CoordenadoresListActions.DELETE_COORDENADOR),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'coordenador',
            content: 'Apagando coordenador id ' + action.payload.coordenadorId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._coordenadorService.destroy(action.payload.coordenadorId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'coordenador',
                    content: 'Coordenador id ' + action.payload.coordenadorId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Coordenador>({
                    id: response.id,
                    schema: coordenadorSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new CoordenadoresListActions.DeleteCoordenadorSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.coordenadorId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'coordenador',
                    content: 'Erro ao apagar coordenador id ' + action.payload.coordenadorId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new CoordenadoresListActions.DeleteCoordenadorFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _coordenadorService: CoordenadorService,
        private _loginService: LoginService,
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
