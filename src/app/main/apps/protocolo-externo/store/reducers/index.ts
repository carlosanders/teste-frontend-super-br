import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { ProtocolosExternosReducer, ProcessosState } from './protocolos-externos.reducer';

export interface ProcessosAppState
{
    processos: ProcessosState;
}

export const getProtocoloExternoAppState = createFeatureSelector<ProcessosAppState>(
    'protocolo-externo-app'
);

export const getProtocoloExternoState = createSelector(
    getProtocoloExternoAppState,
    (state: ProcessosAppState) => state
);

export const reducers: ActionReducerMap<ProcessosAppState> = {
    processos: ProtocolosExternosReducer
};

export * from './protocolos-externos.reducer';
