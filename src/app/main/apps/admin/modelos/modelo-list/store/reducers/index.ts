import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AdminModeloListReducer, AdminModeloListState} from './modelo-list.reducer';

export interface AdminModeloListAppState
{
    modeloList: AdminModeloListState;
}

export const getAdminModeloListAppState = createFeatureSelector<AdminModeloListAppState>(
    'admin-modelo-list-app'
);

export const getAppState: any = createSelector(
    getAdminModeloListAppState,
    (state: AdminModeloListAppState) => state
);

export const reducers: ActionReducerMap<AdminModeloListAppState> = {
    modeloList: AdminModeloListReducer
};

export * from './modelo-list.reducer';
