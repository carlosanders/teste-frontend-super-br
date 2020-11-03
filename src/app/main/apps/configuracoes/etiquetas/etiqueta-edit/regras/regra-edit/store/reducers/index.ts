import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { RegraEditReducer, RegraEditState } from './regra-edit.reducer';

export interface RegraEditAppState
{
    regra: RegraEditState;
}

export const getRegraEditAppState = createFeatureSelector<RegraEditAppState>(
    'configuracoes-regra-edit-app'
);

export const getAppState = createSelector(
    getRegraEditAppState,
    (state: RegraEditAppState) => state
);

export const reducers: ActionReducerMap<RegraEditAppState> = {
    regra: RegraEditReducer
};

export * from './regra-edit.reducer';
