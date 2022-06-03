import * as fromStore from '../';

export interface TarefaDetailDocumentosState {
    deletingDocumentoIds: number[];
    alterandoDocumentoIds: number[];
    convertendoDocumentoIds: number[];
    convertendoDocumentoHtmlIds: number[];
    downloadP7SDocumentoIds: number[];
    bufferingDelete: number;
    error: any;
    errorDelete: number[];
}

export const TarefaDetailDocumentosInitialState: TarefaDetailDocumentosState = {
    deletingDocumentoIds: [],
    alterandoDocumentoIds: [],
    convertendoDocumentoIds: [],
    convertendoDocumentoHtmlIds: [],
    downloadP7SDocumentoIds: [],
    bufferingDelete: 0,
    error: null,
    errorDelete: []
};

export const TarefaDetailDocumentosReducer = (
    state = TarefaDetailDocumentosInitialState,
    action: fromStore.TarefaDetailDocumentosActionsAll
): TarefaDetailDocumentosState => {
    switch (action.type) {
        case fromStore.DELETE_DOCUMENTO: {
            return {
                ...state,
                deletingDocumentoIds: [...state.deletingDocumentoIds, action.payload.documentoId],
                error: null
            };
        }

        case fromStore.DELETE_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                deletingDocumentoIds: state.deletingDocumentoIds.filter(id => id !== action.payload),
                errorDelete: [],
                error: null
            };
        }

        case fromStore.DELETE_DOCUMENTO_FAILED: {
            return {
                ...state,
                errorDelete: [...state.errorDelete, action.payload.id],
                deletingDocumentoIds: state.deletingDocumentoIds.filter(id => id !== action.payload.id),
                error: action.payload.error
            };
        }

        case fromStore.DELETE_DOCUMENTO_CANCEL: {
            return {
                ...state,
                deletingDocumentoIds: [],
                bufferingDelete: state.bufferingDelete + 1,
                errorDelete: [],
                error: null
            };
        }

        case fromStore.DELETE_DOCUMENTO_FLUSH: {
            return {
                ...state,
                bufferingDelete: state.bufferingDelete + 1
            };
        }

        case fromStore.DELETE_DOCUMENTO_CANCEL_SUCCESS: {
            return {
                ...state
            };
        }

        case fromStore.UPDATE_DOCUMENTO: {
            return {
                ...state,
                alterandoDocumentoIds: [...state.alterandoDocumentoIds, action.payload.documento.id]
            };
        }

        case fromStore.UPDATE_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload),
            };
        }

        case fromStore.CONVERTE_DOCUMENTO: {
            return {
                ...state,
                convertendoDocumentoIds: [...state.convertendoDocumentoIds, action.payload],
            };
        }

        case fromStore.CONVERTE_DOCUMENTO_SUCESS: {
            return {
                ...state,
                convertendoDocumentoIds: state.convertendoDocumentoIds.filter(id => id !== action.payload),
            };
        }

        case fromStore.CONVERTE_DOCUMENTO_FAILED: {
            return {
                ...state,
                convertendoDocumentoIds: state.convertendoDocumentoIds.filter(id => id !== action.payload.id),
                error: action.payload.error,
            };
        }

        case fromStore.CONVERTE_DOCUMENTO_HTML: {
            return {
                ...state,
                convertendoDocumentoHtmlIds: [...state.convertendoDocumentoHtmlIds, action.payload],
            };
        }

        case fromStore.CONVERTE_DOCUMENTO_HTML_SUCESS: {
            return {
                ...state,
                convertendoDocumentoHtmlIds: state.convertendoDocumentoHtmlIds.filter(id => id !== action.payload),
            };
        }

        case fromStore.CONVERTE_DOCUMENTO_HTML_FAILED: {
            return {
                ...state,
                convertendoDocumentoHtmlIds: state.convertendoDocumentoHtmlIds.filter(id => id !== action.payload),
            };
        }

        case fromStore.DOWNLOAD_DOCUMENTO_P7S: {
            return {
                ...state,
                downloadP7SDocumentoIds: [...state.downloadP7SDocumentoIds, action.payload],
            };
        }
        case fromStore.DOWNLOAD_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                downloadP7SDocumentoIds: state.downloadP7SDocumentoIds.filter(id => id !== action.payload),
            };
        }
        case fromStore.DOWNLOAD_DOCUMENTO_FAILED: {
            return {
                ...state,
                downloadP7SDocumentoIds: state.downloadP7SDocumentoIds.filter(id => id !== action.payload),
            };
        }
        default:
            return state;
    }
};
