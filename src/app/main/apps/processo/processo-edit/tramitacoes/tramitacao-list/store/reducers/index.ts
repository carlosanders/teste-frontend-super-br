import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {TramitacaoListReducer, TramitacaoListState} from './tramitacao-list.reducer';

export interface TramitacaoListAppState
{
    tramitacaoList: TramitacaoListState;
}

export const getTramitacaoListAppState = createFeatureSelector<TramitacaoListAppState>(
    'tramitacao-list-app'
);

export const getAppState: any = createSelector(
    getTramitacaoListAppState,
    (state: TramitacaoListAppState) => state
);

export const reducers: ActionReducerMap<TramitacaoListAppState> = {
    tramitacaoList: TramitacaoListReducer
};

export * from './tramitacao-list.reducer';
