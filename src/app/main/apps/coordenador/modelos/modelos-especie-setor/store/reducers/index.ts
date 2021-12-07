import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ModelosEspecieSetorReducer, ModelosEspecieSetorState} from './modelos-especie-setor.reducer';

export interface ModelosEspecieSetorAppState
{
    modelos: ModelosEspecieSetorState;
}

export const getModelosEspecieSetorAppState = createFeatureSelector<ModelosEspecieSetorAppState>(
    'modelos-especie-setor-app'
);

export const getAppState: any = createSelector(
    getModelosEspecieSetorAppState,
    (state: ModelosEspecieSetorAppState) => state
);

export const reducers: ActionReducerMap<ModelosEspecieSetorAppState> = {
    modelos: ModelosEspecieSetorReducer
};

export * from './modelos-especie-setor.reducer';
