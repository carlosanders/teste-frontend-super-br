import {createSelector} from '@ngrx/store';
import {ComponenteDigitalState, DocumentoEditModelosAppState, getDocumentoEditModelosAppState} from '../reducers';

export const getComponenteDigitalState: any = createSelector(
    getDocumentoEditModelosAppState,
    (state: DocumentoEditModelosAppState) => state.componentesDigitais
);

export const getIsSaving: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.saving
);

export const getErrors: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.errors
);

export const getIsLoadingSaving: any = createSelector(
    getComponenteDigitalState,
    (state: ComponenteDigitalState) => state.loading
);
