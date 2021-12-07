import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {VinculacaoProcessoListReducer, VinculacaoProcessoListState} from './vinculacao-processo-list.reducer';

export interface VinculacaoProcessoListAppState
{
    vinculacaoProcessoList: VinculacaoProcessoListState;
}

export const getVinculacaoProcessoListAppState = createFeatureSelector<VinculacaoProcessoListAppState>(
    'vinculacao-processo-list-app'
);

export const getAppState: any = createSelector(
    getVinculacaoProcessoListAppState,
    (state: VinculacaoProcessoListAppState) => state
);

export const reducers: ActionReducerMap<VinculacaoProcessoListAppState> = {
    vinculacaoProcessoList: VinculacaoProcessoListReducer
};

export * from './vinculacao-processo-list.reducer';
