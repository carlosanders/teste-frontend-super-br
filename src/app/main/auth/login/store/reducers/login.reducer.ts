import * as LoginActions from '../actions/login.actions';

export interface LoginState {
    isAuthenticated: boolean;
    profile: any;
    token: string | null;
    errorMessage: string | null;
}

export const LoginInicialState: LoginState = {
    isAuthenticated: false,
    profile: null,
    token: null,
    errorMessage: null
};

export function LoginReducers(state = LoginInicialState, action: LoginActions.LoginActionsAll): LoginState {
    switch (action.type) {
        case LoginActions.LOGIN_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                profile: null,
                token: action.payload.token,
                errorMessage: null
            };
        }
        case LoginActions.LOGIN_FAILURE: {
            return {
                ...state,
                errorMessage: action.payload.error
            };
        }
        case LoginActions.LOGIN_PROFILE_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                profile: action.payload.profile,
                token: state.token,
                errorMessage: null
            };
        }
        case LoginActions.LOGIN_PROFILE_FAILURE: {
            return {
                ...state,
                errorMessage: action.payload.error
            };
        }
        case LoginActions.LOGOUT: {
            return LoginInicialState;
        }
        default: {
            return state;
        }
    }
}
