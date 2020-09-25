import * as DocumentoAvulsoEditActions from '../actions/documento-avulso-edit.actions';

export interface DocumentoAvulsoEditDadosBasicosState {
    saving: boolean;
    remetendo: boolean;
    encerrando: boolean;
    errors: any;
}

export const DocumentoAvulsoInitialState: DocumentoAvulsoEditDadosBasicosState = {
    saving: false,
    remetendo: false,
    encerrando: false,
    errors: false
};

export function DocumentoAvulsoEditDadosBasicosReducer(state = DocumentoAvulsoInitialState, action: DocumentoAvulsoEditActions.DocumentoAvulsoEditActionsAll): DocumentoAvulsoEditDadosBasicosState {

    switch (action.type) {

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

        case DocumentoAvulsoEditActions.REMETER_DOCUMENTO_AVULSO: {
            return {
                ...state,
                remetendo: true,
                errors: false
            };
        }

        case DocumentoAvulsoEditActions.REMETER_DOCUMENTO_AVULSO_SUCCESS: {
            return {
                ...state,
                remetendo: false,
                errors: false
            };
        }

        case DocumentoAvulsoEditActions.REMETER_DOCUMENTO_AVULSO_FAILED: {
            return {
                ...state,
                remetendo: false,
                errors: action.payload
            };
        }

        case DocumentoAvulsoEditActions.TOGGLE_ENCERRAMENTO_DOCUMENTO_AVULSO: {
            return {
                ...state,
                encerrando: true,
                errors: false
            };
        }

        case DocumentoAvulsoEditActions.TOGGLE_ENCERRAMENTO_DOCUMENTO_AVULSO_SUCCESS: {
            return {
                ...state,
                encerrando: false,
                errors: false
            };
        }

        case DocumentoAvulsoEditActions.TOGGLE_ENCERRAMENTO_DOCUMENTO_AVULSO_FAILED: {
            return {
                ...state,
                encerrando: false,
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
