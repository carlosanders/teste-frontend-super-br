import * as AtividadeCreateDocumentosActions from 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-create/store/actions/documentos.actions';

export interface AtividadeCreateDocumentosState {
    documentosId: number[];
    documentosLoaded: any;
    selectedDocumentosId: number[];
    deletingDocumentoIds: number[];
    assinandoDocumentoIds: number[];
}

export const AtividadeCreateDocumentosInitialState: AtividadeCreateDocumentosState = {
    documentosId: [],
    documentosLoaded: false,
    selectedDocumentosId: [],
    deletingDocumentoIds: [],
    assinandoDocumentoIds: []
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

        default:
            return state;
    }
}
