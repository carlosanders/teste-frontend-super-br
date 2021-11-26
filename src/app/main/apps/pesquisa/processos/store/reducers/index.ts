import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ProcessosReducer, ProcessosState} from './processos.reducer';

export interface ProcessosAppState
{
    processos: ProcessosState;
}

export const getProcessosAppState = createFeatureSelector<ProcessosAppState>(
    'pesquisa-processos-app'
);

export const getAppState: any = createSelector(
    getProcessosAppState,
    (state: ProcessosAppState) => state
);

export const reducers: ActionReducerMap<ProcessosAppState> = {
    processos: ProcessosReducer
};

export * from './processos.reducer';
