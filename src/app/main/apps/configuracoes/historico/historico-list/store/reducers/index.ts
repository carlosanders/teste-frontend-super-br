import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {historicoConfigListReducer, HistoricoConfigListState} from './historico-list.reducer';

export interface HistoricoConfigListAppState
{
    historicoConfigList: HistoricoConfigListState;
}

export const getHistoricoConfigListAppState = createFeatureSelector<HistoricoConfigListAppState>(
    'historico-config-list-app'
);

export const getAppState: any = createSelector(
    getHistoricoConfigListAppState,
    (state: HistoricoConfigListAppState) => state
);

export const reducers: ActionReducerMap<HistoricoConfigListAppState> = {
    historicoConfigList: historicoConfigListReducer
};

export * from './historico-list.reducer';
