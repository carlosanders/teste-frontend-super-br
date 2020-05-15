import * as NumeroUnicoDocumentoEditActions from '../actions/numero-unico-documento-edit.actions';

export interface NumeroUnicoDocumentoEditState {
    numeroUnicoDocumentoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const NumeroUnicoDocumentoInitialState: NumeroUnicoDocumentoEditState = {
    numeroUnicoDocumentoId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function NumeroUnicoDocumentoEditReducer(
    state = NumeroUnicoDocumentoInitialState,
    action: NumeroUnicoDocumentoEditActions.NumeroUnicoDocumentoEditActionsAll
): NumeroUnicoDocumentoEditState {
    switch (action.type) {

        case NumeroUnicoDocumentoEditActions.GET_NUMERO_UNICO_DOCUMENTO: {
            return {
                ...state,
                numeroUnicoDocumentoId: null,
                loading: true
            };
        }

        case NumeroUnicoDocumentoEditActions.GET_NUMERO_UNICO_DOCUMENTO_SUCCESS: {

            return {
                ...state,
                numeroUnicoDocumentoId: action.payload.numeroUnicoDocumentoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case NumeroUnicoDocumentoEditActions.CREATE_NUMERO_UNICO_DOCUMENTO: {
            return {
                ...state,
                numeroUnicoDocumentoId: null,
                loaded: {
                    id: 'numeroUnicoDocumentoHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case NumeroUnicoDocumentoEditActions.GET_NUMERO_UNICO_DOCUMENTO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case NumeroUnicoDocumentoEditActions.SAVE_NUMERO_UNICO_DOCUMENTO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case NumeroUnicoDocumentoEditActions.SAVE_NUMERO_UNICO_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case NumeroUnicoDocumentoEditActions.SAVE_NUMERO_UNICO_DOCUMENTO_FAILED: {
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
