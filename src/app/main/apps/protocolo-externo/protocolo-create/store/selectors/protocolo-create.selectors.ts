import {createSelector} from '@ngrx/store';
import {getProtocoloCreateAppState, ProtocoloCreateAppState, ProtocoloCreateState} from '../reducers';

export const getProtocoloCreateState = createSelector(
    getProtocoloCreateAppState,
    (state: ProtocoloCreateAppState) => state.protocolo
);

export const getIsSaving = createSelector(
    getProtocoloCreateState,
    (state: ProtocoloCreateState) => state.saving
);

export const getErrors = createSelector(
    getProtocoloCreateState,
    (state: ProtocoloCreateState) => state.errors
);
