import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RootLotacaoListReducer, RootLotacaoListState} from './lotacao-list.reducer';

export interface RootLotacaoListAppState {
    lotacaoList: RootLotacaoListState;
}

export const getRootLotacaoListAppState = createFeatureSelector<RootLotacaoListAppState>(
    'admin-lotacao-list-app'
);

export const getAppState: any = createSelector(
    getRootLotacaoListAppState,
    (state: RootLotacaoListAppState) => state
);

export const reducers: ActionReducerMap<RootLotacaoListAppState> = {
    lotacaoList: RootLotacaoListReducer
};

export * from './lotacao-list.reducer';
