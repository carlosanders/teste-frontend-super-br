import {createSelector} from '@ngrx/store';
import {getProfileAppState, ProfileAppState, ProfileState} from '../reducers';

export const getProfileState = createSelector(
    getProfileAppState,
    (state: ProfileAppState) => state.assunto
);

export const getIsSaving = createSelector(
    getProfileState,
    (state: ProfileState) => state.saving
);

export const getErrors = createSelector(
    getProfileState,
    (state: ProfileState) => state.errors
);
