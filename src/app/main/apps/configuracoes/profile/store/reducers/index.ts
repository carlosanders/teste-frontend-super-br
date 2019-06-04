import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileReducer, ProfileState } from './profile.reducer';

export interface ProfileAppState
{
    assunto: ProfileState;
}

export const getProfileAppState = createFeatureSelector<ProfileAppState>(
    'profile-app'
);

export const getAppState = createSelector(
    getProfileAppState,
    (state: ProfileAppState) => state
);

export const reducers: ActionReducerMap<ProfileAppState> = {
    assunto: ProfileReducer
};

export * from './profile.reducer';
