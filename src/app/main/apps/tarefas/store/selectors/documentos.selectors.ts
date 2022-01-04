import {createSelector} from '@ngrx/store';
import {
    getTarefasAppState,
    TarefasAppState,
    TarefasDocumentosState
} from '../reducers';

export const getTarefasDocumentosState: any = createSelector(
    getTarefasAppState,
    (state: TarefasAppState) => state ? state.documentos : null
);

export const getDeletingDocumentosId: any = createSelector(
    getTarefasDocumentosState,
    (state: TarefasDocumentosState) => state.deletingDocumentoIds
);

export const getAlterandoDocumentosId: any = createSelector(
    getTarefasDocumentosState,
    (state: TarefasDocumentosState) => state.alterandoDocumentoIds
);

export const getConvertendoAllDocumentosId: any = createSelector(
    getTarefasDocumentosState,
    (state: TarefasDocumentosState) => [
            ...state.convertendoDocumentoIds,
            ...state.convertendoDocumentoHtmlIds
        ]
);

export const getConvertendoDocumentosId: any = createSelector(
    getTarefasDocumentosState,
    (state: TarefasDocumentosState) => state.convertendoDocumentoIds
);

export const getConvertendoDocumentosHtmlId: any = createSelector(
    getTarefasDocumentosState,
    (state: TarefasDocumentosState) => state.convertendoDocumentoHtmlIds
);

export const getDownloadDocumentoP7SId: any = createSelector(
    getTarefasDocumentosState,
    (state: TarefasDocumentosState) => state.downloadP7SDocumentoIds
);

export const getBufferingDeleteMinutas: any = createSelector(
    getTarefasDocumentosState,
    (state: TarefasDocumentosState) => state.bufferingDelete
);

export const getErrorsDocumentos: any = createSelector(
    getTarefasDocumentosState,
    (state: TarefasDocumentosState) => state.error
);
