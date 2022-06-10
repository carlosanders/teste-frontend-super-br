import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import {ConfigModuloListReducer, ConfigModuleListState} from './config-modulo-list.reducer';
import {ModuloListReducer, ModuloListState} from './modulo-list.reducer';

export interface ConfigModuleListAppState
{
    configModuleList: ConfigModuleListState;
    moduloList: ModuloListState;
}

export const getConfigModuleListAppState = createFeatureSelector<ConfigModuleListAppState>(
    'config-modulo-list'
);

export const getAppState : any = createSelector(
    getConfigModuleListAppState,
    (state: ConfigModuleListAppState) => state
);

export const reducers: ActionReducerMap<ConfigModuleListAppState> = {
    configModuleList: ConfigModuloListReducer,
    moduloList: ModuloListReducer
};

export * from './config-modulo-list.reducer';
