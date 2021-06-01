import {createSelector} from '@ngrx/store';
import {getEtiquetaEditAppState, EtiquetaEditAppState, EtiquetaEditState} from '../reducers';

export const getEtiquetaEditState = createSelector(
    getEtiquetaEditAppState,
    (state: EtiquetaEditAppState) => state.etiqueta
);

export const getIsSaving = createSelector(
    getEtiquetaEditState,
    (state: EtiquetaEditState) => state.saving
);

export const getErrors = createSelector(
    getEtiquetaEditState,
    (state: EtiquetaEditState) => state.errors
);
