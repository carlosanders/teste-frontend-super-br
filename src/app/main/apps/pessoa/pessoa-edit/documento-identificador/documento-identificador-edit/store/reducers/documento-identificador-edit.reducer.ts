import * as DocumentoIdentificadorEditActions from '../actions/documento-identificador-edit.actions';

export interface DocumentoIdentificadorEditState {
    documentoIdentificadorId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const DocumentoIdentificadorEditInitialState: DocumentoIdentificadorEditState = {
    documentoIdentificadorId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function DocumentoIdentificadorEditReducer(
    state = DocumentoIdentificadorEditInitialState,
    action: DocumentoIdentificadorEditActions.DocumentoIdentificadorEditActionsAll
): DocumentoIdentificadorEditState {
    switch (action.type) {

        case DocumentoIdentificadorEditActions.GET_DOCUMENTO_IDENTIFICADOR: {
            return {
                ...state,
                documentoIdentificadorId: null,
                loading: true
            };
        }

        case DocumentoIdentificadorEditActions.GET_DOCUMENTO_IDENTIFICADOR_SUCCESS: {

            return {
                ...state,
                documentoIdentificadorId: action.payload.documentoIdentificadorId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case DocumentoIdentificadorEditActions.CREATE_DOCUMENTO_IDENTIFICADOR: {
            return {
                ...state,
                documentoIdentificadorId: null,
                loaded: {
                    id: 'documentoIdentificadorHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case DocumentoIdentificadorEditActions.GET_DOCUMENTO_IDENTIFICADOR_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case DocumentoIdentificadorEditActions.SAVE_DOCUMENTO_IDENTIFICADOR: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case DocumentoIdentificadorEditActions.SAVE_DOCUMENTO_IDENTIFICADOR_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case DocumentoIdentificadorEditActions.SAVE_DOCUMENTO_IDENTIFICADOR_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
