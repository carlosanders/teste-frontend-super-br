import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { VinculacaoPessoaBarramentoEditReducer, VinculacaoPessoaBarramentoEditState } from './vinculacao-pessoa-barramento-edit.reducer';

export interface VinculacaoPessoaBarramentoEditAppState
{
    vinculacaoPessoaBarramento: VinculacaoPessoaBarramentoEditState;
}

export const getVinculacaoPessoaBarramentoEditAppState = createFeatureSelector<VinculacaoPessoaBarramentoEditAppState>(
    'vinculacaoPessoaBarramento-edit-app'
);

export const getAppState: any = createSelector(
    getVinculacaoPessoaBarramentoEditAppState,
    (state: VinculacaoPessoaBarramentoEditAppState) => state
);

export const reducers: ActionReducerMap<VinculacaoPessoaBarramentoEditAppState> = {
    vinculacaoPessoaBarramento: VinculacaoPessoaBarramentoEditReducer
};

export * from './vinculacao-pessoa-barramento-edit.reducer';
