import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {DadosBasicosReducer, DadosBasicosState} from './dados-basicos.reducer';

export interface DadosBasicosAppState
{
    dadosBasicos: DadosBasicosState;
}

export const getDadosBasicosAppState = createFeatureSelector<DadosBasicosAppState>(
    'dados-basicos-app'
);

export const getAppState: any = createSelector(
    getDadosBasicosAppState,
    (state: DadosBasicosAppState) => state
);

export const reducers: ActionReducerMap<DadosBasicosAppState> = {
    dadosBasicos: DadosBasicosReducer
};

export * from './dados-basicos.reducer';
