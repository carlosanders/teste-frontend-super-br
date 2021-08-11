import * as ProcessoViewDocumentosActions from '../actions/documentos.actions';

export interface ProcessoViewDocumentosState {
    documentosId: number[];
    documentosLoaded: any;
    selectedDocumentosId: number[];
    deletingDocumentoIds: number[];
    alterandoDocumentoIds: number[];
    assinandoDocumentoIds: number[];
    removendoAssinaturaDocumentoIds: number[];
    convertendoDocumentoIds: number[];
    convertendoDocumentoHtmlIds: number[];
    downloadP7SDocumentoIds: number[];
    undeletingDocumentoIds: number[];
    bufferingDelete: number;
    loading: boolean;
    loaded: boolean;
    loadingDocumentosExcluidos: boolean;
    lixeiraMinutas: boolean;
    error: any;
    errorDelete: number[];
}

export const ProcessoViewDocumentosInitialState: ProcessoViewDocumentosState = {
    documentosId: [],
    documentosLoaded: false,
    selectedDocumentosId: [],
    deletingDocumentoIds: [],
    assinandoDocumentoIds: [],
    alterandoDocumentoIds: [],
    removendoAssinaturaDocumentoIds: [],
    convertendoDocumentoIds: [],
    convertendoDocumentoHtmlIds: [],
    downloadP7SDocumentoIds: [],
    undeletingDocumentoIds: [],
    bufferingDelete: 0,
    loading: false,
    loaded: false,
    loadingDocumentosExcluidos: false,
    lixeiraMinutas: false,
    error: null,
    errorDelete: []
};

export function ProcessoViewDocumentosReducer(
    state = ProcessoViewDocumentosInitialState,
    action: ProcessoViewDocumentosActions.ProcessoViewDocumentosActionsAll
): ProcessoViewDocumentosState {
    switch (action.type) {

        case ProcessoViewDocumentosActions.GET_DOCUMENTOS: {
            return {
                ...state,
                documentosId: null,
                documentosLoaded: false,
                loading: true,
                lixeiraMinutas: false
            };
        }

        case ProcessoViewDocumentosActions.GET_DOCUMENTOS_EXCLUIDOS: {
            return {
                ...state,
                documentosId: null,
                documentosLoaded: false,
                loadingDocumentosExcluidos: true,
                lixeiraMinutas: true
            };
        }

        case ProcessoViewDocumentosActions.GET_DOCUMENTOS_SUCCESS: {
            return {
                ...state,
                documentosId: action.payload.entitiesId,
                loading: false,
                documentosLoaded: action.payload.loaded,
            };
        }

        case ProcessoViewDocumentosActions.GET_DOCUMENTOS_EXCLUIDOS_SUCCESS: {
            return {
                ...state,
                documentosId: action.payload.entitiesId,
                documentosLoaded: action.payload.loaded,
                loadingDocumentosExcluidos: false,
            };
        }

        case ProcessoViewDocumentosActions.RELOAD_DOCUMENTO: {
            return {
                ...state,
                alterandoDocumentoIds: [...state.alterandoDocumentoIds, action.payload]
            };
        }

        case ProcessoViewDocumentosActions.RELOAD_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case ProcessoViewDocumentosActions.RELOAD_DOCUMENTO_FAILED: {
            return {
                ...state,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload.id),
                error: action.payload.error
            };
        }

        case ProcessoViewDocumentosActions.COMPLETE_DOCUMENTO: {
            return {
                ...state,
                documentosId: [...state.documentosId, action.payload.id],
            };
        }

        case ProcessoViewDocumentosActions.UNLOAD_DOCUMENTOS: {
            return {
                ...ProcessoViewDocumentosInitialState
            };
        }

        case ProcessoViewDocumentosActions.DELETE_DOCUMENTO: {
            const entitiesId = state.documentosId.filter(id => id !== action.payload.documentoId);
            return {
                ...state,
                documentosId: entitiesId,
                deletingDocumentoIds: [...state.deletingDocumentoIds, action.payload.documentoId],
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload.documentoId),
                error: null
            };
        }

        case ProcessoViewDocumentosActions.DELETE_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                deletingDocumentoIds: state.deletingDocumentoIds.filter(id => id !== action.payload),
                errorDelete: [],
                error: null
            };
        }

        case ProcessoViewDocumentosActions.DELETE_DOCUMENTO_FAILED: {
            return {
                ...state,
                errorDelete: [...state.errorDelete, action.payload.id],
                deletingDocumentoIds: state.deletingDocumentoIds.filter(id => id !== action.payload.id),
                documentosId: [...state.documentosId, action.payload.id],
                error: action.payload.error
            };
        }

        case ProcessoViewDocumentosActions.DELETE_DOCUMENTO_CANCEL: {
            return {
                ...state,
                deletingDocumentoIds: [],
                bufferingDelete: state.bufferingDelete + 1,
                errorDelete: [],
                error: null
            };
        }

        case ProcessoViewDocumentosActions.DELETE_DOCUMENTO_FLUSH: {
            return {
                ...state,
                bufferingDelete: state.bufferingDelete + 1
            };
        }

        case ProcessoViewDocumentosActions.DELETE_DOCUMENTO_CANCEL_SUCCESS: {
            return {
                ...state,
                documentosId: [...state.documentosId, action.payload],
            };
        }

        case ProcessoViewDocumentosActions.UPDATE_DOCUMENTO: {
            return {
                ...state,
                alterandoDocumentoIds: [...state.alterandoDocumentoIds, action.payload.documento.id],
                loaded: false,
                loading: true,
            };
        }

        case ProcessoViewDocumentosActions.UPDATE_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload),
                documentosId: state.documentosId.filter(id => id !== action.payload),
                loaded: true,
                loading: false,
            };
        }

        case ProcessoViewDocumentosActions.UPDATE_DOCUMENTO_FAILED: {
            return {
                ...state,
                loaded: false,
                loading: false,
            };
        }

        case ProcessoViewDocumentosActions.ASSINA_DOCUMENTO: {
            return {
                ...state,
                assinandoDocumentoIds: [...state.assinandoDocumentoIds, action.payload]
            };
        }

        case ProcessoViewDocumentosActions.ASSINA_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case ProcessoViewDocumentosActions.ASSINA_DOCUMENTO_FAILED: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case ProcessoViewDocumentosActions.PREPARA_ASSINATURA_FAILED: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload.id),
                error: action.payload.error
            };
        }

        case ProcessoViewDocumentosActions.ASSINA_DOCUMENTO_ELETRONICAMENTE: {
            return {
                ...state,
                assinandoDocumentoIds: [...state.assinandoDocumentoIds, action.payload.documento.id],
                error: false
            };
        }

        case ProcessoViewDocumentosActions.ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload),
                error: false
            };
        }

        case ProcessoViewDocumentosActions.ASSINA_DOCUMENTO_ELETRONICAMENTE_FAILED: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload.documentoId),
                error: action.payload.error
            };
        }

        case ProcessoViewDocumentosActions.ASSINA_JUNTADA_ELETRONICAMENTE: {
            return {
                ...state,
                assinandoDocumentoIds: [...state.assinandoDocumentoIds, action.payload.documento.id],
                error: false
            };
        }

        case ProcessoViewDocumentosActions.ASSINA_JUNTADA_ELETRONICAMENTE_SUCCESS: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload),
                error: false
            };
        }

        case ProcessoViewDocumentosActions.ASSINA_JUNTADA_ELETRONICAMENTE_FAILED: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload.documentoId),
                error: action.payload.error
            };
        }

        case ProcessoViewDocumentosActions.REMOVE_ASSINATURA_DOCUMENTO: {
            return {
                ...state,
                removendoAssinaturaDocumentoIds: [...state.removendoAssinaturaDocumentoIds, action.payload]
            };
        }

        case ProcessoViewDocumentosActions.REMOVE_ASSINATURA_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                removendoAssinaturaDocumentoIds: state.removendoAssinaturaDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case ProcessoViewDocumentosActions.REMOVE_ASSINATURA_DOCUMENTO_FAILED: {
            return {
                ...state,
                removendoAssinaturaDocumentoIds: state.removendoAssinaturaDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case ProcessoViewDocumentosActions.ASSINA_JUNTADA: {
            return {
                ...state,
                assinandoDocumentoIds: [...state.assinandoDocumentoIds, action.payload]
            };
        }

        case ProcessoViewDocumentosActions.ASSINA_JUNTADA_SUCCESS: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case ProcessoViewDocumentosActions.ASSINA_JUNTADA_FAILED: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case ProcessoViewDocumentosActions.CHANGE_SELECTED_DOCUMENTOS: {
            return {
                ...state,
                selectedDocumentosId: action.payload
            };
        }

        case ProcessoViewDocumentosActions.CONVERTE_DOCUMENTO: {
            return {
                ...state,
                convertendoDocumentoIds: [...state.convertendoDocumentoIds, action.payload],
            };
        }

        case ProcessoViewDocumentosActions.CONVERTE_DOCUMENTO_SUCESS: {
            return {
                ...state,
                convertendoDocumentoIds: state.convertendoDocumentoIds.filter(id => id !== action.payload),
            };
        }

        case ProcessoViewDocumentosActions.CONVERTE_DOCUMENTO_FAILED: {
            return {
                ...state,
                convertendoDocumentoIds: state.convertendoDocumentoIds.filter(id => id !== action.payload),
            };
        }

        case ProcessoViewDocumentosActions.CONVERTE_DOCUMENTO_HTML: {
            return {
                ...state,
                convertendoDocumentoHtmlIds: [...state.convertendoDocumentoHtmlIds, action.payload],
            };
        }

        case ProcessoViewDocumentosActions.CONVERTE_DOCUMENTO_HTML_SUCESS: {
            return {
                ...state,
                convertendoDocumentoHtmlIds: state.convertendoDocumentoHtmlIds.filter(id => id !== action.payload),
            };
        }

        case ProcessoViewDocumentosActions.CONVERTE_DOCUMENTO_HTML_FAILED: {
            return {
                ...state,
                convertendoDocumentoHtmlIds: state.convertendoDocumentoHtmlIds.filter(id => id !== action.payload),
            };
        }

        case ProcessoViewDocumentosActions.UNDELETE_DOCUMENTO: {
            return {
                ...state,
                undeletingDocumentoIds: [...state.undeletingDocumentoIds, action.payload.documento.id],
            };
        }

        case ProcessoViewDocumentosActions.UNDELETE_DOCUMENTO_SUCCESS: {
            let entitiesId = [];
            entitiesId = state.lixeiraMinutas ?
                state.documentosId.filter(id => id !== action.payload.documento.id) : [...state.documentosId, action.payload.documento.id];
            return {
                ...state,
                undeletingDocumentoIds: state.undeletingDocumentoIds.filter(id => id !== action.payload.documento.id),
                documentosId: !action.payload.loaded || action.payload.loaded === state.documentosLoaded ? entitiesId : state.documentosId
            };
        }

        case ProcessoViewDocumentosActions.UNDELETE_DOCUMENTO_FAILED: {
            return {
                ...state,
                undeletingDocumentoIds: state.undeletingDocumentoIds.filter(id => id !== action.payload.id)
            };
        }

        case ProcessoViewDocumentosActions.DOWNLOAD_DOCUMENTO_P7S: {
            return {
                ...state,
                downloadP7SDocumentoIds: [...state.downloadP7SDocumentoIds, action.payload],
            };
        }
        case ProcessoViewDocumentosActions.DOWNLOAD_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                downloadP7SDocumentoIds: state.downloadP7SDocumentoIds.filter(id => id !== action.payload),
            };
        }
        case ProcessoViewDocumentosActions.DOWNLOAD_DOCUMENTO_FAILED: {
            return {
                ...state,
                downloadP7SDocumentoIds: state.downloadP7SDocumentoIds.filter(id => id !== action.payload),
            };
        }
        default:
            return state;
    }
}
