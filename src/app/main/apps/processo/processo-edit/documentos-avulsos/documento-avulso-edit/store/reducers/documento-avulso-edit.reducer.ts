import * as DocumentoAvulsoEditActions from '../actions/documento-avulso-edit.actions';

export interface DocumentoAvulsoEditState {
    documentoAvulsoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const DocumentoAvulsoEditInitialState: DocumentoAvulsoEditState = {
    documentoAvulsoId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function DocumentoAvulsoEditReducer(
    state = DocumentoAvulsoEditInitialState,
    action: DocumentoAvulsoEditActions.DocumentoAvulsoEditActionsAll
): DocumentoAvulsoEditState {
    switch (action.type) {

        case DocumentoAvulsoEditActions.GET_DOCUMENTO_AVULSO: {
            return {
                ...state,
                documentoAvulsoId: null,
                loading: true
            };
        }

        case DocumentoAvulsoEditActions.GET_DOCUMENTO_AVULSO_SUCCESS: {

            return {
                ...state,
                documentoAvulsoId: action.payload.documentoAvulsoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case DocumentoAvulsoEditActions.CREATE_DOCUMENTO_AVULSO: {
            return {
                ...state,
                documentoAvulsoId: null,
                loaded: {
                    id: 'documentoAvulsoHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case DocumentoAvulsoEditActions.GET_DOCUMENTO_AVULSO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case DocumentoAvulsoEditActions.SAVE_DOCUMENTO_AVULSO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case DocumentoAvulsoEditActions.SAVE_DOCUMENTO_AVULSO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case DocumentoAvulsoEditActions.SAVE_DOCUMENTO_AVULSO_FAILED: {
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
