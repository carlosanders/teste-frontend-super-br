import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as SetorListActions from '../actions';

import {SetorService} from '@cdk/services/setor.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models/setor.model';
import {setor as setorSchema} from '@cdk/normalizr/setor.schema';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

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
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Setores with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getSetores: any =
        this._actions
            .pipe(
                ofType<SetorListActions.GetSetores>(SetorListActions.GET_SETORES),
                switchMap((action) => {
                    return this._setorService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate)).pipe(
                        mergeMap((response) => [
                            new AddData<Setor>({data: response['entities'], schema: setorSchema}),
                            new SetorListActions.GetSetoresSuccess({
                                entitiesId: response['entities'].map(setor => setor.id),
                                loaded: {
                                    id: 'setorHandle',
                                    value: this._loginService.getUserProfile().id
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new SetorListActions.GetSetoresFailed(err));
                        })
                    );
                })
            );

    /**
     * Delete Setor
     * @type {Observable<any>}
     */
    @Effect()
    deleteSetor: any =
        this._actions
            .pipe(
                ofType<SetorListActions.DeleteSetor>(SetorListActions.DELETE_SETOR),
                mergeMap((action) => {
                    return this._setorService.destroy(action.payload).pipe(
                        map((response) => new SetorListActions.DeleteSetorSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new SetorListActions.DeleteSetorFailed(action.payload));
                        })
                    );
                })
            );

    /**
     * Save Setor
     * @type {Observable<any>}
     */
    @Effect()
    saveSetor: any =
        this._actions
            .pipe(
                ofType<SetorListActions.SaveSetor>(SetorListActions.SAVE_SETOR),
                switchMap((action) => {
                    return this._setorService.save(action.payload.setor).pipe(
                        mergeMap((response: Setor) => [
                            new UpdateData<Setor>({id: response.id, schema: setorSchema, changes: {}}),
                            new SetorListActions.SaveSetorSuccess(),  new OperacoesActions.Resultado({
                                type: 'setor',
                                content: `Setor id ${response.id} editada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new SetorListActions.SaveSetorFailed(err));
                        })
                    );
                })
            );
}
