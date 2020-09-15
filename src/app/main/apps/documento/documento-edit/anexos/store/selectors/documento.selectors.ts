import {createSelector} from '@ngrx/store';
import {
    DocumentoEditDadosBasicosAppState, DocumentoEditDadosBasicosState,
    getDocumentoEditDadosBasicosAppState
} from '../../../dados-basicos/store/reducers';

export const getDocumentoEditDadosBasicosState = createSelector(
    getDocumentoEditDadosBasicosAppState,
    (state: DocumentoEditDadosBasicosAppState) => state.documento
);

export const getIsSaving = createSelector(
    getDocumentoEditDadosBasicosState,
    (state: DocumentoEditDadosBasicosState) => state.saving
);
