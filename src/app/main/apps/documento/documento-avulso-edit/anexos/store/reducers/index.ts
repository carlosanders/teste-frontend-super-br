import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {documentosVinculadosReducer, DocumentosVinculadosState} from './documentos-vinculados.reducer';

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
    documentosVinculados: documentosVinculadosReducer
};

export * from './documentos-vinculados.reducer';
