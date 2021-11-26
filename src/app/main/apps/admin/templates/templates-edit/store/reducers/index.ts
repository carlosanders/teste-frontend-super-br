import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {TemplatesEditReducer, TemplatesEditState} from './templates-edit.reducer';

export interface TemplatesEditAppState {
    templates: TemplatesEditState;
}

export const getTemplatesEditAppState = createFeatureSelector<TemplatesEditAppState>(
    'templates-edit-app'
);

export const getAppState: any = createSelector(
    getTemplatesEditAppState,
    (state: TemplatesEditAppState) => state
);

export const reducers: ActionReducerMap<TemplatesEditAppState> = {
    templates: TemplatesEditReducer
};

export * from './templates-edit.reducer';
