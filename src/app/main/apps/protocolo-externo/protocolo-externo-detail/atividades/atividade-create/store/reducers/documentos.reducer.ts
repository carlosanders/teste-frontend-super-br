import * as AtividadeCreateDocumentosActions from 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-create/store/actions/documentos.actions';

export interface AtividadeCreateDocumentosState {
    documentosId: number[];
    documentosLoaded: any;
    selectedDocumentosId: number[];
    deletingDocumentoIds: number[];
    assinandoDocumentoIds: number[];
    convertendoDocumentoIds: number[];
    loading: boolean;
    loaded: boolean;

}

export const AtividadeCreateDocumentosInitialState: AtividadeCreateDocumentosState = {
    documentosId: [],
    documentosLoaded: false,
    selectedDocumentosId: [],
    deletingDocumentoIds: [],
    assinandoDocumentoIds: [],
    convertendoDocumentoIds: [],
    loading: false,
    loaded: false,
};

export function AtividadeCreateDocumentosReducer(
    state = AtividadeCreateDocumentosInitialState,
    action: AtividadeCreateDocumentosActions.AtividadeCreateDocumentosActionsAll
): AtividadeCreateDocumentosState {
    switch (action.type) {

        case AtividadeCreateDocumentosActions.GET_DOCUMENTOS_SUCCESS: {
            return {
                ...state,
                documentosId: action.payload.entitiesId,
                documentosLoaded: action.payload.loaded,
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
        default:
            return state;
    }
}
