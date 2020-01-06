import * as AtividadeBlocoCreateDocumentosActionsAll from '../actions/documentos.actions';

export interface AtividadeBlocoCreateDocumentosState {
    documentosId: number[];
    documentosLoaded: any;
    selectedDocumentosId: number[];
    deletingDocumentoIds: number[];
    assinandoDocumentoIds: number[];
}

export const AtividadeBlocoCreateDocumentosInitialState: AtividadeBlocoCreateDocumentosState = {
    documentosId: [],
    documentosLoaded: false,
    selectedDocumentosId: [],
    deletingDocumentoIds: [],
    assinandoDocumentoIds: []
};

export function AtividadeBlocoCreateDocumentosReducer(
    state = AtividadeBlocoCreateDocumentosInitialState,
    action: AtividadeBlocoCreateDocumentosActionsAll.AtividadeBlocoCreateDocumentosActionsAll
): AtividadeBlocoCreateDocumentosState {
    switch (action.type) {

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
                deletingDocumentoIds: [...state.deletingDocumentoIds, action.payload]
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

        case AtividadeBlocoCreateDocumentosActionsAll.ASSINA_DOCUMENTO_BLOCO: {
            return {
                ...state,
                assinandoDocumentoIds: [...state.assinandoDocumentoIds, action.payload]
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

        case AtividadeBlocoCreateDocumentosActionsAll.CHANGE_SELECTED_DOCUMENTOS_BLOCO: {
            return {
                ...state,
                selectedDocumentosId: action.payload
            };
        }

        default:
            return state;
    }
}
