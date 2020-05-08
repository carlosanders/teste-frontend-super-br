import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

import * as CoordenadorSetorActions from '../actions/setor.actions';

import {SetorService} from '@cdk/services/setor.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {setor as setorSchema} from '@cdk/normalizr/setor.schema';
import {Setor} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';

@Injectable()
export class CoordenadorSetorEffects {
    routerState: any;

    /**
     *
     * @param _actions
     * @param _setorService
     * @param _store
     * @param _router
     */
    constructor(
        private _actions: Actions,
        private _setorService: SetorService,
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
     * Get Unidade with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getUnidade: any =
        this._actions
            .pipe(
                ofType<CoordenadorSetorActions.GetUnidade>(CoordenadorSetorActions.GET_UNIDADE),
                switchMap((action) => {
                    return this._setorService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<Setor>({data: response['entities'], schema: setorSchema}),
                    new CoordenadorSetorActions.GetUnidadeSuccess({
                        loaded: {
                            id: 'unidadeHandle',
                            value: this.routerState.params['unidadeHandle'] ?
                                this.routerState.params['unidadeHandle'] : this.routerState.params['entidadeHandle']
                        },
                        unidadeId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new CoordenadorSetorActions.GetUnidadeFailed(err));
                    return caught;
                })
            );

    /**
     * Get Setor with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getSetor: any =
        this._actions
            .pipe(
                ofType<CoordenadorSetorActions.GetSetor>(CoordenadorSetorActions.GET_SETOR),
                switchMap((action) => {
                    return this._setorService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<Setor>({data: response['entities'], schema: setorSchema}),
                    new CoordenadorSetorActions.GetSetorSuccess({
                        loaded: {
                            id: 'setorHandle',
                            value: this.routerState.params['setorHandle']
                        },
                        setorId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new CoordenadorSetorActions.GetSetorFailed(err));
                    return caught;
                })
            );
}
