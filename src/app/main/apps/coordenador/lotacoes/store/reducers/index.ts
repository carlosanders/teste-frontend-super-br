import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {LotacoesReducer, LotacoesState} from './lotacoes.reducer';

export interface LotacoesAppState
{
    lotacoes: LotacoesState;
}

export const getLotacoesAppState = createFeatureSelector<LotacoesAppState>(
    'coordenador-lotacoes-app'
);

export const getAppState: any = createSelector(
    getLotacoesAppState,
    (state: LotacoesAppState) => state
);

export const reducers: ActionReducerMap<LotacoesAppState> = {
    lotacoes: LotacoesReducer
};

export * from './lotacoes.reducer';
