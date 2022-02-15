import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {LotacaoListReducer, LotacaoListState} from './lotacao-list.reducer';

export interface LotacaoListAppState
{
    lotacaoList: LotacaoListState;
}

export const getLotacaoListAppState = createFeatureSelector<LotacaoListAppState>(
    'lotacao-list-app'
);

export const getAppState: any = createSelector(
    getLotacaoListAppState,
    (state: LotacaoListAppState) => state
);

export const reducers: ActionReducerMap<LotacaoListAppState> = {
    lotacaoList: LotacaoListReducer
};

export * from './lotacao-list.reducer';
