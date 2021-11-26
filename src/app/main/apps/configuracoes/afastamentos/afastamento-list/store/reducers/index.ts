import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AfastamentoListReducer, AfastamentoListState} from './afastamento-list.reducer';

export interface AfastamentoListAppState
{
    afastamentoList: AfastamentoListState;
}

export const getAfastamentoListAppState = createFeatureSelector<AfastamentoListAppState>(
    'afastamento-list-app'
);

export const getAppState: any = createSelector(
    getAfastamentoListAppState,
    (state: AfastamentoListAppState) => state
);

export const reducers: ActionReducerMap<AfastamentoListAppState> = {
    afastamentoList: AfastamentoListReducer
};

export * from './afastamento-list.reducer';
