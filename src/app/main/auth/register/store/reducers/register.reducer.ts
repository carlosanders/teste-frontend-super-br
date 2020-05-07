import * as RegisterActions from '../actions/register.actions';

export interface RegisterState {
    usuarioId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const RegisterInicialState: RegisterState = {
    usuarioId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function RegisterReducers(
    state = RegisterInicialState,
    action: RegisterActions.RegisterActionsAll): RegisterState {
    switch (action.type) {
        case RegisterActions.REGISTER: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case RegisterActions.REGISTER_SUCCESS: {
            return {
                ...state,
                usuarioId: action.payload.id,
                loaded: {
                    id: 'usuarioHandle',
                    value: action.payload.id
                },
                saving: false,
                errors: false
            };
        }

        case RegisterActions.REGISTER_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        default: {
            return state;
        }
    }
}
