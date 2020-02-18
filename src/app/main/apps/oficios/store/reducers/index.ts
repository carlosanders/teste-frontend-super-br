import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { ProcessosReducer, ProcessosState } from './processos.reducer';
import { FoldersReducer, FoldersState } from './folders.reducer';

export interface ProcessosAppState
{
    processos: ProcessosState;
    folders: FoldersState;
}

export const getProcessosAppState = createFeatureSelector<ProcessosAppState>(
    'processos-app'
);

export const getAppState = createSelector(
    getProcessosAppState,
    (state: ProcessosAppState) => state
);

export const reducers: ActionReducerMap<ProcessosAppState> = {
    processos: ProcessosReducer,
    folders: FoldersReducer
};

export * from './processos.reducer';
export * from './folders.reducer';
