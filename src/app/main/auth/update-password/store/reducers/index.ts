import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {UpdatePasswordReducers, UpdatePasswordState} from './update-password.reducer';

export interface UpdatePasswordAppState
{
    updatePassword: UpdatePasswordState;
}

export const GetUpdatePasswordAppState = createFeatureSelector<UpdatePasswordAppState>(
    'update-password-app'
);

export const getAppState: any = createSelector(
    GetUpdatePasswordAppState,
    (state: UpdatePasswordAppState) => state
);

export const reducers: ActionReducerMap<UpdatePasswordAppState> = {
    updatePassword: UpdatePasswordReducers
};

export * from './update-password.reducer';
