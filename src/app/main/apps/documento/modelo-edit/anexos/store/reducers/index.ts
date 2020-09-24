import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { DocumentosVinculadosReducer, DocumentosVinculadosState } from './documentos-vinculados.reducer';

export interface ModeloEditAnexosAppState
{
    documentosVinculados: DocumentosVinculadosState;
}

export const getModeloEditAnexosAppState = createFeatureSelector<ModeloEditAnexosAppState>(
    'documento-modelo-edit-anexos-app'
);

export const getAppState = createSelector(
    getModeloEditAnexosAppState,
    (state: ModeloEditAnexosAppState) => state
);

export const reducers: ActionReducerMap<ModeloEditAnexosAppState> = {
    documentosVinculados: DocumentosVinculadosReducer
};

export * from './documentos-vinculados.reducer';
