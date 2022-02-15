import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {TemplatesListReducer, TemplatesListState} from './templates-list.reducer';

export interface TemplatesListAppState {
    templatesList: TemplatesListState;
}

export const getTemplatesListAppState = createFeatureSelector<TemplatesListAppState>(
    'templates-list-app'
);

export const getAppState: any = createSelector(
    getTemplatesListAppState,
    (state: TemplatesListAppState) => state
);

export const reducers: ActionReducerMap<TemplatesListAppState> = {
    templatesList: TemplatesListReducer
};

export * from './templates-list.reducer';
