import {createSelector} from '@ngrx/store';
import {DocumentoAppState, getDocumentoAppState} from '../reducers';
import {
    ComponenteDigitalState
} from '../reducers';

export const getComponenteDigitalState = createSelector(
    getDocumentoAppState,
    (state: DocumentoAppState) => state.componentesDigitais
);

export const getCDIsSaving = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.saving
);

export const getCDErrors = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.errors
);
