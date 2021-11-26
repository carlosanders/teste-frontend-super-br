import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RelacionamentoListReducer, RelacionamentoListState} from './relacionamento-list.reducer';

export interface RelacionamentoListAppState
{
    relacionamentoList: RelacionamentoListState;
}

export const getRelacionamentoListAppState = createFeatureSelector<RelacionamentoListAppState>(
    'relacionamento-list-app'
);

export const getAppState: any = createSelector(
    getRelacionamentoListAppState,
    (state: RelacionamentoListAppState) => state
);

export const reducers: ActionReducerMap<RelacionamentoListAppState> = {
    relacionamentoList: RelacionamentoListReducer
};

export * from './relacionamento-list.reducer';
