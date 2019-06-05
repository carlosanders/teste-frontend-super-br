import * as SegurancaActions from '../actions/seguranca.actions';

export interface SegurancaState {
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const SegurancaInitialState: SegurancaState = {
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function SegurancaReducer(
    state = SegurancaInitialState,
    action: SegurancaActions.SegurancaActionsAll
): SegurancaState {
    switch (action.type) {

        case SegurancaActions.SAVE_SEGURANCA: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case SegurancaActions.SAVE_SEGURANCA_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case SegurancaActions.SAVE_SEGURANCA_FAILED: {
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
