import * as DocumentoEditActions from '../actions/documento-edit.actions';

export interface DocumentoEditDadosBasicosState {
    saving: boolean;
    remetendo: boolean;
    encerrando: boolean;
    errors: any;
}

export const DocumentoInitialState: DocumentoEditDadosBasicosState = {
    saving: false,
    remetendo: false,
    encerrando: false,
    errors: false
};

export function DocumentoEditDadosBasicosReducer(state = DocumentoInitialState, action: DocumentoEditActions.DocumentoEditActionsAll): DocumentoEditDadosBasicosState {

    switch (action.type) {

        case DocumentoEditActions.SAVE_DOCUMENTO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case DocumentoEditActions.SAVE_DOCUMENTO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case DocumentoEditActions.SAVE_DOCUMENTO_FAILED: {
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
