import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as MunicipioEditActions from '../actions/municipio-edit.actions';
import * as MunicipioListActions from '../../../municipio-list/store/actions/municipio-list.actions';

import {MunicipioService} from '@cdk/services/municipio.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {municipio as municipioSchema} from '@cdk/normalizr';
import {Municipio} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class MunicipioEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _municipioService: MunicipioService,
        private _store: Store<State>,
        private _loginService: LoginService,
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
     * Get Municipio with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getMunicipio: any =
        this._actions
            .pipe(
                ofType<MunicipioEditActions.GetMunicipio>(MunicipioEditActions.GET_MUNICIPIO),
                switchMap((action) => {
                    return this._municipioService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]),
                        JSON.stringify({isAdmin: true}));
                }),
                switchMap(response => [
                    new AddData<Municipio>({data: response['entities'], schema: municipioSchema}),
                    new MunicipioEditActions.GetMunicipioSuccess({
                        loaded: {
                            id: 'municipioHandle',
                            value: this.routerState.params.municipioHandle
                        },
                        entityId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new MunicipioEditActions.GetMunicipioFailed(err));
                    return caught;
                })
            );

    /**
     * Save Municipio
     * @type {Observable<any>}
     */
    @Effect()
    saveMunicipio: any =
        this._actions
            .pipe(
                ofType<MunicipioEditActions.SaveMunicipio>(MunicipioEditActions.SAVE_MUNICIPIO),
                switchMap((action) => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._municipioService.save(action.payload, context).pipe(
                        mergeMap((response: Municipio) => [
                            new MunicipioListActions.ReloadMunicipio(),
                            new AddData<Municipio>({data: [response], schema: municipioSchema}),
                            new MunicipioEditActions.SaveMunicipioSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new MunicipioEditActions.SaveMunicipioFailed(err));
                    return caught;
                })
            );

    /**
     * Update Municipio
     * @type {Observable<any>}
     */
    @Effect()
    updateMunicipio: any =
        this._actions
            .pipe(
                ofType<MunicipioEditActions.UpdateMunicipio>(MunicipioEditActions.UPDATE_MUNICIPIO),
                switchMap((action) => {
                    return this._municipioService.patch(action.payload.municipio, action.payload.changes).pipe(
                        mergeMap((response: Municipio) => [
                            new MunicipioListActions.ReloadMunicipio(),
                            new AddData<Municipio>({data: [response], schema: municipioSchema}),
                            new MunicipioEditActions.UpdateMunicipioSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new MunicipioEditActions.UpdateMunicipioFailed(err));
                    return caught;
                })
            );

    /**
     * Save Municipio Success
     */
    @Effect({dispatch: false})
    saveMunicipioSuccess: any =
        this._actions
            .pipe(
                ofType<MunicipioEditActions.SaveMunicipioSuccess>(MunicipioEditActions.SAVE_MUNICIPIO_SUCCESS),
                tap((action) => {
                    this._router.navigate(['apps/admin/municipios/listar']).then();
                })
            );

}
