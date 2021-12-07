import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {HistoricoListReducer, HistoricoListState} from './historico-list.reducer';

export interface HistoricoListAppState
{
    historicoList: HistoricoListState;
}

export const getHistoricoListAppState = createFeatureSelector<HistoricoListAppState>(
    'historico-list-app'
);

export const getAppState: any = createSelector(
    getHistoricoListAppState,
    (state: HistoricoListAppState) => state
);

export const reducers: ActionReducerMap<HistoricoListAppState> = {
    historicoList: HistoricoListReducer
};

export * from './historico-list.reducer';
