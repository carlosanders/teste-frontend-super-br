import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RemessaEditReducer, RemessaEditState} from './remessa-edit.reducer';

export interface RemessaEditAppState
{
    tramitacao: RemessaEditState;
}

export const getRemessaEditAppState = createFeatureSelector<RemessaEditAppState>(
    'remessa-edit-app'
);

export const getAppState: any = createSelector(
    getRemessaEditAppState,
    (state: RemessaEditAppState) => state
);

export const reducers: ActionReducerMap<RemessaEditAppState> = {
    tramitacao: RemessaEditReducer
};

export * from './remessa-edit.reducer';
