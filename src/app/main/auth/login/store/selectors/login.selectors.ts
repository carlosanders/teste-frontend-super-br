import { createSelector } from '@ngrx/store';
import {getLoginAppState, LoginAppState, LoginState} from 'app/main/auth/login/store';

export const getLoginState = createSelector(
    getLoginAppState,
    (login: LoginAppState) => login.login
);

export const getProfile = createSelector(
    getLoginState,
    (login: LoginState) => login.profile
);

export const getConfig = createSelector(
    getLoginState,
    (login: LoginState) => login.config
);

export const getToken = createSelector(
    getLoginState,
    (login: LoginState) => login.token
);

export const getErrorMessage = createSelector(
    getLoginState,
    (login: LoginState) => login.errorMessage
);

export const getLoadingConfig = createSelector(
    getLoginState,
    (login: LoginState) => login.loadingConfig
);
