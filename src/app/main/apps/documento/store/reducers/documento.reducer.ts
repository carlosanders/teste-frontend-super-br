import * as DocumentoActions from '../actions/documento.actions';

export interface DocumentoState {
    documentoId: number;
    currentComponenteDigitalId: number;
    loading: boolean;
    loaded: any;
    saving: boolean;
    errors: any;
    assinandoDocumentoIds: number[];
}

export const DocumentoInitialState: DocumentoState = {
    documentoId: null,
    currentComponenteDigitalId: null,
    loading: false,
    loaded: false,
    saving: false,
    errors: false,
    assinandoDocumentoIds: []
};

export function DocumentoReducer(state = DocumentoInitialState, action: DocumentoActions.DocumentoActionsAll): DocumentoState {
    switch (action.type) {

        case DocumentoActions.GET_DOCUMENTO: {
            return {
                documentoId: null,
                currentComponenteDigitalId: null,
                loaded: false,
                loading: true,
                saving: false,
                errors: false,
                assinandoDocumentoIds: []
            };
        }

        case DocumentoActions.UNLOAD_DOCUMENTO: {
            return {
                documentoId: null,
                currentComponenteDigitalId: null,
                loading: false,
                loaded: false,
                saving: false,
                errors: false,
                assinandoDocumentoIds: []
            };
        }

        case DocumentoActions.GET_DOCUMENTO_SUCCESS: {

            return {
                documentoId: action.payload.documentoId,
                currentComponenteDigitalId: action.payload.currentComponenteDigitalId,
                loading: false,
                loaded: action.payload.loaded,
                saving: false,
                errors: false,
                assinandoDocumentoIds: []
            };
        }

        case DocumentoActions.GET_DOCUMENTO_FAILED: {
            return {
                documentoId: null,
                currentComponenteDigitalId: null,
                loading: false,
                loaded: false,
                saving: false,
                errors: false,
                assinandoDocumentoIds: []
            };
        }

        case DocumentoActions.SAVE_DOCUMENTO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case DocumentoActions.SAVE_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case DocumentoActions.SAVE_DOCUMENTO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case DocumentoActions.SET_CURRENT_STEP: {
            return {
                ...state,
                currentComponenteDigitalId: action.payload.id
            };
        }

        case DocumentoActions.ASSINA_DOCUMENTO: {
            return {
                ...state,
                assinandoDocumentoIds: [...state.assinandoDocumentoIds, state.documentoId]
            };
        }

        case DocumentoActions.ASSINA_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                assinandoDocumentoIds: []
            };
        }

        case DocumentoActions.ASSINA_DOCUMENTO_FAILED: {
            return {
                ...state,
                assinandoDocumentoIds: []
            };
        }

        default:
            return state;
    }
}
