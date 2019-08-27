import * as DocumentoCopiaCreateBlocoActions from '../actions/documento-copia-create-bloco.actions';

export interface DocumentoCopiaCreateBlocoState {
    savingJuntadasId: number[];
    errors: any;
}

export const DocumentoCopiaCreateInitialState: DocumentoCopiaCreateBlocoState = {
    savingJuntadasId: [],
    errors: false
};

export function DocumentoCopiaCreateBlocoReducer(
    state = DocumentoCopiaCreateInitialState, action: DocumentoCopiaCreateBlocoActions.DocumentoCopiaCreateBlocoActionsAll
): DocumentoCopiaCreateBlocoState {
    switch (action.type) {

        case DocumentoCopiaCreateBlocoActions.CREATE_DOCUMENTO_COPIA: {
            return {
                savingJuntadasId: [],
                errors: false
            };
        }

        case DocumentoCopiaCreateBlocoActions.SAVE_DOCUMENTO_COPIA: {
            return {
                ...state,
                savingJuntadasId: [...state.savingJuntadasId, action.payload.juntadaId]
            };
        }

        case DocumentoCopiaCreateBlocoActions.SAVE_DOCUMENTO_COPIA_SUCCESS: {
            return {
                ...state,
                savingJuntadasId: state.savingJuntadasId.filter(id => id !== action.payload.juntadaId)
            };
        }

        case DocumentoCopiaCreateBlocoActions.SAVE_DOCUMENTO_COPIA_FAILED: {
            return {
                ...state,
                savingJuntadasId: state.savingJuntadasId.filter(id => id !== action.payload.juntadaId),
                errors: action.payload.errors
            };
        }

        default:
            return state;
    }
}
