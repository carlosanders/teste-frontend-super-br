import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {LoginReducers, LoginState} from './login.reducer';

export interface LoginAppState
{
    login: LoginState;
}

export const getLoginAppState = createFeatureSelector<LoginAppState>(
    'login-app'
);

export const getAppState: any = createSelector(
    getLoginAppState,
    (state: LoginAppState) => state
);

export const reducers: ActionReducerMap<LoginAppState> = {
    login: LoginReducers
};

export * from './login.reducer';
