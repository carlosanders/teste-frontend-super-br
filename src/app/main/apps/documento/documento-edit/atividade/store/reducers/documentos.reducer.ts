import * as DocumentosActions from '../actions/documentos.actions';

export interface DocumentosState {
    documentosId: number[];
    selectedDocumentosId: number[];
    loaded: any;
}

export const DocumentosInitialState: DocumentosState = {
    documentosId: [],
    selectedDocumentosId: [],
    loaded: false
};

export function DocumentosReducer(state = DocumentosInitialState, action: DocumentosActions.DocumentosActionsAll): DocumentosState {
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

        case DocumentosActions.UNLOAD_DOCUMENTOS: {
            return {
                ...DocumentosInitialState
            };
        }

        default:
            return state;

    }
}
