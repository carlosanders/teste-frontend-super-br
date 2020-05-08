import * as RegisterActions from '../actions/register.actions';

export interface RegisterState {
    usuarioId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
    isRegistred: boolean;
}

export const RegisterInicialState: RegisterState = {
    usuarioId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false,
    isRegistred: false
};

export function RegisterReducer(
    state = RegisterInicialState,
    action: RegisterActions.RegisterActionsAll): RegisterState {
    switch (action.type) {
        case RegisterActions.REGISTER: {
            return {
                ...state,
                saving: true,
                errors: false,
                isRegistred: false
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
                errors: false,
                isRegistred: true
            };
        }

        case RegisterActions.REGISTER_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload,
                isRegistred: false
            };
        }

        default: {
            return state;
        }
    }
}
