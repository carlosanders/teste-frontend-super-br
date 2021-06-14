import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RegisterReducer, RegisterState} from './register.reducer';

export interface RegisterAppState
{
    register: RegisterState;
}

export const getRegisterAppState = createFeatureSelector<RegisterAppState>(
    'register-app'
);

export const getAppState = createSelector(
    getRegisterAppState,
    (state: RegisterAppState) => state
);

export const reducers: ActionReducerMap<RegisterAppState> = {
    register: RegisterReducer
};

export * from './register.reducer';
