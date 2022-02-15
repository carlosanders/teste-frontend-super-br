import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RolesReducer, RolesState} from './roles.reducer';

export interface RolesAppState {
    roles: RolesState;
}

export const getRolesAppState = createFeatureSelector<RolesAppState>(
    'admin-roles-app'
);

export const getAppState: any = createSelector(
    getRolesAppState,
    (state: RolesAppState) => state
);

export const reducers: ActionReducerMap<RolesAppState> = {
    roles: RolesReducer
};

export * from './roles.reducer';
