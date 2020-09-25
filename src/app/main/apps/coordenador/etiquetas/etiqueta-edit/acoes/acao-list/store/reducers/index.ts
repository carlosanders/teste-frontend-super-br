import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AcaoListReducer, AcaoListState } from './acao-list.reducer';

export interface AcaoListAppState
{
    acaoList: AcaoListState;
}

export const getAcaoListAppState = createFeatureSelector<AcaoListAppState>(
    'acao-list-app'
);

export const getAppState = createSelector(
    getAcaoListAppState,
    (state: AcaoListAppState) => state
);

export const reducers: ActionReducerMap<AcaoListAppState> = {
    acaoList: AcaoListReducer
};

export * from './acao-list.reducer';
