import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { ConfigModuloEditReducer, ConfigModuleEditState } from './config-modulo-edit.reducer';

export interface ConfigModuleEditAppState
{
    configModule: ConfigModuleEditState;
}

export const getConfigModuleEditAppState = createFeatureSelector<ConfigModuleEditAppState>(
    'config-modulo-edit-app'
);

export const getAppState : any = createSelector(
    getConfigModuleEditAppState,
    (state: ConfigModuleEditAppState) => state
);

export const reducers: ActionReducerMap<ConfigModuleEditAppState> = {
    configModule: ConfigModuloEditReducer
};

export * from './config-modulo-edit.reducer';
