import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap} from 'rxjs/operators';

import * as CoordenadorSetorActions from '../actions/setor.actions';

import {SetorService} from '@cdk/services/setor.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {setor as setorSchema} from '@cdk/normalizr';
import {Setor} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';

@Injectable()
export class CoordenadorSetorEffects {
    routerState: any;
    /**
     * Get Unidade with router parameters
     *
     * @type {Observable<any>}
     */
    getUnidade: any = createEffect(() => this._actions.pipe(
        ofType<CoordenadorSetorActions.GetUnidade>(CoordenadorSetorActions.GET_UNIDADE),
        switchMap(action => this._setorService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
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
        catchError((err) => {
            console.log(err);
            return of(new CoordenadorSetorActions.GetUnidadeFailed(err));
        })
    ));
    /**
     * Get Setor with router parameters
     *
     * @type {Observable<any>}
     */
    getSetor: any = createEffect(() => this._actions.pipe(
        ofType<CoordenadorSetorActions.GetSetor>(CoordenadorSetorActions.GET_SETOR),
        switchMap(action => this._setorService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
        switchMap(response => [
            new AddData<Setor>({data: response['entities'], schema: setorSchema}),
            new CoordenadorSetorActions.GetSetorSuccess({
                loaded: {
                    id: 'setorHandle',
                    value: this.routerState.params['setorHandle']
                },
                setorId: this.routerState.params['setorHandle']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new CoordenadorSetorActions.GetSetorFailed(err));
        })
    ));

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
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
