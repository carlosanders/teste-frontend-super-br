import * as DocumentosActions from '../actions/documentos.actions';

export interface DocumentosState {
    documentosId: number[];
    selectedDocumentosId: number[];
    alterandoDocumentoIds: number[];
    loaded: any;
}

export const documentosInitialState: DocumentosState = {
    documentosId: [],
    selectedDocumentosId: [],
    alterandoDocumentoIds: [],
    loaded: false
};

export const documentosReducer = (
    state = documentosInitialState,
    action: DocumentosActions.DocumentosActionsAll
): DocumentosState => {
    switch (action.type) {

        case DocumentosActions.GET_DOCUMENTOS: {
            return {
                ...state,
                documentosId: [],
                selectedDocumentosId: []
            };
        }

        case DocumentosActions.GET_DOCUMENTOS_SUCCESS: {
            return {
                ...state,
                documentosId: action.payload.entitiesId,
                loaded: action.payload.loaded
            };
        }

        case DocumentosActions.CHANGE_SELECTED_DOCUMENTOS: {
            return {
                ...state,
                selectedDocumentosId: action.payload
            };
        }

        case DocumentosActions.UPDATE_DOCUMENTO: {
            return {
                ...state,
                alterandoDocumentoIds: [...state.alterandoDocumentoIds, action.payload.documento.id],
                loaded: false,
            };
        }

        case DocumentosActions.UPDATE_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload),
                loaded: true,
            };
        }

        case DocumentosActions.UPDATE_DOCUMENTO_FAILED: {
            return {
                ...state,
                alterandoDocumentoIds: state.alterandoDocumentoIds.filter(id => id !== action.payload),
                loaded: false,
            };
        }

        case DocumentosActions.UNLOAD_DOCUMENTOS: {
            return {
                ...documentosInitialState
            };
        }

        default:
            return state;

    }
};
