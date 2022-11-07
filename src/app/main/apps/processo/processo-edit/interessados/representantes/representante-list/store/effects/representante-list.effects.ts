import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, RouterStateUrl, State} from 'app/store/reducers';
import * as RepresentanteListActions from '../actions';
import {RepresentanteService} from '@cdk/services/representante.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Representante} from '@cdk/models';
import {representante as representanteSchema} from '@cdk/normalizr';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class RepresentanteListEffect {
    routerState: RouterStateUrl;

    getRepresentantes: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RepresentanteListActions.GetRepresentantes>(RepresentanteListActions.GET_REPRESENTANTES),
        switchMap(action => this._representanteService.query(
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
            new AddData<Representante>({data: response['entities'], schema: representanteSchema}),
            new RepresentanteListActions.GetRepresentantesSuccess({
                entitiesId: response['entities'].map(representante => representante.id),
                loaded: {
                    id: 'interessadoHandle',
                    value: this.routerState.params.interessadoHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new RepresentanteListActions.GetRepresentantesFailed(err));
        })
    ));
    /**
     * Delete Representante
     *
     * @type {Observable<any>}
     */
    deleteRepresentante: Observable<RepresentanteListActions.RepresentanteListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<RepresentanteListActions.DeleteRepresentante>(RepresentanteListActions.DELETE_REPRESENTANTE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'representante',
            content: 'Apagando o representante id ' + action.payload.representanteId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._representanteService.destroy(action.payload.representanteId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'representante',
                    content: 'Representante id ' + action.payload.representanteId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Representante>({
                    id: response.id,
                    schema: representanteSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new RepresentanteListActions.DeleteRepresentanteSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.representanteId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'representante',
                    content: 'Erro ao apagar o representante id ' + action.payload.representanteId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new RepresentanteListActions.DeleteRepresentanteFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _representanteService: RepresentanteService,
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
