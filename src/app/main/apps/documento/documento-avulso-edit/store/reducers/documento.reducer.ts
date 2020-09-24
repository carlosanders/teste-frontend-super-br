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

        case DocumentoActions.UNLOAD_DOCUMENTO: {
            return {
                ...DocumentoInitialState
            };
        }

        default:
            return state;
    }
}
