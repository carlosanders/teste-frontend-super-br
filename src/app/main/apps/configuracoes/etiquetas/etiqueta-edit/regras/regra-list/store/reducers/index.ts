import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { RegraListReducer, RegraListState } from './regra-list.reducer';

export interface RegraListAppState
{
    regraList: RegraListState;
}

export const getRegraListAppState = createFeatureSelector<RegraListAppState>(
    'configuracoes-regra-list-app'
);

export const getAppState = createSelector(
    getRegraListAppState,
    (state: RegraListAppState) => state
);

export const reducers: ActionReducerMap<RegraListAppState> = {
    regraList: RegraListReducer
};

export * from './regra-list.reducer';
