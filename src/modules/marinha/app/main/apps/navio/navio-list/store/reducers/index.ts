import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {NavioListReducer, NavioListState} from './navio-list.reducer';

export interface NavioListAppState {
    navioList: NavioListState;
}

export const getNavioListAppState = createFeatureSelector<NavioListAppState>(
    'navio-list'
);

export const getAppState: any = createSelector(
    getNavioListAppState,
    (state: NavioListAppState) => state
);

export const reducers: ActionReducerMap<NavioListAppState> = {
    navioList: NavioListReducer
};

export * from './navio-list.reducer';
