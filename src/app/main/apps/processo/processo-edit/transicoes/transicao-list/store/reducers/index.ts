import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {TransicaoListReducer, TransicaoListState} from './transicao-list.reducer';

export interface TransicaoListAppState
{
    transicaoList: TransicaoListState;
}

export const getTransicaoListAppState = createFeatureSelector<TransicaoListAppState>(
    'transicao-list-app'
);

export const getAppState: any = createSelector(
    getTransicaoListAppState,
    (state: TransicaoListAppState) => state
);

export const reducers: ActionReducerMap<TransicaoListAppState> = {
    transicaoList: TransicaoListReducer
};

export * from './transicao-list.reducer';
