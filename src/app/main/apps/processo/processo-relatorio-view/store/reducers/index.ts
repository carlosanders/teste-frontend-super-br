import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ProcessoRelatorioViewReducer, ProcessoRelatorioViewState} from './processo-relatorio-view.reducer';

export interface ProcessoRelatorioViewAppState
{
    processoRelatorioView: ProcessoRelatorioViewState;
}

export const getProcessoRelatorioViewAppState = createFeatureSelector<ProcessoRelatorioViewAppState>(
    'processo-relatorio-view-app'
);

export const getAppState: any = createSelector(
    getProcessoRelatorioViewAppState,
    (state: ProcessoRelatorioViewAppState) => state
);

export const reducers: ActionReducerMap<ProcessoRelatorioViewAppState> = {
    processoRelatorioView: ProcessoRelatorioViewReducer
};

export * from './processo-relatorio-view.reducer';
