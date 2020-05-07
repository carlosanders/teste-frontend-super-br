import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { RegisterReducers, RegisterState } from './register.reducer';

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
    register: RegisterReducers
};

export * from './register.reducer';
