import * as CompartilhamentoCreateActions from '../actions/compartilhamento-create.actions';

export interface CompartilhamentoCreateState {
    saving: boolean;
    errors: any;
}

export const CompartilhamentoCreateInitialState: CompartilhamentoCreateState = {
    saving: false,
    errors: false
};

export function CompartilhamentoCreateReducer(state = CompartilhamentoCreateInitialState, action: CompartilhamentoCreateActions.CompartilhamentoCreateActionsAll): CompartilhamentoCreateState {
    switch (action.type) {

        case CompartilhamentoCreateActions.CREATE_COMPARTILHAMENTO: {
            return {
                saving: false,
                errors: false
            };
        }

        case CompartilhamentoCreateActions.SAVE_COMPARTILHAMENTO: {
            return {
                ...state,
                saving: true
            };
        }

        case CompartilhamentoCreateActions.SAVE_COMPARTILHAMENTO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case CompartilhamentoCreateActions.SAVE_COMPARTILHAMENTO_FAILED: {
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
