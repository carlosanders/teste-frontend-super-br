import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AdminLotacaoEditReducer, RootLotacaoEditState} from './admin-lotacao-edit.reducer';

export interface RootLotacaoEditAppState {
    lotacao: RootLotacaoEditState;
}

export const getRootLotacaoEditAppState = createFeatureSelector<RootLotacaoEditAppState>(
    'admin-lotacao-edit-app'
);

export const getAppState: any = createSelector(
    getRootLotacaoEditAppState,
    (state: RootLotacaoEditAppState) => state
);

export const reducers: ActionReducerMap<RootLotacaoEditAppState> = {
    lotacao: AdminLotacaoEditReducer
};

export * from './admin-lotacao-edit.reducer';
