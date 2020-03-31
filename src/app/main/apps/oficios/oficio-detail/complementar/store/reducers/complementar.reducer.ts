import * as ComplementarActions from '../actions';

export interface ComplementarState {
    saving: boolean;
    errors: any;
}

export const ComplementarInitialState: ComplementarState = {
    saving: false,
    errors: false
};

export function ComplementarReducer(state = ComplementarInitialState, action: ComplementarActions.ComplementarActionsAll): ComplementarState {

    switch (action.type) {

        case ComplementarActions.SAVE_COMPLEMENTAR: {
            return {
                saving: false,
                errors: false
            };
        }

        case ComplementarActions.SAVE_COMPLEMENTAR_SUCCESS: {
            return {
                ... state,
                saving: true,
                errors: false
            };
        }

        case ComplementarActions.SAVE_COMPLEMENTAR_FAILED: {
            return {
                ... state,
                saving: true,
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
