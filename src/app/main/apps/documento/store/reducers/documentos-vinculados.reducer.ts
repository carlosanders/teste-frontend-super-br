import * as DocumentosVinculadosActions from '../actions/documentos-vinculados.actions';

export interface DocumentosVinculadosState {
    documentosId: number[];
    documentosLoaded: any;
    selectedDocumentosId: number[];
    deletingDocumentoIds: number[];
    assinandoDocumentoIds: number[];
}

export const DocumentosVinculadosInitialState: DocumentosVinculadosState = {
    documentosId: [],
    documentosLoaded: false,
    selectedDocumentosId: [],
    deletingDocumentoIds: [],
    assinandoDocumentoIds: []
};

export function DocumentosVinculadosReducer(
    state = DocumentosVinculadosInitialState,
    action: DocumentosVinculadosActions.DocumentosVinculadosActionsAll
): DocumentosVinculadosState {
    switch (action.type) {

        case DocumentosVinculadosActions.GET_DOCUMENTOS_VINCULADOS_SUCCESS: {
            return {
                ...state,
                documentosId: action.payload.entitiesId,
                documentosLoaded: action.payload.loaded,
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

        case DocumentosVinculadosActions.CHANGE_SELECTED_DOCUMENTOS_VINCULADOS: {
            return {
                ...state,
                selectedDocumentosId: action.payload
            };
        }

        default:
            return state;
    }
}
