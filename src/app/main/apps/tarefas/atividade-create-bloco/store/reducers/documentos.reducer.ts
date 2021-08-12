import * as AtividadeBlocoCreateDocumentosActionsAll from '../actions/documentos.actions';

export interface AtividadeBlocoCreateDocumentosState {
    documentosId: number[];
    documentosLoaded: any;
    selectedDocumentosId: number[];
    deletingDocumentoIds: number[];
    assinandoDocumentoIds: number[];
    removendoAssinaturaDocumentoIds: number[];
    convertendoDocumentoIds: number[];
    convertendoDocumentoHtmlIds: number[];
    downloadDocumentosP7SIds: number[];
    alterandoDocumentoIds: number[];
}

export const AtividadeBlocoCreateDocumentosInitialState: AtividadeBlocoCreateDocumentosState = {
    documentosId: [],
    documentosLoaded: false,
    selectedDocumentosId: [],
    deletingDocumentoIds: [],
    assinandoDocumentoIds: [],
    removendoAssinaturaDocumentoIds: [],
    convertendoDocumentoIds: [],
    convertendoDocumentoHtmlIds: [],
    downloadDocumentosP7SIds: [],
    alterandoDocumentoIds: [],
};

export function AtividadeBlocoCreateDocumentosReducer(
    state = AtividadeBlocoCreateDocumentosInitialState,
    action: AtividadeBlocoCreateDocumentosActionsAll.AtividadeBlocoCreateDocumentosActionsAll
): AtividadeBlocoCreateDocumentosState {
    switch (action.type) {

        case AtividadeBlocoCreateDocumentosActionsAll.GET_DOCUMENTOS_BLOCO: {
            return {
                ...AtividadeBlocoCreateDocumentosInitialState
            };
        }

        case AtividadeBlocoCreateDocumentosActionsAll.GET_DOCUMENTOS_BLOCO_SUCCESS: {
            return {
                ...state,
                documentosId: action.payload.entitiesId,
                documentosLoaded: action.payload.loaded,
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
                ...AtividadeBlocoCreateDocumentosInitialState
            };
        }

        case AtividadeBlocoCreateDocumentosActionsAll.DELETE_DOCUMENTO_BLOCO_SUCCESS: {
            return {
                ...state,
                deletingDocumentoIds: state.deletingDocumentoIds.filter(id => id !== action.payload),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload),
                documentosId: state.documentosId.filter(id => id !== action.payload)
            };
        }

        case AtividadeBlocoCreateDocumentosActionsAll.DELETE_DOCUMENTO_BLOCO_FAILED: {
            return {
                ...state,
                deletingDocumentoIds: state.deletingDocumentoIds.filter(id => id !== action.payload.id),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload.id)
            };
        }

        case AtividadeBlocoCreateDocumentosActionsAll.ASSINA_DOCUMENTO_BLOCO: {
            return {
                ...state,
                assinandoDocumentoIds: [...state.assinandoDocumentoIds, ...action.payload]
            };
        }

        case AtividadeBlocoCreateDocumentosActionsAll.ASSINA_DOCUMENTO_BLOCO_SUCCESS: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case AtividadeBlocoCreateDocumentosActionsAll.ASSINA_DOCUMENTO_BLOCO_FAILED: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case AtividadeBlocoCreateDocumentosActionsAll.REMOVE_ASSINATURA_DOCUMENTO: {
            return {
                ...state,
                removendoAssinaturaDocumentoIds: [...state.removendoAssinaturaDocumentoIds, action.payload]
            };
        }

        case AtividadeBlocoCreateDocumentosActionsAll.REMOVE_ASSINATURA_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                removendoAssinaturaDocumentoIds: state.removendoAssinaturaDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case AtividadeBlocoCreateDocumentosActionsAll.REMOVE_ASSINATURA_DOCUMENTO_FAILED: {
            return {
                ...state,
                removendoAssinaturaDocumentoIds: state.removendoAssinaturaDocumentoIds.filter(id => id !== action.payload)
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
}
