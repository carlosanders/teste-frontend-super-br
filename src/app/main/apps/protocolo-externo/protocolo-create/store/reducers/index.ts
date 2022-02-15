import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ProtocoloCreateReducer, ProtocoloCreateState} from './protocolo-create.reducer';
import {ProcessoReducer, ProcessoState} from './processo.reducer';
import {protocoloDocumentoReducer, ProtocoloDocumentoState} from './protocolo-documento.reducer';
import {EstadoReducer, EstadoState} from './estados.reducer';

export interface ProtocoloCreateAppState
{
    protocolo: ProtocoloCreateState;
    processo: ProcessoState;
    protocoloDocumento: ProtocoloDocumentoState;
    estados: EstadoState;
}

export const getProtocoloCreateAppState = createFeatureSelector<ProtocoloCreateAppState>(
    'protocolo-create-app'
);

export const getAppState: any = createSelector(
    getProtocoloCreateAppState,
    (state: ProtocoloCreateAppState) => state
);

export const reducers: ActionReducerMap<ProtocoloCreateAppState> = {
    protocolo: ProtocoloCreateReducer,
    processo: ProcessoReducer,
    protocoloDocumento: protocoloDocumentoReducer,
    estados: EstadoReducer
};

export * from './protocolo-create.reducer';
export * from './processo.reducer';
export * from './protocolo-documento.reducer';
export * from './estados.reducer';
