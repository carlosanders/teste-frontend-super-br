import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { ProtocoloCreateReducer, ProtocoloCreateState } from './protocolo-create.reducer';
import { ProcessoReducer, ProcessoState } from './processo.reducer';

export interface ProtocoloCreateAppState
{
    protocolo: ProtocoloCreateState;
    processo: ProcessoState;
}

export const getProtocoloCreateAppState = createFeatureSelector<ProtocoloCreateAppState>(
    'protocolo-create-app'
);

export const getAppState = createSelector(
    getProtocoloCreateAppState,
    (state: ProtocoloCreateAppState) => state
);

export const reducers: ActionReducerMap<ProtocoloCreateAppState> = {
    protocolo: ProtocoloCreateReducer,
    processo: ProcessoReducer
};

export * from './protocolo-create.reducer';
export * from './processo.reducer';
