import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../store/reducers';
import * as MunicipioListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {MunicipioService} from '../../../../../../../../@cdk/services/municipio.service';
import {AddData} from '../../../../../../../../@cdk/ngrx-normalizr';
import {Municipio} from '../../../../../../../../@cdk/models';
import {municipio as municipioSchema} from '../../../../../../../../@cdk/normalizr';


@Injectable()
export class MunicipioListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _municipioService: MunicipioService,
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
     * Get Municipio with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getMunicipio: any =
        this._actions
            .pipe(
                ofType<MunicipioListActions.GetMunicipio>(MunicipioListActions.GET_MUNICIPIO),
                switchMap((action) => {
                    return this._municipioService.query(
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
                            new AddData<Municipio>({data: response['entities'], schema: municipioSchema}),
                            new MunicipioListActions.GetMunicipioSuccess({
                                entitiesId: response['entities'].map(municipio => municipio.id),
                                loaded: {
                                    id: 'municipioHandle',
                                    value: this.routerState.params.municipioHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new MunicipioListActions.GetMunicipioFailed(err));
                        })
                    );
                })
            );
}
