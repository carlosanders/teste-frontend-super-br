import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AdminReducer, AdminState} from './admin.reducer';

export interface AdminAppState {
    admin: AdminState;
}

export const getAdminAppState = createFeatureSelector<AdminAppState>(
    'admin-app'
);

export const getAppState: any = createSelector(
    getAdminAppState,
    (state: AdminAppState) => state
);

export const reducers: ActionReducerMap<AdminAppState> = {
    admin: AdminReducer
};

export * from './admin.reducer';
