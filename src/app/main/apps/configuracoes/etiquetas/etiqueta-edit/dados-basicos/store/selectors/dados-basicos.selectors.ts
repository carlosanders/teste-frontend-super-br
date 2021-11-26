import {createSelector} from '@ngrx/store';
import {EtiquetaEditAppState, EtiquetaEditState, getEtiquetaEditAppState} from '../reducers';

export const getEtiquetaEditState: any = createSelector(
    getEtiquetaEditAppState,
    (state: EtiquetaEditAppState) => state.etiqueta
);

export const getIsSaving: any = createSelector(
    getEtiquetaEditState,
    (state: EtiquetaEditState) => state.saving
);

export const getErrors: any = createSelector(
    getEtiquetaEditState,
    (state: EtiquetaEditState) => state.errors
);
