import {createSelector} from '@ngrx/store';
import {getLoginAppState, LoginAppState, LoginState} from 'app/main/auth/login/store';

export const getLoginState: any = createSelector(
    getLoginAppState,
    (login: LoginAppState) => login.login
);

export const getProfile: any = createSelector(
    getLoginState,
    (login: LoginState) => login.profile
);

export const getConfig: any = createSelector(
    getLoginState,
    (login: LoginState) => login.config
);

export const getToken: any = createSelector(
    getLoginState,
    (login: LoginState) => login.token
);

export const getErrorMessage: any = createSelector(
    getLoginState,
    (login: LoginState) => login.errorMessage
);

export const getLoadingConfig: any = createSelector(
    getLoginState,
    (login: LoginState) => login.loadingConfig
);

export const getVersion: any = createSelector(
    getLoginState,
    (login: LoginState) => login.version
);

export const getVersionChanged: any = createSelector(
    getLoginState,
    (login: LoginState) => login.versionChange
);
