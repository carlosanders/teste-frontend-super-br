import * as DocumentoActions from '../actions/documento.actions';

export interface DocumentoState {
    documentoId: number;
    currentComponenteDigitalId: number;
    loading: boolean;
    loaded: any;
}

export const DocumentoInitialState: DocumentoState = {
    documentoId: null,
    currentComponenteDigitalId: null,
    loading: false,
    loaded: false,
};

export function DocumentoReducer(state = DocumentoInitialState, action: DocumentoActions.DocumentoActionsAll): DocumentoState {
    switch (action.type) {

        case DocumentoActions.GET_DOCUMENTO: {
            return {
                ...DocumentoInitialState
            };
        }

        case DocumentoActions.UNLOAD_DOCUMENTO: {
            return {
                ...DocumentoInitialState
            };
        }

        case DocumentoActions.GET_DOCUMENTO_SUCCESS: {

            return {
                documentoId: action.payload.documentoId,
                currentComponenteDigitalId: action.payload.currentComponenteDigitalId,
                loading: false,
                loaded: action.payload.loaded,
            };
        }

        case DocumentoActions.GET_DOCUMENTO_FAILED: {
            return {
                documentoId: null,
                currentComponenteDigitalId: null,
                loading: false,
                loaded: false,
            };
        }

        case DocumentoActions.SET_CURRENT_STEP: {
            return {
                ...state,
                currentComponenteDigitalId: action.payload.id
            };
        }

        default:
            return state;
    }
}
