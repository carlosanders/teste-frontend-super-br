import * as EsqueciSenhaActions from '../actions/esqueci-senha.actions';

export interface EsqueciSenhaState {
    success: boolean;
    errorMessage: string | null;
}

export const EsqueciSenhaInitialState: EsqueciSenhaState = {
    success: false,
    errorMessage: null
};

export function EsqueciSenhaReducers(state = EsqueciSenhaInitialState, action: EsqueciSenhaActions.EsqueciSenhaActionsAll): EsqueciSenhaState {
    switch (action.type) {
        case EsqueciSenhaActions.ESQUECI_SENHA_SUCCESS: {
            return {
                ...state,
                success: true,
                errorMessage: null
            };
        }
        case EsqueciSenhaActions.ESQUECI_SENHA_FAILURE: {
            return {
                ...state,
                errorMessage: action.payload.error
            };
        }
        case EsqueciSenhaActions.UNLOAD: {
            return {
                ...state,
                success: false,
                errorMessage: null
            };
        }
        default: {
            return state;
        }
    }
}
