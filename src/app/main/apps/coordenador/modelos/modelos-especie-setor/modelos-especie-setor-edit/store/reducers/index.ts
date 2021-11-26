import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ModelosEspecieSetorEditReducer, ModelosEspecieSetorEditState} from './modelos-especie-setor-edit.reducer';

export interface ModelosEspecieSetorEditAppState
{
    vinculacaoModelo: ModelosEspecieSetorEditState;
}

export const getModelosEspecieSetorEditAppState = createFeatureSelector<ModelosEspecieSetorEditAppState>(
    'modelos-especie-setor-edit-app'
);

export const getAppState: any = createSelector(
    getModelosEspecieSetorEditAppState,
    (state: ModelosEspecieSetorEditAppState) => state
);

export const reducers: ActionReducerMap<ModelosEspecieSetorEditAppState> = {
    vinculacaoModelo: ModelosEspecieSetorEditReducer
};

export * from './modelos-especie-setor-edit.reducer';
