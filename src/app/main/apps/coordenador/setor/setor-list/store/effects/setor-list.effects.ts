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
export class SetorListEffects {

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
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context)).pipe(
                        mergeMap((response) => [
                            new AddData<Setor>({data: response['entities'], schema: setorSchema}),
                            new SetorListActions.GetSetoresSuccess({
                                entitiesId: response['entities'].map(setor => setor.id),
                                loaded: {
                                    id: 'unidadeHandle',
                                    value: this.routerState.params['unidadeHandle'] ?
                                        this.routerState.params['unidadeHandle'] : this.routerState.params['entidadeHandle']
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
}