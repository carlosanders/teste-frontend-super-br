import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {
    DocumentoAvulsoCreateBlocoReducer,
    DocumentoAvulsoCreateBlocoState
} from './documento-avulso-create-bloco.reducer';

export interface DocumentoAvulsoCreateBlocoAppState
{
    documentoAvulsoCreateBloco: DocumentoAvulsoCreateBlocoState;
}

export const getDocumentoAvulsoCreateBlocoAppState = createFeatureSelector<DocumentoAvulsoCreateBlocoAppState>(
    'documento-avulso-create-bloco-app'
);

export const getAppState: any = createSelector(
    getDocumentoAvulsoCreateBlocoAppState,
    (state: DocumentoAvulsoCreateBlocoAppState) => state
);

export const reducers: ActionReducerMap<DocumentoAvulsoCreateBlocoAppState> = {
    documentoAvulsoCreateBloco: DocumentoAvulsoCreateBlocoReducer
};

export * from './documento-avulso-create-bloco.reducer';
