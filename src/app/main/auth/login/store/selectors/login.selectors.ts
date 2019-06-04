import { createSelector } from '@ngrx/store';
import { getLoginAppState, LoginAppState } from 'app/main/auth/login/store';

export const getProfile = createSelector(
    getLoginAppState,
    (login: LoginAppState) => login.login.profile
);
