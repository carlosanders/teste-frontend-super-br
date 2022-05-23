import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../../../../app/store/reducers';
import * as ConfigModuleListActions from '../actions';
import {ConfigModuloModel} from '../../../../../../../../@cdk/models';
import {configModule as configModuleSchema} from '../../../../../../../../@cdk/normalizr';
import {LoginService} from '../../../../../../../../../../app/main/auth/login/login.service';
import {AddData} from '../../../../../../../../../../@cdk/ngrx-normalizr';
import {ConfigModuloService} from '../../../../../../../../@cdk/services/config-modulo.service';


@Injectable()
export class ConfigModuloListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _configModuleService: ConfigModuloService,
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
     * Get ConfigModuloModel with router parameters
     * @type {Observable<any>}
     */
    getConfigModule: any = createEffect(() => this._actions
        .pipe(
            ofType<ConfigModuleListActions.GetConfigModule>(ConfigModuleListActions.GET_CONFIG_MODULO),
            switchMap((action) => {
                return this._configModuleService.query(
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
                        new AddData<ConfigModuloModel>({
                            data: response['entities'],
                            schema: configModuleSchema
                        }),
                        new ConfigModuleListActions.GetConfigModuleSuccess({
                            entitiesId: response['entities'].map(configModule => configModule.id),
                            loaded: {
                                id: 'configModuleHandle',
                                value: this.routerState.params['configModuleHandle']
                            },
                            total: response['total']
                        })
                    ]),
                    catchError((err) => {
                        console.log(err);
                        return of(new ConfigModuleListActions.GetConfigModuleFailed(err));
                    })
                );
            })
        )
    );
}
