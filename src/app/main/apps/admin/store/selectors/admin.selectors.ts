import {createSelector} from '@ngrx/store';
import {AdminAppState, AdminState, getAdminAppState} from '../reducers';


export const getAdminState: any = createSelector(
    getAdminAppState,
    (state: AdminAppState) => state.admin
);

export const getHasLoaded: any = createSelector(
    getAdminState,
    (state: AdminState) => state.loaded
);

export const getErrors: any = createSelector(
    getAdminState,
    (state: AdminState) => state.errors
);
