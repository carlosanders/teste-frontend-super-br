import {createSelector} from '@ngrx/store';
import {ComponenteDigitalState, DocumentoEditModelosAppState, getDocumentoEditModelosAppState} from '../reducers';

export const getComponenteDigitalState = createSelector(
    getDocumentoEditModelosAppState,
    (state: DocumentoEditModelosAppState) => state.componentesDigitais
);

export const getIsSaving = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.saving
);

export const getErrors = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.errors
);

export const getIsLoadingSaving = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.loading
);
