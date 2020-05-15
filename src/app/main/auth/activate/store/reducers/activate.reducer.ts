import * as ActivateActions from '../actions/activate.actions';

export interface ActivateState {
    usuarioId: number;
    errors: any;
    loading: boolean;
    loaded: any;
    isActived: boolean;
}

export const ActivateInicialState: ActivateState = {
    usuarioId: null,
    errors: false,
    loading: false,
    loaded: false,
    isActived: false
};

export function ActivateReducer(
    state = ActivateInicialState,
    action: ActivateActions.ActivateActionsAll): ActivateState {
    switch (action.type) {
        case ActivateActions.ACTIVATE: {
            return {
                ...state,
                errors: false,
                isActived: false
            };
        }

        case ActivateActions.ACTIVATE_SUCCESS: {
            return {
                ...state,
                usuarioId: action.payload.id,
                loaded: {
                    id: 'usuarioHandle',
                    value: action.payload.id
                },
                errors: false,
                isActived: true
            };
        }

        case ActivateActions.ACTIVATE_FAILED: {
            return {
                ...state,
                errors: action.payload,
                isActived: false
            };
        }

        default: {
            return state;
        }
    }
}
