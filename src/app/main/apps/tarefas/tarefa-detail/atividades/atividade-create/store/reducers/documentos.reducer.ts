import * as AtividadeCreateDocumentosActions from 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-create/store/actions/documentos.actions';

export interface AtividadeCreateDocumentosState {
    documentosId: number[];
    documentosLoaded: any;
    selectedDocumentosId: number[];
    deletingDocumentoIds: number[];
    undeletingDocumentoIds: number[];
    alterandoDocumentoIds: number[];
    assinandoDocumentoIds: number[];
    removendoAssinaturaDocumentoIds: number[];
    convertendoDocumentoIds: number[];
    downloadDocumentosP7SIds: number[];
    loadDocumentosExcluidos: boolean;
    lixeiraMinutas: boolean;
    loading: boolean;
    loaded: boolean;
}

export const AtividadeCreateDocumentosInitialState: AtividadeCreateDocumentosState = {
    documentosId: [],
    documentosLoaded: false,
    selectedDocumentosId: [],
    deletingDocumentoIds: [],
    assinandoDocumentoIds: [],
    alterandoDocumentoIds: [],
    removendoAssinaturaDocumentoIds: [],
    convertendoDocumentoIds: [],
    downloadDocumentosP7SIds: [],
    undeletingDocumentoIds: [],
    loadDocumentosExcluidos: false,
    loading: false,
    loaded: false,
    lixeiraMinutas: false
};

export function AtividadeCreateDocumentosReducer(
    state = AtividadeCreateDocumentosInitialState,
    action: AtividadeCreateDocumentosActions.AtividadeCreateDocumentosActionsAll
): AtividadeCreateDocumentosState {
    switch (action.type) {

        case AtividadeCreateDocumentosActions.GET_DOCUMENTOS: {
            if (action.payload && action.payload['context'] &&
                    action.payload['context']['mostrarApagadas']) {

                return {
                    ...state,
                    documentosId: null,
                    loaded: false,
                    loadDocumentosExcluidos: true,
                    lixeiraMinutas: true
                };
            } else {
                return {
                    ...state,
                    documentosId: null,
                    loaded: false,
                    loadDocumentosExcluidos: false,
                    lixeiraMinutas: false
                };
            }
        }

        case AtividadeCreateDocumentosActions.GET_DOCUMENTOS_SUCCESS: {
            return {
                ...state,
                documentosId: action.payload.entitiesId,
                documentosLoaded: action.payload.loaded,
                loadDocumentosExcluidos: false
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
                ...AtividadeCreateDocumentosInitialState
            };
        }

        case AtividadeCreateDocumentosActions.DELETE_DOCUMENTO: {
            return {
                ...state,
                deletingDocumentoIds: [...state.deletingDocumentoIds, action.payload]
            };
        }

        case AtividadeCreateDocumentosActions.DELETE_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                deletingDocumentoIds: state.deletingDocumentoIds.filter(id => id !== action.payload),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload),
                documentosId: state.documentosId.filter(id => id !== action.payload)
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
                loaded: false,
                loading: false,
            };
        }

        case AtividadeCreateDocumentosActions.ASSINA_DOCUMENTO: {
            return {
                ...state,
                assinandoDocumentoIds: [...state.assinandoDocumentoIds, action.payload]
            };
        }

        case AtividadeCreateDocumentosActions.ASSINA_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case AtividadeCreateDocumentosActions.ASSINA_DOCUMENTO_FAILED: {
            return {
                ...state,
                assinandoDocumentoIds: state.assinandoDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case AtividadeCreateDocumentosActions.REMOVE_ASSINATURA_DOCUMENTO: {
            return {
                ...state,
                removendoAssinaturaDocumentoIds: [...state.removendoAssinaturaDocumentoIds, action.payload]
            };
        }

        case AtividadeCreateDocumentosActions.REMOVE_ASSINATURA_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                removendoAssinaturaDocumentoIds: state.removendoAssinaturaDocumentoIds.filter(id => id !== action.payload)
            };
        }

        case AtividadeCreateDocumentosActions.REMOVE_ASSINATURA_DOCUMENTO_FAILED: {
            return {
                ...state,
                removendoAssinaturaDocumentoIds: state.removendoAssinaturaDocumentoIds.filter(id => id !== action.payload)
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
            return {
                ...state,
                undeletingDocumentoIds: state.undeletingDocumentoIds.filter(id => id !== action.payload.id),
                documentosId: state.documentosId.filter(id => id !== action.payload.id)
            };
        }

        case AtividadeCreateDocumentosActions.UNDELETE_DOCUMENTO_FAILED: {
            return {
                ...state,
                undeletingDocumentoIds: state.undeletingDocumentoIds.filter(id => id !== action.payload.id)
            };
        }

        default:
            return state;
    }
}
