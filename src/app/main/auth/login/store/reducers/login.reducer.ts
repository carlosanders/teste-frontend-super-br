import * as LoginActions from '../actions/login.actions';

export interface LoginState {
    loadingConfig: boolean;
    isAuthenticated: boolean;
    profile: any;
    token: string | null;
    config: any | null;
    version: string | null;
    versionChange: string | null;
    errorMessage: string | null;
}

export const LoginInicialState: LoginState = {
    loadingConfig: false,
    isAuthenticated: false,
    profile: null,
    token: null,
    config: null,
    version: null,
    versionChange: null,
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
                version: action.payload.version,
                errorMessage: null
            };
        }
        case LoginActions.LOGIN_FAILURE: {
            return {
                ...state,
                errorMessage: action.payload.error
            };
        }
        case LoginActions.LOGIN_GOV_BR_FAILURE: {
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
        case LoginActions.LOGIN_REFRESH_TOKEN_SUCCESS: {
            return {
                ...state,
                token: action.payload.token,
                version: action.payload.version,
            };
        }
        case LoginActions.GET_CONFIG: {
            return {
                ...state,
                loadingConfig: true,
                config: null
            };
        }
        case LoginActions.GET_CONFIG_SUCCESS: {
            return {
                ...state,
                loadingConfig: false,
                config: action.payload
            };
        }
        case LoginActions.GET_CONFIG_FAILURE: {
            return {
                ...state,
                loadingConfig: false,
                config: {
                    error: true
                },
                errorMessage: action.payload.error
            };
        }
        case LoginActions.LOGOUT: {
            return LoginInicialState;
        }
        case LoginActions.VERSION_CHANGED: {
            return {
                ...state,
                versionChange: action.payload,
            }
        }
        case LoginActions.PASSWORD_EXPIRED: {
            return {
                ...state,
                token: action.payload,
            }
        }
        default: {
            return state;
        }
    }
}
