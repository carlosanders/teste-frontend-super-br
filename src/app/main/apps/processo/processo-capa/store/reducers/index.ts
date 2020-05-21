import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { ProcessoCapaReducer, ProcessoCapaState } from './processo-capa.reducer';

export interface ProcessoCapaAppState
{
    processo: ProcessoCapaState;
}

export const getProcessoCapaAppState = createFeatureSelector<ProcessoCapaAppState>(
    'processo-capa-app'
);

export const getAppState = createSelector(
    getProcessoCapaAppState,
    (state: ProcessoCapaAppState) => state
);

export const reducers: ActionReducerMap<ProcessoCapaAppState> = {
    processo: ProcessoCapaReducer
};

export * from './processo-capa.reducer';
