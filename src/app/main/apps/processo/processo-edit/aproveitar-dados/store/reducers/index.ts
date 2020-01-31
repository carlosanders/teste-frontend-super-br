import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AproveitarDadosReducer, AproveitarDadosState } from './aproveitar-dados.reducer';

export interface AproveitarDadosAppState
{
    aproveitarDados: AproveitarDadosState;
}

export const getAproveitarDadosAppState = createFeatureSelector<AproveitarDadosAppState>(
    'aproveitar-dados-app'
);

export const getAppState = createSelector(
    getAproveitarDadosAppState,
    (state: AproveitarDadosAppState) => state
);

export const reducers: ActionReducerMap<AproveitarDadosAppState> = {
    aproveitarDados: AproveitarDadosReducer
};

export * from './aproveitar-dados.reducer';
