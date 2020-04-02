import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { ModelosAnexoReducer, ModeloAnexoState } from './modelos-anexo.reducer';

export interface ModeloAnexoAppState
{
    modelo: ModeloAnexoState;
}

export const getModeloAnexoAppState = createFeatureSelector<ModeloAnexoAppState>(
    'modelo-anexo-app'
);

export const getAppState = createSelector(
    getModeloAnexoAppState,
    (state: ModeloAnexoAppState) => state
);

export const reducers: ActionReducerMap<ModeloAnexoAppState> = {
    modelo: ModelosAnexoReducer
};

export * from './modelos-anexo.reducer';
