import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {NavioEditReducer, NavioEditState} from './navio-edit.reducer';

export interface NavioEditAppState {
    navio: NavioEditState;
}

export const getNavioEditAppState = createFeatureSelector<NavioEditAppState>(
    'navio-edit-app'
);

export const getAppState: any = createSelector(
    getNavioEditAppState,
    (state: NavioEditAppState) => state
);

export const reducers: ActionReducerMap<NavioEditAppState> = {
    navio: NavioEditReducer
};

export * from './navio-edit.reducer';
