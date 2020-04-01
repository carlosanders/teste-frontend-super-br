import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { ProtocolosExternosReducer, ProcessosState } from './protocolos-externos.reducer';

export interface ProcessosAppState
{
    tarefas: ProcessosState;
}

export const getProcessosAppState = createFeatureSelector<ProcessosAppState>(
    'processos-app'
);

export const getAppState = createSelector(
    getProcessosAppState,
    (state: ProcessosAppState) => state
);

export const reducers: ActionReducerMap<ProcessosAppState> = {
    tarefas: ProtocolosExternosReducer
};

export * from './protocolos-externos.reducer';
