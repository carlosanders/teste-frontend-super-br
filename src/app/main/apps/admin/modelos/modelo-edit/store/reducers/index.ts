import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AdminModeloEditReducer, AdminModeloEditState} from './modelo-edit.reducer';

export interface AdminModeloEditAppState
{
    modelo: AdminModeloEditState;
}

export const getAdminModeloEditAppState = createFeatureSelector<AdminModeloEditAppState>(
    'admin-modelo-edit-app'
);

export const getAppState: any = createSelector(
    getAdminModeloEditAppState,
    (state: AdminModeloEditAppState) => state
);

export const reducers: ActionReducerMap<AdminModeloEditAppState> = {
    modelo: AdminModeloEditReducer
};

export * from './modelo-edit.reducer';
