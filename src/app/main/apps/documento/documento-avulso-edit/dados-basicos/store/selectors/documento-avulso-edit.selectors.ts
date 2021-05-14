import {createSelector} from '@ngrx/store';
import {getDocumentoAvulsoEditDadosBasicosAppState, DocumentoAvulsoEditDadosBasicosAppState, DocumentoAvulsoEditDadosBasicosState} from '../reducers';

export const getDocumentoAvulsoEditState = createSelector(
    getDocumentoAvulsoEditDadosBasicosAppState,
    (state: DocumentoAvulsoEditDadosBasicosAppState) => state.documentoAvulso
);

export const getIsSaving = createSelector(
    getDocumentoAvulsoEditState,
    (state: DocumentoAvulsoEditDadosBasicosState) => state.saving
);

export const getIsRemetendo = createSelector(
    getDocumentoAvulsoEditState,
    (state: DocumentoAvulsoEditDadosBasicosState) => state.remetendo
);

export const getIsEncerrando = createSelector(
    getDocumentoAvulsoEditState,
    (state: DocumentoAvulsoEditDadosBasicosState) => state.encerrando
);

export const getErrors = createSelector(
    getDocumentoAvulsoEditState,
    (state: DocumentoAvulsoEditDadosBasicosState) => state.errors
);

export const getErrorsRemetendo = createSelector(
    getDocumentoAvulsoEditState,
    (state: DocumentoAvulsoEditDadosBasicosState) => state.errorsRemetendo
);
