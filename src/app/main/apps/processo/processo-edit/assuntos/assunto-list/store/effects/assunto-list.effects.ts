import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as AssuntoListActions from '../actions';

import {AssuntoService} from '@cdk/services/assunto.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Assunto} from '@cdk/models';
import {assunto as assuntoSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class AssuntoListEffect {

    routerState: any;
    /**
     * Get Assuntos with router parameters
     *
     * @type {Observable<any>}
     */
    getAssuntos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AssuntoListActions.GetAssuntos>(AssuntoListActions.GET_ASSUNTOS),
        switchMap(action => this._assuntoService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context)
        )),
        mergeMap(response => [
            new AddData<Assunto>({data: response['entities'], schema: assuntoSchema}),
            new AssuntoListActions.GetAssuntosSuccess({
                entitiesId: response['entities'].map(assunto => assunto.id),
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new AssuntoListActions.GetAssuntosFailed(err));
        })
    ));
    /**
     * Delete Assunto
     *
     * @type {Observable<any>}
     */
    deleteAssunto: Observable<AssuntoListActions.AssuntoListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<AssuntoListActions.DeleteAssunto>(AssuntoListActions.DELETE_ASSUNTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'assunto',
            content: 'Apagando o assunto id ' + action.payload.assuntoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._assuntoService.destroy(action.payload.assuntoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'assunto',
                    content: 'Assunto id ' + action.payload.assuntoId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Assunto>({
                    id: response.id,
                    schema: assuntoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new AssuntoListActions.DeleteAssuntoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.assuntoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'assunto',
                    content: 'Erro ao apagar o assunto id ' + action.payload.assuntoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new AssuntoListActions.DeleteAssuntoFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _assuntoService: AssuntoService,
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
