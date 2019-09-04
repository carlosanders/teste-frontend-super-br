import * as DocumentoAvulsoActions from '../actions/documento-avulso.actions';

export interface DocumentoAvulsoState {
    saving: boolean;
    remetendo: boolean;
    encerrando: boolean;
    errors: any;
}

export const DocumentoAvulsoInitialState: DocumentoAvulsoState = {
    saving: false,
    remetendo: false,
    encerrando: false,
    errors: false
};

export function DocumentoAvulsoReducer(state = DocumentoAvulsoInitialState, action: DocumentoAvulsoActions.DocumentoAvulsoActionsAll): DocumentoAvulsoState {
    switch (action.type) {

        case DocumentoAvulsoActions.SAVE_DOCUMENTO_AVULSO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case DocumentoAvulsoActions.SAVE_DOCUMENTO_AVULSO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case DocumentoAvulsoActions.SAVE_DOCUMENTO_AVULSO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case DocumentoAvulsoActions.REMETER_DOCUMENTO_AVULSO: {
            return {
                ...state,
                remetendo: true,
                errors: false
            };
        }

        case DocumentoAvulsoActions.REMETER_DOCUMENTO_AVULSO_SUCCESS: {
            return {
                ...state,
                remetendo: false,
                errors: false
            };
        }

        case DocumentoAvulsoActions.REMETER_DOCUMENTO_AVULSO_FAILED: {
            return {
                ...state,
                remetendo: false,
                errors: action.payload
            };
        }

        case DocumentoAvulsoActions.TOGGLE_ENCERRAMENTO_DOCUMENTO_AVULSO: {
            return {
                ...state,
                encerrando: true,
                errors: false
            };
        }

        case DocumentoAvulsoActions.TOGGLE_ENCERRAMENTO_DOCUMENTO_AVULSO_SUCCESS: {
            return {
                ...state,
                encerrando: false,
                errors: false
            };
        }

        case DocumentoAvulsoActions.TOGGLE_ENCERRAMENTO_DOCUMENTO_AVULSO_FAILED: {
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
