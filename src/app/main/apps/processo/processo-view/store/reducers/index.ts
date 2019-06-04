import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { ProcessoViewReducer, ProcessoViewState } from './processo-view.reducer';

export interface ProcessoViewAppState
{
    processoView: ProcessoViewState;
}

export const getProcessoViewAppState = createFeatureSelector<ProcessoViewAppState>(
    'processo-view-app'
);

export const getAppState = createSelector(
    getProcessoViewAppState,
    (state: ProcessoViewAppState) => state
);

export const reducers: ActionReducerMap<ProcessoViewAppState> = {
    processoView: ProcessoViewReducer
};

export * from './processo-view.reducer';
