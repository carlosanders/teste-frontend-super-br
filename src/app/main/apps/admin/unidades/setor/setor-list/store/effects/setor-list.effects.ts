import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as SetorListActions from '../actions';

import {SetorService} from '@cdk/services/setor.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models/setor.model';
import {setor as setorSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class SetorListEffect {
    routerState: any;
    /**
     * Get Setores with router parameters
     *
     * @type {Observable<any>}
     */
    getSetores: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<SetorListActions.GetSetores>(SetorListActions.GET_SETORES),
        switchMap(action => this._setorService.query(
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
                new AddData<Setor>({data: response['entities'], schema: setorSchema}),
                new SetorListActions.GetSetoresSuccess({
                    entitiesId: response['entities'].map(setor => setor.id),
                    loaded: {
                        id: 'unidadeHandle',
                        value: this.routerState.params['unidadeHandle']
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new SetorListActions.GetSetoresFailed(err));
            })
        ))
    ));
    /**
     * Delete Setor
     *
     * @type {Observable<any>}
     */
    deleteSetor: Observable<SetorListActions.SetorListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<SetorListActions.DeleteSetor>(SetorListActions.DELETE_SETOR),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'setor',
            content: 'Apagando o setor id ' + action.payload.setorId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._setorService.destroy(action.payload.setorId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'setor',
                    content: 'Setor id ' + action.payload.setorId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Setor>({
                    id: response.id,
                    schema: setorSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new SetorListActions.DeleteSetorSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.setorId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'setor',
                    content: 'Erro ao apagar o setor id ' + action.payload.setorId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new SetorListActions.DeleteSetorFailed(payload));
            })
        ), 25)
    ));
    /**
     * Transferir processos protocolo da unidade
     *
     * @type {Observable<any>}
     */
    transferirProcessosProtocolo: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<SetorListActions.TransferirProcessosProtocolo>(SetorListActions.TRANSFERIR_PROCESSOS_PROTOCOLO),
        mergeMap(action => this._setorService.transferirProcessosProtocolo(action.payload).pipe(
            map(response => new SetorListActions.TransferirProcessosProtocoloSuccess(response.id)),
            catchError((err) => {
                console.log(err);
                return of(new SetorListActions.TransferirProcessosProtocoloFailed(action.payload));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _setorService: SetorService,
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
