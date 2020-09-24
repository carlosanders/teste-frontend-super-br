import {createSelector} from '@ngrx/store';
import {AdminAppState, AdminState, getAdminAppState} from '../reducers';


export const getAdminState = createSelector(
    getAdminAppState,
    (state: AdminAppState) => state.admin
);

export const getHasLoaded = createSelector(
    getAdminState,
    (state: AdminState) => state.loaded
);

export const getErrors = createSelector(
    getAdminState,
    (state: AdminState) => state.errors
);
