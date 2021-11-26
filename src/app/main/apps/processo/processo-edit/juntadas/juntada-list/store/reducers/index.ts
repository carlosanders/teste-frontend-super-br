import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {JuntadaListReducer, JuntadaListState} from './juntada-list.reducer';

export interface JuntadaListAppState
{
    juntadaList: JuntadaListState;
}

export const getJuntadaListAppState = createFeatureSelector<JuntadaListAppState>(
    'juntada-list-app'
);

export const getAppState: any = createSelector(
    getJuntadaListAppState,
    (state: JuntadaListAppState) => state
);

export const reducers: ActionReducerMap<JuntadaListAppState> = {
    juntadaList: JuntadaListReducer
};

export * from './juntada-list.reducer';
