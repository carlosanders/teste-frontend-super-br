import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RelatorioViewReducer, RelatorioViewState} from './relatorio-view.reducer';

export interface RelatorioViewAppState
{
    relatorioView: RelatorioViewState;
}

export const getRelatorioViewAppState = createFeatureSelector<RelatorioViewAppState>(
    'relatorio-view-app'
);

export const getAppState: any = createSelector(
    getRelatorioViewAppState,
    (state: RelatorioViewAppState) => state
);

export const reducers: ActionReducerMap<RelatorioViewAppState> = {
    relatorioView: RelatorioViewReducer
};

export * from './relatorio-view.reducer';
