import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import * as InteressadoActions from '../actions/interessado.actions';

import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Interessado} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {interessado as interessadoSchema} from '@cdk/normalizr';
import {InteressadoService} from '@cdk/services/interessado.service';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';
import {getInteressadosPagination} from '../selectors';

@Injectable()
export class InteressadosEffect {
    routerState: any;
    /**
     * Get Interessados Processo
     *
     * @type {Observable<any>}
     */
    getInteressadosProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<InteressadoActions.GetInteressados>(InteressadoActions.GET_INTERESSADOS),
        switchMap(action => this._interessadoService.query(
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
            new AddData<Interessado>({data: response['entities'], schema: interessadoSchema}),
            new InteressadoActions.GetInteressadosSuccess({
                entitiesId: response['entities'].map(interessado => interessado.id),
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle,
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new InteressadoActions.GetInteressadosFailed(err));
        })
    ));
    /**
     * Delete Interessado
     *
     * @type {Observable<any>}
     */
    deleteInteressado: Observable<InteressadoActions.InteressadoActionsAll> = createEffect(() => this._actions.pipe(
        ofType<InteressadoActions.DeleteInteressado>(InteressadoActions.DELETE_INTERESSADO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'interessado',
            content: 'Apagando interessado id ' + action.payload.interessadoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._interessadoService.destroy(action.payload.interessadoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'interessado',
                    content: 'Interessado id ' + action.payload.interessadoId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Interessado>({
                    id: response.id,
                    schema: interessadoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new InteressadoActions.DeleteInteressadoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.interessadoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'interessado',
                    content: 'Erro ao apagar interessado id ' + action.payload.interessadoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new InteressadoActions.DeleteInteressadoFailed(payload));
            })
        ), 25)
    ));
    /**
     * Save Interessado
     *
     * @type {Observable<any>}
     */
    saveInteressado: any = createEffect(() => this._actions.pipe(
        ofType<InteressadoActions.SaveInteressado>(InteressadoActions.SAVE_INTERESSADO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'interessado',
            content: 'Salvando interessado ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._interessadoService.save(action.payload.interessado).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'interessado',
                content: 'Interessado id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Interessado) => [
                new InteressadoActions.SaveInteressadoSuccess(),
                new AddData<Interessado>({data: [response], schema: interessadoSchema}),
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'interessado',
                    content: 'Erro ao salvar interessado!',
                    status: 2, // erro
                }));
                return of(new InteressadoActions.SaveInteressadoFailed(err));
            })
        ))
    ));
    /**
     * Save Interessado Success
     *
     * @type {Observable<any>}
     */
    saveInteressadoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<InteressadoActions.SaveInteressadoSuccess>(InteressadoActions.SAVE_INTERESSADO_SUCCESS),
        withLatestFrom(this._store.pipe(select(getInteressadosPagination))),
        tap(([, pagination]) => {
            this._store.dispatch(new InteressadoActions.GetInteressados(pagination));
        }),
    ), {dispatch: false});

    /**
     *
     * @param _actions
     * @param _interessadoService
     * @param _store
     * @param _router
     */
    constructor(
        private _actions: Actions,
        private _interessadoService: InteressadoService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
