import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RelatorioDetailReducer, RelatorioDetailState} from './relatorio-detail.reducer';

export interface RelatorioDetailAppState
{
    relatorioDetail: RelatorioDetailState;
}

export const getRelatorioDetailAppState = createFeatureSelector<RelatorioDetailAppState>(
    'relatorio-detail-app'
);

export const getAppState: any = createSelector(
    getRelatorioDetailAppState,
    (state: RelatorioDetailAppState) => state
);

export const reducers: ActionReducerMap<RelatorioDetailAppState> = {
    relatorioDetail: RelatorioDetailReducer
};

export * from './relatorio-detail.reducer';
