import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { RelatorioCreateReducer, RelatorioCreateState } from './relatorio-create.reducer';

export interface RelatorioCreateAppState
{
    relatorio: RelatorioCreateState;
}

export const getRelatorioCreateAppState = createFeatureSelector<RelatorioCreateAppState>(
    'relatorio-create-app'
);

export const getAppState = createSelector(
    getRelatorioCreateAppState,
    (state: RelatorioCreateAppState) => state
);

export const reducers: ActionReducerMap<RelatorioCreateAppState> = {
    relatorio: RelatorioCreateReducer
};

export * from './relatorio-create.reducer';
