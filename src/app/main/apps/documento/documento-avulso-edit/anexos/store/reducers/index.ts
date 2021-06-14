import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {DocumentosVinculadosReducer, DocumentosVinculadosState} from './documentos-vinculados.reducer';

export interface DocumentoAvulsoEditAnexosAppState
{
    documentosVinculados: DocumentosVinculadosState;
}

export const getDocumentoAvulsoEditAnexosAppState = createFeatureSelector<DocumentoAvulsoEditAnexosAppState>(
    'documento-avulso-edit-anexos-app'
);

export const getAppState = createSelector(
    getDocumentoAvulsoEditAnexosAppState,
    (state: DocumentoAvulsoEditAnexosAppState) => state
);

export const reducers: ActionReducerMap<DocumentoAvulsoEditAnexosAppState> = {
    documentosVinculados: DocumentosVinculadosReducer
};

export * from './documentos-vinculados.reducer';
