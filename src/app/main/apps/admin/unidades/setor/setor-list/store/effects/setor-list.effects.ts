import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as SetorListActions from '../actions';

import {SetorService} from '@cdk/services/setor.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models/setor.model';
import {setor as setorSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import {CdkUtils} from '../../../../../../../../../@cdk/utils';

@Injectable()
export class SetorListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _setorService: SetorService,
        public _loginService: LoginService,
        private _store: Store<State>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Setores with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getSetores: any =
        this._actions
            .pipe(
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
            );

    /**
     * Delete Setor
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteSetor: any =
        this._actions
            .pipe(
                ofType<SetorListActions.DeleteSetor>(SetorListActions.DELETE_SETOR),
                mergeMap(action => this._setorService.destroy(action.payload).pipe(
                        map(response => new SetorListActions.DeleteSetorSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new SetorListActions.DeleteSetorFailed(
                                {
                                    [action.payload]: CdkUtils.errorsToString(err)
                                })
                            );
                        })
                    ))
            );

    /**
     * Transferir processos protocolo da unidade
     *
     * @type {Observable<any>}
     */
    @Effect()
    transferirProcessosProtocolo: any =
        this._actions
            .pipe(
                ofType<SetorListActions.TransferirProcessosProtocolo>(SetorListActions.TRANSFERIR_PROCESSOS_PROTOCOLO),
                mergeMap(action => this._setorService.transferirProcessosProtocolo(action.payload).pipe(
                        map(response => new SetorListActions.TransferirProcessosProtocoloSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new SetorListActions.TransferirProcessosProtocoloFailed(action.payload));
                        })
                    ))
            );
}
