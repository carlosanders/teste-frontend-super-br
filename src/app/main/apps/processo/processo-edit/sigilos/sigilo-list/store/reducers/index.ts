import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {SigiloListReducer, SigiloListState} from './sigilo-list.reducer';

export interface SigiloListAppState
{
    sigiloList: SigiloListState;
}

export const getSigiloListAppState = createFeatureSelector<SigiloListAppState>(
    'sigilo-list-app'
);

export const getAppState: any = createSelector(
    getSigiloListAppState,
    (state: SigiloListAppState) => state
);

export const reducers: ActionReducerMap<SigiloListAppState> = {
    sigiloList: SigiloListReducer
};

export * from './sigilo-list.reducer';
