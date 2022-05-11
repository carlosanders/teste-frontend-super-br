import {createSelector} from '@ngrx/store';
import * as fromStore from '../';

export const getTarefaDetailDocumentosState: any = createSelector(
    fromStore.getTarefaDetailAppState,
    (state: fromStore.TarefaDetailAppState) => state ? state.documentos : null
);

export const getDeletingDocumentosId: any = createSelector(
    getTarefaDetailDocumentosState,
    (state: fromStore.TarefaDetailDocumentosState) => state.deletingDocumentoIds
);

export const getAlterandoDocumentosId: any = createSelector(
    getTarefaDetailDocumentosState,
    (state: fromStore.TarefaDetailDocumentosState) => state.alterandoDocumentoIds
);

export const getConvertendoAllDocumentosId: any = createSelector(
    getTarefaDetailDocumentosState,
    (state: fromStore.TarefaDetailDocumentosState) => [
            ...state.convertendoDocumentoIds,
            ...state.convertendoDocumentoHtmlIds
        ]
);

export const getConvertendoDocumentosId: any = createSelector(
    getTarefaDetailDocumentosState,
    (state: fromStore.TarefaDetailDocumentosState) => state.convertendoDocumentoIds
);

export const getConvertendoDocumentosHtmlId: any = createSelector(
    getTarefaDetailDocumentosState,
    (state: fromStore.TarefaDetailDocumentosState) => state.convertendoDocumentoHtmlIds
);

export const getDownloadDocumentoP7SId: any = createSelector(
    getTarefaDetailDocumentosState,
    (state: fromStore.TarefaDetailDocumentosState) => state.downloadP7SDocumentoIds
);

export const getBufferingDeleteMinutas: any = createSelector(
    getTarefaDetailDocumentosState,
    (state: fromStore.TarefaDetailDocumentosState) => state.bufferingDelete
);

export const getErrorsDocumentos: any = createSelector(
    getTarefaDetailDocumentosState,
    (state: fromStore.TarefaDetailDocumentosState) => state.error
);
