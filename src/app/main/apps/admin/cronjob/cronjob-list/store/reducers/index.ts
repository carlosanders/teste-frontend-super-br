import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {CronjobListReducer, CronjobListState} from './cronjob-list.reducer';

export interface CronjobListAppState {
    cronjobList: CronjobListState;
}

export const getCronjobListAppState = createFeatureSelector<CronjobListAppState>(
    'cronjob-list'
);

export const getAppState: any = createSelector(
    getCronjobListAppState,
    (state: CronjobListAppState) => state
);

export const reducers: ActionReducerMap<CronjobListAppState> = {
    cronjobList: CronjobListReducer
};

export * from './cronjob-list.reducer';
