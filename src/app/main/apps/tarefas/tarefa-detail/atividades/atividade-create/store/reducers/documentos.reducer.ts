import * as AtividadeCreateDocumentosActions
    from 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-create/store/actions/documentos.actions';

export interface AtividadeCreateDocumentosState {
    documentosId: number[];
    documentosLoaded: any;
    selectedDocumentosId: number[];
    deletingDocumentoIds: number[];
    undeletingDocumentoIds: number[];
    bufferingDelete: number;
    alterandoDocumentoIds: number[];
    convertendoDocumentoIds: number[];
    convertendoDocumentoHtmlIds: number[];
    downloadDocumentosP7SIds: number[];
    loadDocumentosExcluidos: boolean;
    lixeiraMinutas: boolean;
    saving: boolean;
    loading: boolean;
    loaded: boolean;
    error: any;
    errorDelete: number[];
}

export const atividadeCreateDocumentosInitialState: AtividadeCreateDocumentosState = {
    documentosId: [],
    documentosLoaded: false,
    selectedDocumentosId: [],
    deletingDocumentoIds: [],
    alterandoDocumentoIds: [],
    convertendoDocumentoIds: [],
    convertendoDocumentoHtmlIds: [],
    downloadDocumentosP7SIds: [],
    undeletingDocumentoIds: [],
    bufferingDelete: 0,
    loadDocumentosExcluidos: false,
    saving: false,
    loading: false,
    loaded: false,
    lixeiraMinutas: false,
    error: null,
    errorDelete: []
};

export const atividadeCreateDocumentosReducer = (
    state = atividadeCreateDocumentosInitialState,
    action: AtividadeCreateDocumentosActions.AtividadeCreateDocumentosActionsAll
): AtividadeCreateDocumentosState => {
    switch (action.type) {

        case AtividadeCreateDocumentosActions.GET_DOCUMENTOS: {
            if (action.payload && action.payload['context'] &&
                action.payload['context']['mostrarApagadas']) {

                return {
                    ...state,
                    saving: false,
                    loaded: false,
                    loading: true,
                    loadDocumentosExcluidos: true,
                    lixeiraMinutas: true
                };
            } else {
                return {
                    ...state,
                    saving: false,
                    loaded: false,
                    loading: true,
                    loadDocumentosExcluidos: false,
                    lixeiraMinutas: false
                };
            }
        }

        case AtividadeCreateDocumentosActions.GET_DOCUMENTOS_SUCCESS: {
            return {
                ...state,
                loading: false,
                documentosId: action.payload.entitiesId,
                documentosLoaded: action.payload.loaded,
                loadDocumentosExcluidos: false
            };
        }

        case AtividadeCreateDocumentosActions.GET_DOCUMENTOS_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case AtividadeCreateDocumentosActions.COMPLETE_DOCUMENTO: {
            return {
                ...state,
                documentosId: [...state.documentosId, action.payload.id],
            };
        }

        case AtividadeCreateDocumentosActions.UNLOAD_DOCUMENTOS: {
            return {
                ...atividadeCreateDocumentosInitialState
            };
        }

        case AtividadeCreateDocumentosActions.DELETE_DOCUMENTO: {
            const entitiesId = state.documentosId.filter(id => id !== action.payload.documentoId);
            return {
                ...state,
                documentosId: entitiesId,
                deletingDocumentoIds: [...state.deletingDocumentoIds, action.payload.documentoId],
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload.documentoId),
                error: null
            };
        }

        case AtividadeCreateDocumentosActions.DELETE_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                deletingDocumentoIds: state.deletingDocumentoIds.filter(id => id !== action.payload.documentoId),
                errorDelete: [],
                error: null
            };
        }

        case AtividadeCreateDocumentosActions.DELETE_DOCUMENTO_FAILED: {
            return {
                ...state,
                errorDelete: [...state.errorDelete, action.payload.id],
                deletingDocumentoIds: state.deletingDocumentoIds.filter(id => id !== action.payload.id),
                documentosId: [...state.documentosId, action.payload.id],
                error: action.payload.error
            };
        }

        case AtividadeCreateDocumentosActions.DELETE_DOCUMENTO_CANCEL: {
            return {
                ...state,
                deletingDocumentoIds: [],
                bufferingDelete: state.bufferingDelete + 1,
                errorDelete: [],
                error: null
            };
        }

        case AtividadeCreateDocumentosActions.DELETE_DOCUMENTO_FLUSH: {
            return {
                ...state,
                bufferingDelete: state.bufferingDelete + 1
            };
        }

        case AtividadeCreateDocumentosActions.DELETE_DOCUMENTO_CANCEL_SUCCESS: {
            return {
                ...state,
                documentosId: [...state.documentosId, action.payload],
            };
        }

        case AtividadeCreateDocumentosActions.UPDATE_DOCUMENTO: {
            return {
                ...state,
                alterandoDocumentoIds: [...state.alterandoDocumentoIds, action.payload.documento.id],
                loaded: false,
                loading: true,
            };
        }

        case AtividadeCreateDocumentosActions.UPDATE_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload),
                documentosId: state.documentosId.filter(id => id !== action.payload),
                loaded: true,
                loading: false,
            };
        }

        case AtividadeCreateDocumentosActions.UPDATE_DOCUMENTO_FAILED: {
            return {
                ...state,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload),
                loaded: false,
                loading: false,
            };
        }

        case AtividadeCreateDocumentosActions.CHANGE_SELECTED_DOCUMENTOS: {
            return {
                ...state,
                selectedDocumentosId: action.payload
            };
        }

        case AtividadeCreateDocumentosActions.CONVERTE_DOCUMENTO_ATIVIDADE: {
            return {
                ...state,
                convertendoDocumentoIds: [...state.convertendoDocumentoIds, action.payload],
            };
        }
        case AtividadeCreateDocumentosActions.CONVERTE_DOCUMENTO_SUCESS: {
            return {
                ...state,
                convertendoDocumentoIds: state.convertendoDocumentoIds.filter(id => id !== action.payload),
            };
        }
        case AtividadeCreateDocumentosActions.CONVERTE_DOCUMENTO_FAILED: {
            return {
                ...state,
                convertendoDocumentoIds: state.convertendoDocumentoIds.filter(id => id !== action.payload),
            };
        }

        case AtividadeCreateDocumentosActions.CONVERTE_DOCUMENTO_ATIVIDADE_HTML: {
            return {
                ...state,
                convertendoDocumentoHtmlIds: [...state.convertendoDocumentoHtmlIds, action.payload],
            };
        }
        case AtividadeCreateDocumentosActions.CONVERTE_DOCUMENTO_HTML_SUCESS: {
            return {
                ...state,
                convertendoDocumentoHtmlIds: state.convertendoDocumentoHtmlIds.filter(id => id !== action.payload),
            };
        }
        case AtividadeCreateDocumentosActions.CONVERTE_DOCUMENTO_HTML_FAILED: {
            return {
                ...state,
                convertendoDocumentoHtmlIds: state.convertendoDocumentoHtmlIds.filter(id => id !== action.payload),
            };
        }

        case AtividadeCreateDocumentosActions.DOWNLOAD_DOCUMENTO_P7S: {
            return {
                ...state,
                downloadDocumentosP7SIds: [...state.downloadDocumentosP7SIds, action.payload],
            };
        }
        case AtividadeCreateDocumentosActions.DOWNLOAD_DOCUMENTO_P7S_SUCCESS: {
            return {
                ...state,
                downloadDocumentosP7SIds: state.downloadDocumentosP7SIds.filter(id => id !== action.payload),
            };
        }
        case AtividadeCreateDocumentosActions.DOWNLOAD_DOCUMENTO_P7S_FAILED: {
            return {
                ...state,
                downloadDocumentosP7SIds: state.downloadDocumentosP7SIds.filter(id => id !== action.payload),
            };
        }

        case AtividadeCreateDocumentosActions.UNDELETE_DOCUMENTO: {
            return {
                ...state,
                undeletingDocumentoIds: [...state.undeletingDocumentoIds, action.payload.documento.id],
            };
        }

        case AtividadeCreateDocumentosActions.UNDELETE_DOCUMENTO_SUCCESS: {
            let entitiesId = [];
            entitiesId = state.lixeiraMinutas ?
                state.documentosId.filter(id => id !== action.payload.documento.id) : [...state.documentosId, action.payload.documento.id];
            return {
                ...state,
                undeletingDocumentoIds: state.undeletingDocumentoIds.filter(id => id !== action.payload.documento.id),
                documentosId: !action.payload.loaded || action.payload.loaded === state.documentosLoaded ? entitiesId : state.documentosId
            };
        }

        case AtividadeCreateDocumentosActions.UNDELETE_DOCUMENTO_FAILED: {
            return {
                ...state,
                undeletingDocumentoIds: state.undeletingDocumentoIds.filter(id => id !== action.payload.id)
            };
        }

        case AtividadeCreateDocumentosActions.SET_SAVING: {
            return {
                ...state,
                saving: !state.loading
            };
        }

        default:
            return state;
    }
};
