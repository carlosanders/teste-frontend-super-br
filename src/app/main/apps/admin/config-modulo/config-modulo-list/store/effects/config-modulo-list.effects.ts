import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as ConfigModuleListActions from '../actions';
import {ConfigModulo} from '../../../../../../../../@cdk/models';
import {configModule as configModuleSchema} from '../../../../../../../../@cdk/normalizr';
import {ConfigModuloService} from '../../../../../../../../@cdk/services/config-modulo.service';
import {getRouterState, State} from '../../../../../../../store';
import {AddData, UpdateData} from '../../../../../../../../@cdk/ngrx-normalizr';
import {LoginService} from '../../../../../../auth/login/login.service';
import * as OperacoesActions from "../../../../../../../store/actions/operacoes.actions";

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
     * Get ConfigModulo with router parameters
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
                        new AddData<ConfigModulo>({
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

    /**
     * Delete ConfigModulo
     *
     * @type {Observable<any>}
     */
    deleteConfigModulo = createEffect(() => this._actions.pipe(
        ofType<ConfigModuleListActions.DeleteConfigModule>(ConfigModuleListActions.DELETE_CONFIG_MODULO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'configModulo',
            content: 'Apagando a configModulo id ' + action.payload.configModuloId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._configModuleService.destroy(action.payload.configModuloId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'configModulo',
                    content: 'ConfigModulo id ' + action.payload.configModuloId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<ConfigModulo>({
                    id: response.id,
                    schema: configModuleSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new ConfigModuleListActions.DeleteConfigModuleSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.ConfigModuloId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'configModulo',
                    content: 'Erro ao apagar a configModulo id ' + action.payload.configModuloId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new ConfigModuleListActions.DeleteConfigModuleFailed(payload));
            })
        ), 25)
    ));
}
