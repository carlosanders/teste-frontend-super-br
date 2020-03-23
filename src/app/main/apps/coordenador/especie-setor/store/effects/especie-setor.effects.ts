import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

import * as EspecieSetorsActions from '../actions/especie-setor.actions';

import {EspecieSetorService} from '@cdk/services/especie-setor.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {especieSetor as especieSetorSchema} from '@cdk/normalizr/especie-setor.schema';
import {EspecieSetor} from '@cdk/models';

@Injectable()
export class EspecieSetorEffects {
    routerState: any;

    /**
     *
     * @param _actions
     * @param _especieSetorService
     * @param _store
     * @param _router
     */
    constructor(
        private _actions: Actions,
        private _especieSetorService: EspecieSetorService,
        private _store: Store<State>,
        private _router: Router
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
                ofType<EspecieSetorsActions.GetEspecieSetor>(EspecieSetorsActions.GET_ESPECIE_SETOR),
                switchMap((action) => {
                    return this._especieSetorService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'

                        ]));
                }),
                switchMap(response => [
                    new AddData<EspecieSetor>({data: response['entities'], schema: especieSetorSchema}),
                    new EspecieSetorsActions.GetEspecieSetorSuccess({
                        loaded: {
                            id: 'especieSetorHandle',
                            value: this.routerState.params.especieSetorHandle
                        },
                        especieSetorId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new EspecieSetorsActions.GetEspecieSetorFailed(err));
                    return caught;
                })
            );
}
