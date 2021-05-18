import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../store/reducers';
import * as EspecieSetorListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {EspecieSetorService} from '@cdk/services/especie-setor.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {EspecieSetor} from '@cdk/models';
import {especieSetor as especieSetorSchema} from '@cdk/normalizr';
import {CdkUtils} from "../../../../../../../../@cdk/utils";

@Injectable()
export class EspecieSetorListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _especieSetorService: EspecieSetorService,
        private _loginService: LoginService,
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
     * Get EspecieSetor with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getEspecieSetor: any =
        this._actions
            .pipe(
                ofType<EspecieSetorListActions.GetEspecieSetor>(EspecieSetorListActions.GET_ESPECIE_SETOR),
                switchMap((action) => {
                    return this._especieSetorService.query(
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
                            new AddData<EspecieSetor>({data: response['entities'], schema: especieSetorSchema}),
                            new EspecieSetorListActions.GetEspecieSetorSuccess({
                                entitiesId: response['entities'].map(especieSetor => especieSetor.id),
                                loaded: {
                                    id: 'especieSetorHandle',
                                    value: this.routerState.params.especieSetorHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new EspecieSetorListActions.GetEspecieSetorFailed(err));
                        })
                    );
                })
            );

    /**
     * Delete EspecieSetor
     * @type {Observable<any>}
     */
    @Effect()
    deleteEspecieSetor: any =
        this._actions
            .pipe(
                ofType<EspecieSetorListActions.DeleteEspecieSetor>(EspecieSetorListActions.DELETE_ESPECIE_SETOR),
                mergeMap((action) => {
                    return this._especieSetorService.destroy(action.payload).pipe(
                        map((response) => new EspecieSetorListActions.DeleteEspecieSetorSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new EspecieSetorListActions.DeleteEspecieSetor(
                                {
                                    [action.payload]: CdkUtils.errorsToString(err)
                                })
                            );
                        })
                    );
                })
            );
}
