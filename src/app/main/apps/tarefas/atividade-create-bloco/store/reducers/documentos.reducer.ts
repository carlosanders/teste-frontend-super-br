import * as AtividadeBlocoCreateDocumentosActionsAll from '../actions/documentos.actions';

export interface AtividadeBlocoCreateDocumentosState {
    documentosId: number[];
    documentosLoaded: any;
    loading: boolean;
    selectedDocumentosId: number[];
    deletingDocumentoIds: number[];
    convertendoDocumentoIds: number[];
    convertendoDocumentoHtmlIds: number[];
    downloadDocumentosP7SIds: number[];
    alterandoDocumentoIds: number[];
}

export const atividadeBlocoCreateDocumentosInitialState: AtividadeBlocoCreateDocumentosState = {
    documentosId: [],
    documentosLoaded: {},
    loading: false,
    selectedDocumentosId: [],
    deletingDocumentoIds: [],
    convertendoDocumentoIds: [],
    convertendoDocumentoHtmlIds: [],
    downloadDocumentosP7SIds: [],
    alterandoDocumentoIds: [],
};

export const atividadeBlocoCreateDocumentosReducer = (
    state = atividadeBlocoCreateDocumentosInitialState,
    action: AtividadeBlocoCreateDocumentosActionsAll.AtividadeBlocoCreateDocumentosActionsAll
): AtividadeBlocoCreateDocumentosState => {
    switch (action.type) {

        case AtividadeBlocoCreateDocumentosActionsAll.GET_DOCUMENTOS_BLOCO: {
            return {
                ...state,
                loading: true,
                documentosLoaded: {
                    ...state.documentosLoaded,
                    [action.payload]: {
                        loading: true,
                        loaded: false
                    }
                }
            };
        }

        case AtividadeBlocoCreateDocumentosActionsAll.GET_DOCUMENTOS_BLOCO_SUCCESS: {
            const documentosLoaded = {
                ...state.documentosLoaded,
                [action.payload.loaded.id]: {
                    loading: false,
                    loaded: true
                }
            };
            const newLoading = Object.keys(documentosLoaded).map(tarefa => documentosLoaded[tarefa]).filter(loaded => !!loaded.loading).length > 0;
            return {
                ...state,
                documentosId: [...state.documentosId, ...action.payload.entitiesId],
                documentosLoaded: documentosLoaded,
                loading: newLoading
            };
        }

        case AtividadeBlocoCreateDocumentosActionsAll.COMPLETE_DOCUMENTO_BLOCO: {
            return {
                ...state,
                documentosId: [...state.documentosId, action.payload.id],
            };
        }

        case AtividadeBlocoCreateDocumentosActionsAll.DELETE_DOCUMENTO_BLOCO: {
            return {
                ...state,
                deletingDocumentoIds: [...state.deletingDocumentoIds, action.payload.documentoId]
            };
        }

        case AtividadeBlocoCreateDocumentosActionsAll.UNLOAD_DOCUMENTOS_BLOCO: {
            return {
                ...atividadeBlocoCreateDocumentosInitialState
            };
        }

        case AtividadeBlocoCreateDocumentosActionsAll.DELETE_DOCUMENTO_BLOCO_SUCCESS: {
            return {
                ...state,
                deletingDocumentoIds: state.deletingDocumentoIds.filter(id => id !== action.payload.documentoId),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload.documentoId),
                documentosId: state.documentosId.filter(id => id !== action.payload.documentoId)
            };
        }

        case AtividadeBlocoCreateDocumentosActionsAll.DELETE_DOCUMENTO_BLOCO_FAILED: {
            return {
                ...state,
                deletingDocumentoIds: state.deletingDocumentoIds.filter(id => id !== action.payload.id),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload.id)
            };
        }

        case AtividadeBlocoCreateDocumentosActionsAll.CHANGE_SELECTED_DOCUMENTOS_BLOCO: {
            return {
                ...state,
                selectedDocumentosId: action.payload
            };
        }

        case AtividadeBlocoCreateDocumentosActionsAll.CONVERTE_DOCUMENTO_ATIVIDADE: {
            return {
                ...state,
                convertendoDocumentoIds: [...state.convertendoDocumentoIds, action.payload],
            };
        }
        case AtividadeBlocoCreateDocumentosActionsAll.CONVERTE_DOCUMENTO_SUCESS: {
            return {
                ...state,
                convertendoDocumentoIds: state.convertendoDocumentoIds.filter(id => id !== action.payload),
            };
        }
        case AtividadeBlocoCreateDocumentosActionsAll.CONVERTE_DOCUMENTO_FAILED: {
            return {
                ...state,
                convertendoDocumentoIds: state.convertendoDocumentoIds.filter(id => id !== action.payload),
            };
        }

        case AtividadeBlocoCreateDocumentosActionsAll.CONVERTE_DOCUMENTO_ATIVIDADE_HTML: {
            return {
                ...state,
                convertendoDocumentoHtmlIds: [...state.convertendoDocumentoHtmlIds, action.payload],
            };
        }
        case AtividadeBlocoCreateDocumentosActionsAll.CONVERTE_DOCUMENTO_HTML_SUCESS: {
            return {
                ...state,
                convertendoDocumentoHtmlIds: state.convertendoDocumentoHtmlIds.filter(id => id !== action.payload),
            };
        }
        case AtividadeBlocoCreateDocumentosActionsAll.CONVERTE_DOCUMENTO_HTML_FAILED: {
            return {
                ...state,
                convertendoDocumentoHtmlIds: state.convertendoDocumentoHtmlIds.filter(id => id !== action.payload),
            };
        }

        case AtividadeBlocoCreateDocumentosActionsAll.DOWNLOAD_DOCUMENTO_P7S: {
            return {
                ...state,
                downloadDocumentosP7SIds: [...state.downloadDocumentosP7SIds, action.payload],
            };
        }
        case AtividadeBlocoCreateDocumentosActionsAll.DOWNLOAD_DOCUMENTO_P7S_SUCCESS: {
            return {
                ...state,
                downloadDocumentosP7SIds: state.downloadDocumentosP7SIds.filter(id => id !== action.payload),
            };
        }
        case AtividadeBlocoCreateDocumentosActionsAll.DOWNLOAD_DOCUMENTO_P7S_FAILED: {
            return {
                ...state,
                downloadDocumentosP7SIds: state.downloadDocumentosP7SIds.filter(id => id !== action.payload),
            };
        }

        case AtividadeBlocoCreateDocumentosActionsAll.UPDATE_DOCUMENTO_BLOCO: {
            return {
                ...state,
                alterandoDocumentoIds: [...state.alterandoDocumentoIds, action.payload.documento.id]
            };
        }

        case AtividadeBlocoCreateDocumentosActionsAll.UPDATE_DOCUMENTO_BLOCO_SUCCESS: {
            return {
                ...state,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload),
                documentosId: state.documentosId.filter(id => id !== action.payload)
            };
        }

        case AtividadeBlocoCreateDocumentosActionsAll.UPDATE_DOCUMENTO_BLOCO_FAILED: {
            return {
                ...state,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload),
            };
        }

        default:
            return state;
    }
};
