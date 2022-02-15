import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ActivateReducer, ActivateState} from './activate.reducer';

export interface ActivateAppState
{
    activate: ActivateState;
}

export const getActivateAppState = createFeatureSelector<ActivateAppState>(
    'activate-app'
);

export const getAppState: any = createSelector(
    getActivateAppState,
    (state: ActivateAppState) => state
);

export const reducers: ActionReducerMap<ActivateAppState> = {
    activate: ActivateReducer
};

export * from './activate.reducer';
