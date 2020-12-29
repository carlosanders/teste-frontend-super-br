import * as ProcessoViewDocumentosActions from '../actions/documentos.actions';
import * as AtividadeCreateDocumentosActions
    from '../../../../tarefas/tarefa-detail/atividades/atividade-create/store/actions/documentos.actions';

export interface ProcessoViewDocumentosState {
    documentosId: number[];
    documentosLoaded: any;
    selectedDocumentosId: number[];
    deletingDocumentoIds: number[];
    alterandoDocumentoIds: number[];
    assinandoDocumentoIds: number[];
    removendoAssinaturaDocumentoIds: number[];
    convertendoDocumentoIds: number[];
    undeletingDocumentoIds: number[];
    loading: boolean;
    loaded: boolean;
    loadingDocumentosExcluidos: boolean;
    lixeiraMinutas: boolean;
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
    undeletingDocumentoIds: [],
    loading: false,
    loaded: false,
    loadingDocumentosExcluidos: false,
    lixeiraMinutas: false
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
            }
        }

        case ProcessoViewDocumentosActions.GET_DOCUMENTOS_EXCLUIDOS: {
            return {
                ...state,
                documentosId: null,
                documentosLoaded: false,
                loadingDocumentosExcluidos: true,
                lixeiraMinutas: true
            }
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
            return {
                ...state,
                deletingDocumentoIds: [...state.deletingDocumentoIds, action.payload]
            };
        }

        case ProcessoViewDocumentosActions.DELETE_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                deletingDocumentoIds: state.deletingDocumentoIds.filter(id => id !== action.payload),
                selectedDocumentosId: state.selectedDocumentosId.filter(id => id !== action.payload),
                documentosId: state.documentosId.filter(id => id !== action.payload)
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

        case ProcessoViewDocumentosActions.UNDELETE_DOCUMENTO: {
            return {
                ...state,
                undeletingDocumentoIds: [...state.undeletingDocumentoIds, action.payload.documento.id],
            };
        }

        case ProcessoViewDocumentosActions.UNDELETE_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                undeletingDocumentoIds: state.undeletingDocumentoIds.filter(id => id !== action.payload.id),
                documentosId: state.documentosId.filter(id => id !== action.payload.id)
            };
        }

        case ProcessoViewDocumentosActions.UNDELETE_DOCUMENTO_FAILED: {
            return {
                ...state,
                undeletingDocumentoIds: state.undeletingDocumentoIds.filter(id => id !== action.payload.id)
            };
        }

        default:
            return state;
    }
}
