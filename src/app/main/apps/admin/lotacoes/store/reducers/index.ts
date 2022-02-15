import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RootLotacoesReducer, RootLotacoesState} from './lotacoes.reducer';

export interface RootLotacoesAppState {
    lotacoes: RootLotacoesState;
}

export const getRootLotacoesAppState = createFeatureSelector<RootLotacoesAppState>(
    'admin-lotacoes-app'
);

export const getAppState: any = createSelector(
    getRootLotacoesAppState,
    (state: RootLotacoesAppState) => state
);

export const reducers: ActionReducerMap<RootLotacoesAppState> = {
    lotacoes: RootLotacoesReducer
};

export * from './lotacoes.reducer';
