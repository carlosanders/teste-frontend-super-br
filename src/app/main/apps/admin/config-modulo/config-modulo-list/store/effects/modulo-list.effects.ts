import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../store';
import * as ConfigModuleListActions from '../actions';
import {Modulo} from '../../../../../../../../@cdk/models';
import {modulo as moduloSchema} from '../../../../../../../../@cdk/normalizr';
import {LoginService} from '../../../../../../auth/login/login.service';
import {AddData} from '../../../../../../../../@cdk/ngrx-normalizr';
import {ModuloService} from '../../../../../../../../@cdk/services/modulo.service';


@Injectable()
export class ModuloListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _moduloService: ModuloService,
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
     * Get Modulo with router parameters
     * @type {Observable<any>}
     */
    getModulo: any = createEffect(() => this._actions
        .pipe(
            ofType<ConfigModuleListActions.GetModulo>(ConfigModuleListActions.GET_MODULO),
            switchMap((action) => {
                return this._moduloService.query(
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
                        new AddData<Modulo>({
                            data: response['entities'],
                            schema: moduloSchema
                        }),
                        new ConfigModuleListActions.GetModuloSuccess({
                            entitiesId: response['entities'].map(Modulo => Modulo.id),
                            loaded: {
                                id: 'ModuloHandle',
                                value: this.routerState.params['ModuloHandle']
                            },
                            total: response['total']
                        })
                    ]),
                    catchError((err) => {
                        console.log(err);
                        return of(new ConfigModuleListActions.GetModuloFailed(err));
                    })
                );
            })
        )
    );
}
