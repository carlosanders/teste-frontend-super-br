import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { ProtocolosExternosReducer, ProcessosState } from './protocolos-externos.reducer';
import { FoldersReducer, FoldersState } from './folders.reducer';

export interface ProcessosAppState
{
    tarefas: ProcessosState;
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
    tarefas: ProtocolosExternosReducer,
    folders: FoldersReducer
};

export * from './protocolos-externos.reducer';
export * from './folders.reducer';
