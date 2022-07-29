import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ProcessoReducer, ProcessoState} from './processo.reducer';
import {protocoloDocumentoReducer, ProtocoloDocumentoState} from './protocolo-documento.reducer';
import {ProtocoloExistenteReducer, ProtocoloExistenteState} from './protocolo-existente.reducer';

export interface ProtocoloCreateAppState
{
    processo: ProcessoState;
    protocoloDocumento: ProtocoloDocumentoState;
    protocoloExistente: ProtocoloExistenteState;
}

export const getProtocoloCreateAppState = createFeatureSelector<ProtocoloCreateAppState>(
    'protocolo-existente-create-app'
);

export const getAppState: any = createSelector(
    getProtocoloCreateAppState,
    (state: ProtocoloCreateAppState) => state
);

export const reducers: ActionReducerMap<ProtocoloCreateAppState> = {
    processo: ProcessoReducer,
    protocoloDocumento: protocoloDocumentoReducer,
    protocoloExistente: ProtocoloExistenteReducer
};

export * from './processo.reducer';
export * from './protocolo-documento.reducer';
export * from './protocolo-existente.reducer';
