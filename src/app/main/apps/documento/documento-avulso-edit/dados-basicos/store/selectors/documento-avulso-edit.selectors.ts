import {createSelector} from '@ngrx/store';
import {
    DocumentoAvulsoEditDadosBasicosAppState,
    DocumentoAvulsoEditDadosBasicosState,
    getDocumentoAvulsoEditDadosBasicosAppState
} from '../reducers';

export const getDocumentoAvulsoEditState: any = createSelector(
    getDocumentoAvulsoEditDadosBasicosAppState,
    (state: DocumentoAvulsoEditDadosBasicosAppState) => state.documentoAvulso
);

export const getIsSaving: any = createSelector(
    getDocumentoAvulsoEditState,
    (state: DocumentoAvulsoEditDadosBasicosState) => state.saving
);

export const getIsRemetendo: any = createSelector(
    getDocumentoAvulsoEditState,
    (state: DocumentoAvulsoEditDadosBasicosState) => state.remetendo
);

export const getIsEncerrando: any = createSelector(
    getDocumentoAvulsoEditState,
    (state: DocumentoAvulsoEditDadosBasicosState) => state.encerrando
);

export const getErrors: any = createSelector(
    getDocumentoAvulsoEditState,
    (state: DocumentoAvulsoEditDadosBasicosState) => state.errors
);

export const getErrorsRemetendo: any = createSelector(
    getDocumentoAvulsoEditState,
    (state: DocumentoAvulsoEditDadosBasicosState) => state.errorsRemetendo
);
