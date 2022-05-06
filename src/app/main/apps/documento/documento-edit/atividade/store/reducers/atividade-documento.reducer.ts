import * as AtividadeDocumentoActions from '../actions/atividade-documento.actions';

export interface AtividadeDocumentoState {
    saving: boolean;
    errors: any;
}

export const atividadeDocumentoInitialState: AtividadeDocumentoState = {
    saving: false,
    errors: false,
};

export const atividadeDocumentoReducer = (
    state = atividadeDocumentoInitialState,
    action: AtividadeDocumentoActions.AtividadeDocumentoActionsAll
): AtividadeDocumentoState => {
    switch (action.type) {

        case AtividadeDocumentoActions.CREATE_ATIVIDADE: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case AtividadeDocumentoActions.SAVE_ATIVIDADE: {
            return {
                ...state,
                saving: true
            };
        }

        case AtividadeDocumentoActions.SAVE_ATIVIDADE_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case AtividadeDocumentoActions.SAVE_ATIVIDADE_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        default:
            return state;
    }
};
