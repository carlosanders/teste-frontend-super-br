import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminLotacaoEditReducer, LotacaoEditState } from './admin-lotacao-edit.reducer';

export interface LotacaoEditAppState
{
    lotacao: LotacaoEditState;
}

export const getLotacaoEditAppState = createFeatureSelector<LotacaoEditAppState>(
    'admin-lotacao-edit-app'
);

export const getAppState = createSelector(
    getLotacaoEditAppState,
    (state: LotacaoEditAppState) => state
);

export const reducers: ActionReducerMap<LotacaoEditAppState> = {
    lotacao: AdminLotacaoEditReducer
};

export * from './admin-lotacao-edit.reducer';
