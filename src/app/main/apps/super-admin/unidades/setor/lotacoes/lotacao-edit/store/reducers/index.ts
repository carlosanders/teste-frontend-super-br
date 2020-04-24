import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { SuperAdminLotacaoEditReducer, RootLotacaoEditState } from './super-admin-lotacao-edit.reducer';

export interface RootLotacaoEditAppState
{
    lotacao: RootLotacaoEditState;
}

export const getRootLotacaoEditAppState = createFeatureSelector<RootLotacaoEditAppState>(
    'root-lotacao-edit-app'
);

export const getAppState = createSelector(
    getRootLotacaoEditAppState,
    (state: RootLotacaoEditAppState) => state
);

export const reducers: ActionReducerMap<RootLotacaoEditAppState> = {
    lotacao: SuperAdminLotacaoEditReducer
};

export * from './super-admin-lotacao-edit.reducer';
