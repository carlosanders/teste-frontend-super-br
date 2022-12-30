import * as ActivateActions from '../actions/activate.actions';

export interface ActivateState {
    errors: any;
    loading: boolean;
    loaded: any;
    isActivated: boolean;
}

export const ActivateInicialState: ActivateState = {
    errors: false,
    loading: false,
    loaded: false,
    isActivated: false
};

export function ActivateReducer(
    state = ActivateInicialState,
    action: ActivateActions.ActivateActionsAll): ActivateState {
    switch (action.type) {
        case ActivateActions.ACTIVATE: {
            return {
                ...state,
                errors: false,
                loading: true,
                isActivated: false
            };
        }

        case ActivateActions.ACTIVATE_SUCCESS: {
            return {
                ...state,
                loaded: action.payload.loaded,
                loading: false,
                errors: false,
                isActivated: action.payload.usuario.enabled
            };
        }

        case ActivateActions.ACTIVATE_FAILED: {
            return {
                ...state,
                errors: action.payload,
                isActivated: false,
                loading: false,
            };
        }

        default: {
            return state;
        }
    }
}
