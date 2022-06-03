import * as DocumentoAvulsoEditActions from '../actions/documento-avulso-edit.actions';

export interface DocumentoAvulsoEditDadosBasicosState {
    saving: boolean;
    remetendo: boolean;
    encerrando: boolean;
    errors: any;
    errorsRemetendo: any;
}

export const documentoAvulsoInitialState: DocumentoAvulsoEditDadosBasicosState = {
    saving: false,
    remetendo: false,
    encerrando: false,
    errors: false,
    errorsRemetendo: false
};

export const documentoAvulsoEditDadosBasicosReducer = (
    state = documentoAvulsoInitialState,
    action: DocumentoAvulsoEditActions.DocumentoAvulsoEditActionsAll
): DocumentoAvulsoEditDadosBasicosState => {

    switch (action.type) {

        case DocumentoAvulsoEditActions.UNLOAD_DOCUMENTO_AVULSO: {
            return {
                ...documentoAvulsoInitialState
            };
        }

        case DocumentoAvulsoEditActions.SAVE_DOCUMENTO_AVULSO: {
            return {
                ...state,
                saving: true,
                errors: false,
                errorsRemetendo: false
            };
        }

        case DocumentoAvulsoEditActions.SAVE_DOCUMENTO_AVULSO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false,
                errorsRemetendo: false
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
                errorsRemetendo: false
            };
        }

        case DocumentoAvulsoEditActions.REMETER_DOCUMENTO_AVULSO_SUCCESS: {
            return {
                ...state,
                remetendo: false,
                errorsRemetendo: false
            };
        }

        case DocumentoAvulsoEditActions.REMETER_DOCUMENTO_AVULSO_FAILED: {
            return {
                ...state,
                remetendo: false,
                errorsRemetendo: action.payload
            };
        }

        case DocumentoAvulsoEditActions.TOGGLE_ENCERRAMENTO_DOCUMENTO_AVULSO: {
            return {
                ...state,
                encerrando: true,
                errors: false,
                errorsRemetendo: false
            };
        }

        case DocumentoAvulsoEditActions.TOGGLE_ENCERRAMENTO_DOCUMENTO_AVULSO_SUCCESS: {
            return {
                ...state,
                encerrando: false,
                errors: false,
                errorsRemetendo: false
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
};
