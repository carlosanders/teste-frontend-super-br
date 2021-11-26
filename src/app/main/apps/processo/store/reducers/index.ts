import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ProcessoReducer, ProcessoState} from './processo.reducer';

export interface ProcessoAppState
{
    processo: ProcessoState;
}

export const getProcessoAppState = createFeatureSelector<ProcessoAppState>(
    'processo-app'
);

export const getAppState: any = createSelector(
    getProcessoAppState,
    (state: ProcessoAppState) => state
);

export const reducers: ActionReducerMap<ProcessoAppState> = {
    processo: ProcessoReducer
};

export * from './processo.reducer';
