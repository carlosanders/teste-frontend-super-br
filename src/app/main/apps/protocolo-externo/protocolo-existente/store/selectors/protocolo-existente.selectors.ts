import {createSelector} from '@ngrx/store';
import {getProtocoloCreateAppState, ProtocoloCreateAppState, ProtocoloExistenteState} from '../reducers';

export const getProtocoloExistenteState: any = createSelector(
    getProtocoloCreateAppState,
    (state: ProtocoloCreateAppState) => state.protocoloExistente
);

export const getExistenteIsSaving: any = createSelector(
    getProtocoloExistenteState,
    (state: ProtocoloExistenteState) => state.saving
);

export const getExistenteErrors: any = createSelector(
    getProtocoloExistenteState,
    (state: ProtocoloExistenteState) => state.errors
);
