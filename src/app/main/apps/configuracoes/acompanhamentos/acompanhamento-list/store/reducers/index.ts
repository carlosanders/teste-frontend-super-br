import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AcompanhamentoListReducer, AcompanhamentoListState} from './acompanhamento-list.reducer';

export interface AcompanhamentoListAppState
{
    acompanhamentoList: AcompanhamentoListState;
}

export const getAcompanhamentoListAppState = createFeatureSelector<AcompanhamentoListAppState>(
    'acompanhamento-list-app'
);

export const getAppState: any = createSelector(
    getAcompanhamentoListAppState,
    (state: AcompanhamentoListAppState) => state
);

export const reducers: ActionReducerMap<AcompanhamentoListAppState> = {
    acompanhamentoList: AcompanhamentoListReducer
};

export * from './acompanhamento-list.reducer';
