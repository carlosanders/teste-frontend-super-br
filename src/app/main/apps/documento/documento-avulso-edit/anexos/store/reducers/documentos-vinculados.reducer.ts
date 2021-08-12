import * as DocumentosVinculadosActions from '../actions/documentos-vinculados.actions';

export interface DocumentosVinculadosState {
    documentosId: number[];
    documentosLoaded: any;
    selectedDocumentosId: number[];
    deletingDocumentoIds: number[];
    assinandoDocumentoIds: number[];
    alterandoDocumentoIds: number[];
    removendoAssinaturaDocumentoIds: number[];
    downloadDocumentosP7SIds: number[];
    saving: boolean;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const DocumentosVinculadosInitialState: DocumentosVinculadosState = {
    documentosId: [],
    documentosLoaded: false,
    selectedDocumentosId: [],
    deletingDocumentoIds: [],
    assinandoDocumentoIds: [],
    alterandoDocumentoIds: [],
    removendoAssinaturaDocumentoIds: [],
    downloadDocumentosP7SIds: [],
    saving: false,
    loading: false,
    loaded: false,
    error: null,
};

export function DocumentosVinculadosReducer(
    state = DocumentosVinculadosInitialState,
    action: DocumentosVinculadosActions.DocumentosVinculadosActionsAll
): DocumentosVinculadosState {
    switch (action.type) {

        case DocumentosVinculadosActions.GET_DOCUMENTOS_VINCULADOS: {
            return {
                ...state,
                saving: false,
                loading: true,
                documentosLoaded: false,
            };
        }

        case DocumentosVinculadosActions.GET_DOCUMENTOS_VINCULADOS_SUCCESS: {
            return {
                ...state,
                loading: false,
                documentosId: action.payload.entitiesId,
                documentosLoaded: action.payload.loaded,
            };
        }

        case DocumentosVinculadosActions.GET_DOCUMENTOS_VINCULADOS_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case DocumentosVinculadosActions.COMPLETE_DOCUMENTO_VINCULADO: {
            return {
                ...state,
                documentosId: [...state.documentosId, action.payload.id],
            };
        }

        case DocumentosVinculadosActions.DELETE_DOCUMENTO_VINCULADO: {
            return {
                ...state,
                deletingDocumentoIds: [...state.deletingDocumentoIds, action.payload.documentoVinculadoId]
            };
        }

        case DocumentosVinculadosActions.DELETE_DOCUMENTO_VINCULADO_SUCCESS: {
            return {
                ...state,
                deletingDocumentoIds: state.deletingDocumentoIds.filter(id => id !== action.payload),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload),
                documentosId: state.documentosId.filter(id => id !== action.payload)
            };
        }

        case DocumentosVinculadosActions.DELETE_DOCUMENTO_VINCULADO_FAILED: {
            return {
                ...state,
                deletingDocumentoIds: state.deletingDocumentoIds.filter(id => id !== action.payload.id),
            };
        }

        case DocumentosVinculadosActions.ASSINA_DOCUMENTO_VINCULADO: {
            return {
                ...state,
                assinandoDocumentoIds: [...state.assinandoDocumentoIds, action.payload]
            };
        }

        case DocumentosVinculadosActions.ASSINA_DOCUMENTO_VINCULADO_SUCCESS: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case DocumentosVinculadosActions.ASSINA_DOCUMENTO_VINCULADO_FAILED: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case DocumentosVinculadosActions.PREPARA_ASSINATURA_VINCULADO_FAILED: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload.id),
                error: action.payload.error
            };
        }

        case DocumentosVinculadosActions.ASSINA_DOCUMENTO_VINCULADO_ELETRONICAMENTE: {
            return {
                ...state,
                assinandoDocumentoIds: [...state.assinandoDocumentoIds, action.payload.documento.id],
                error: false
            };
        }

        case DocumentosVinculadosActions.ASSINA_DOCUMENTO_VINCULADO_ELETRONICAMENTE_SUCCESS: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload),
                error: false
            };
        }

        case DocumentosVinculadosActions.ASSINA_DOCUMENTO_VINCULADO_ELETRONICAMENTE_FAILED: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload.documentoId),
                error: action.payload.error
            };
        }

        case DocumentosVinculadosActions.REMOVE_ASSINATURA_DOCUMENTO_VINCULADO: {
            return {
                ...state,
                removendoAssinaturaDocumentoIds: [...state.removendoAssinaturaDocumentoIds, action.payload]
            };
        }

        case DocumentosVinculadosActions.REMOVE_ASSINATURA_DOCUMENTO_VINCULADO_SUCCESS: {
            return {
                ...state,
                removendoAssinaturaDocumentoIds: state.removendoAssinaturaDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case DocumentosVinculadosActions.REMOVE_ASSINATURA_DOCUMENTO_VINCULADO_FAILED: {
            return {
                ...state,
                removendoAssinaturaDocumentoIds: state.removendoAssinaturaDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case DocumentosVinculadosActions.CHANGE_SELECTED_DOCUMENTOS_VINCULADOS: {
            return {
                ...state,
                selectedDocumentosId: action.payload
            };
        }

        case DocumentosVinculadosActions.UPDATE_DOCUMENTO: {
            return {
                ...state,
                alterandoDocumentoIds: [...state.alterandoDocumentoIds, action.payload.documento.id],
                loaded: false,
                loading: true,
            };
        }

        case DocumentosVinculadosActions.UPDATE_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload),
                documentosId: state.documentosId.filter(id => id !== action.payload),
                loaded: true,
                loading: false,
            };
        }

        case DocumentosVinculadosActions.UPDATE_DOCUMENTO_FAILED: {
            return {
                ...state,
                loading: false,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload),
            };
        }

        case DocumentosVinculadosActions.DOWNLOAD_DOCUMENTO_P7S: {
            return {
                ...state,
                downloadDocumentosP7SIds: [...state.downloadDocumentosP7SIds, action.payload],
            };
        }
        case DocumentosVinculadosActions.DOWNLOAD_DOCUMENTO_P7S_SUCCESS: {
            return {
                ...state,
                downloadDocumentosP7SIds: state.downloadDocumentosP7SIds.filter(id => id !== action.payload),
            };
        }
        case DocumentosVinculadosActions.DOWNLOAD_DOCUMENTO_P7S_FAILED: {
            return {
                ...state,
                downloadDocumentosP7SIds: state.downloadDocumentosP7SIds.filter(id => id !== action.payload),
            };
        }
        case DocumentosVinculadosActions.SET_SAVING: {
            return {
                ...state,
                saving: !state.loading
            };
        }

        default:
            return state;
    }
}
