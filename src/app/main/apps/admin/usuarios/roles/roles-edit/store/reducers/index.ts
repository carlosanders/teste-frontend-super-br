import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RolesEditReducer, RoleEditState} from './roles-edit.reducer';

export interface RoleEditAppState {
    role: RoleEditState;
}

export const getRoleEditAppState = createFeatureSelector<RoleEditAppState>(
    'admin-role-edit-app'
);

export const getAppState: any = createSelector(
    getRoleEditAppState,
    (state: RoleEditAppState) => state
);

export const reducers: ActionReducerMap<RoleEditAppState> = {
    role: RolesEditReducer
};

export * from './roles-edit.reducer';
