import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../store/reducers';
import * as EspecieRelevanciaListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {EspecieRelevanciaService} from '../../../../../../../../@cdk/services/especie-relevancia.service';
import {AddData} from '../../../../../../../../@cdk/ngrx-normalizr';
import {EspecieRelevancia} from '../../../../../../../../@cdk/models';
import {especieRelevancia as especieRelevanciaSchema} from '../../../../../../../../@cdk/normalizr';


@Injectable()
export class EspecieRelevanciaListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _especieRelevanciaService: EspecieRelevanciaService,
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
     * Get EspecieRelevancia with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getEspecieRelevancia: any =
        this._actions
            .pipe(
                ofType<EspecieRelevanciaListActions.GetEspecieRelevancia>(EspecieRelevanciaListActions.GET_ESPECIE_RELEVANCIA),
                switchMap((action) => {
                    return this._especieRelevanciaService.query(
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
                            new AddData<EspecieRelevancia>({data: response['entities'], schema: especieRelevanciaSchema}),
                            new EspecieRelevanciaListActions.GetEspecieRelevanciaSuccess({
                                entitiesId: response['entities'].map(especieRelevancia => especieRelevancia.id),
                                loaded: {
                                    id: 'especieRelevanciaHandle',
                                    value: this.routerState.params.especieRelevanciaHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new EspecieRelevanciaListActions.GetEspecieRelevanciaFailed(err));
                        })
                    );
                })
            );
}
