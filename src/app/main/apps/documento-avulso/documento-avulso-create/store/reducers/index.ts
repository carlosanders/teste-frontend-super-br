import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {DocumentoAvulsoCreateReducer, DocumentoAvulsoCreateState} from './documento-avulso-create.reducer';

export interface DocumentoAvulsoCreateAppState
{
    documentoAvulso: DocumentoAvulsoCreateState;
}

export const getDocumentoAvulsoCreateAppState = createFeatureSelector<DocumentoAvulsoCreateAppState>(
    'documento-avulso-create-app'
);

export const getAppState: any = createSelector(
    getDocumentoAvulsoCreateAppState,
    (state: DocumentoAvulsoCreateAppState) => state
);

export const reducers: ActionReducerMap<DocumentoAvulsoCreateAppState> = {
    documentoAvulso: DocumentoAvulsoCreateReducer
};

export * from './documento-avulso-create.reducer';
