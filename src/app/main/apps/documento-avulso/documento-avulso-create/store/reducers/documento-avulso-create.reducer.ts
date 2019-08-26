import * as DocumentoAvulsoCreateActions from '../actions/documento-avulso-create.actions';

export interface DocumentoAvulsoCreateState {
    saving: boolean;
    errors: any;
    loaded: any;
}

export const DocumentoAvulsoCreateInitialState: DocumentoAvulsoCreateState = {
    saving: false,
    errors: false,
    loaded: false,
};

export function DocumentoAvulsoCreateReducer(
    state = DocumentoAvulsoCreateInitialState,
    action: DocumentoAvulsoCreateActions.DocumentoAvulsoCreateActionsAll
): DocumentoAvulsoCreateState {
    switch (action.type) {

        case DocumentoAvulsoCreateActions.CREATE_DOCUMENTO_AVULSO: {
            return {
                saving: false,
                errors: false,
                loaded: action.payload
            };
        }

        case DocumentoAvulsoCreateActions.SAVE_DOCUMENTO_AVULSO: {
            return {
                ...state,
                saving: true
            };
        }

        case DocumentoAvulsoCreateActions.SAVE_DOCUMENTO_AVULSO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case DocumentoAvulsoCreateActions.SAVE_DOCUMENTO_AVULSO_FAILED: {
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
