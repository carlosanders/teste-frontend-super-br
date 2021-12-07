import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { VinculacaoPessoaBarramentoListReducer, VinculacaoPessoaBarramentoListState } from './vinculacao-pessoa-barramento-list.reducer';

export interface VinculacaoPessoaBarramentoListAppState
{
    vinculacaoPessoaBarramentoList: VinculacaoPessoaBarramentoListState;
}

export const getVinculacaoPessoaBarramentoListAppState = createFeatureSelector<VinculacaoPessoaBarramentoListAppState>(
    'vinculacaoPessoaBarramento-list-app'
);

export const getAppState: any = createSelector(
    getVinculacaoPessoaBarramentoListAppState,
    (state: VinculacaoPessoaBarramentoListAppState) => state
);

export const reducers: ActionReducerMap<VinculacaoPessoaBarramentoListAppState> = {
    vinculacaoPessoaBarramentoList: VinculacaoPessoaBarramentoListReducer
};

export * from './vinculacao-pessoa-barramento-list.reducer';
