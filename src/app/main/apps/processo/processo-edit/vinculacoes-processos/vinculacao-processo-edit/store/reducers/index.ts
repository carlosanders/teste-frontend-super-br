import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {VinculacaoProcessoEditReducer, VinculacaoProcessoEditState} from './vinculacao-processo-edit.reducer';

export interface VinculacaoProcessoEditAppState
{
    vinculacaoProcesso: VinculacaoProcessoEditState;
}

export const getVinculacaoProcessoEditAppState = createFeatureSelector<VinculacaoProcessoEditAppState>(
    'vinculacao-processo-edit-app'
);

export const getAppState: any = createSelector(
    getVinculacaoProcessoEditAppState,
    (state: VinculacaoProcessoEditAppState) => state
);

export const reducers: ActionReducerMap<VinculacaoProcessoEditAppState> = {
    vinculacaoProcesso: VinculacaoProcessoEditReducer
};

export * from './vinculacao-processo-edit.reducer';
