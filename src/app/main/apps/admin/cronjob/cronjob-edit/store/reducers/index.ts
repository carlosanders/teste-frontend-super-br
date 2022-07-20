import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {CronjobEditReducer, CronjobEditState} from './cronjob-edit.reducer';

export interface CronjobEditAppState {
    cronjob: CronjobEditState;
}

export const getCronjobEditAppState = createFeatureSelector<CronjobEditAppState>(
    'cronjob-edit-app'
);

export const getAppState: any = createSelector(
    getCronjobEditAppState,
    (state: CronjobEditAppState) => state
);

export const reducers: ActionReducerMap<CronjobEditAppState> = {
    cronjob: CronjobEditReducer
};

export * from './cronjob-edit.reducer';
