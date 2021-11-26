import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RolesListReducer, RolesListState} from './roles-list.reducer';

export interface RolesListAppState {
    rolesList: RolesListState;
}

export const getRolesListAppState = createFeatureSelector<RolesListAppState>(
    'admin-roles-list-app'
);

export const getAppState: any = createSelector(
    getRolesListAppState,
    (state: RolesListAppState) => state
);

export const reducers: ActionReducerMap<RolesListAppState> = {
    rolesList: RolesListReducer
};

export * from './roles-list.reducer';
