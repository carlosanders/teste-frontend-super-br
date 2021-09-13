import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as SigiloListActions from '../actions';

import {SigiloService} from '@cdk/services/sigilo.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Sigilo} from '@cdk/models';
import {sigilo as sigiloSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class SigiloListEffect {
    routerState: any;
    /**
     * Get Sigilos with router parameters
     *
     * @type {Observable<any>}
     */
    getSigilos: any = createEffect(() => this._actions.pipe(
        ofType<SigiloListActions.GetSigilos>(SigiloListActions.GET_SIGILOS),
        switchMap(action => this._sigiloService.query(
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
            new AddData<Sigilo>({data: response['entities'], schema: sigiloSchema}),
            new SigiloListActions.GetSigilosSuccess({
                entitiesId: response['entities'].map(sigilo => sigilo.id),
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new SigiloListActions.GetSigilosFailed(err));
        })
    ));
    /**
     * Delete Sigilo
     *
     * @type {Observable<any>}
     */
    deleteSigilo: Observable<SigiloListActions.SigiloListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<SigiloListActions.DeleteSigilo>(SigiloListActions.DELETE_SIGILO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'sigilo',
            content: 'Apagando o sigilo id ' + action.payload.sigiloId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._sigiloService.destroy(action.payload.sigiloId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'sigilo',
                    content: 'Sigilo id ' + action.payload.sigiloId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Sigilo>({
                    id: response.id,
                    schema: sigiloSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new SigiloListActions.DeleteSigiloSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.sigiloId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'sigilo',
                    content: 'Erro ao apagar o sigilo id ' + action.payload.sigiloId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new SigiloListActions.DeleteSigiloFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _sigiloService: SigiloService,
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
