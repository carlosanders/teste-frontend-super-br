import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as ConfigModuleEditActions from '../actions/config-modulo-edit.actions';
import * as ConfigModuleListActions
    from '../../../config-modulo-list/store/actions/config-modulo-list.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {configModule as configModuleSchema} from '../../../../../../../../@cdk/normalizr';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

import {ConfigModuloService} from '../../../../../../../../@cdk/services/config-modulo.service';
import {ConfigModulo} from '../../../../../../../../@cdk/models';

@Injectable()
export class ConfigModuloEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _configModuleService: ConfigModuloService,
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
     * Get ConfigModulo with router parameters
     * @type {Observable<any>}
     */
    getConfigModule: any = createEffect(() =>
        this._actions
            .pipe(
                ofType<ConfigModuleEditActions.GetConfigModule>(ConfigModuleEditActions.GET_CONFIG_MODULE),
                switchMap((action) => {
                    return this._configModuleService.query(
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
                    new AddData<ConfigModulo>({data: response['entities'], schema: configModuleSchema}),
                    new ConfigModuleEditActions.GetConfigModuleSuccess({
                        loaded: {
                            id: 'configModuleHandle',
                            value: this.routerState.params['configModuleHandle']
                        },
                        entityId: response['entities'][0].id
                    })
                ]),
                catchError(err => {
                    console.log(err);
                    return of(new ConfigModuleEditActions.GetConfigModuleFailed(err));
                })
            )
    );

    /**
     * Save ConfigModulo
     * @type {Observable<any>}
     */
    saveConfigModule: any = createEffect(() =>
        this._actions
            .pipe(
                ofType<ConfigModuleEditActions.SaveConfigModule>(ConfigModuleEditActions.SAVE_CONFIG_MODULE),
                switchMap((action) => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._configModuleService.save(action.payload, context).pipe(
                        mergeMap((response: ConfigModulo) => [
                            new ConfigModuleListActions.ReloadConfigModule(),
                            new AddData<ConfigModulo>({data: [response], schema: configModuleSchema}),
                            new ConfigModuleEditActions.SaveConfigModuleSuccess(response)
                        ])
                    );
                }),
                catchError(err => {
                    console.log(err);
                    return of(new ConfigModuleEditActions.SaveConfigModuleFailed(err));
                })
            )
    );

    /**
     * Update ConfigModulo
     * @type {Observable<any>}
     */
    updateConfigModule: any = createEffect(() =>
        this._actions
            .pipe(
                ofType<ConfigModuleEditActions.UpdateConfigModule>(ConfigModuleEditActions.UPDATE_CONFIG_MODULE),
                switchMap((action) => {
                    return this._configModuleService.patch(action.payload.configModule, action.payload.changes).pipe(
                        mergeMap((response: ConfigModulo) => [
                            new ConfigModuleListActions.ReloadConfigModule(),
                            new AddData<ConfigModulo>({data: [response], schema: configModuleSchema}),
                            new ConfigModuleEditActions.UpdateConfigModuleSuccess(response)
                        ])
                    );
                }),
                catchError(err => {
                    console.log(err);
                    return of(new ConfigModuleEditActions.UpdateConfigModuleFailed(err));
                })
            )
    );

    /**
     * Save ConfigModulo Success
     */
    saveConfigModuleSuccess: any = createEffect(() =>
        this._actions
            .pipe(
                ofType<ConfigModuleEditActions.SaveConfigModuleSuccess>(ConfigModuleEditActions.SAVE_CONFIG_MODULE_SUCCESS),
                tap((action) => {
                    this._router.navigate(['apps/admin/config-modulo/listar']).then();
                })
            )
    , {dispatch: false});


}
