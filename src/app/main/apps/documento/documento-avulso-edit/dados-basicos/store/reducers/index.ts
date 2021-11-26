import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {
    DocumentoAvulsoEditDadosBasicosReducer,
    DocumentoAvulsoEditDadosBasicosState
} from './documento-avulso-edit.reducer';

export interface DocumentoAvulsoEditDadosBasicosAppState
{
    documentoAvulso: DocumentoAvulsoEditDadosBasicosState;
}

export const getDocumentoAvulsoEditDadosBasicosAppState = createFeatureSelector<DocumentoAvulsoEditDadosBasicosAppState>(
    'documento-avulso-edit-dados-basicos-app'
);

export const getAppState: any = createSelector(
    getDocumentoAvulsoEditDadosBasicosAppState,
    (state: DocumentoAvulsoEditDadosBasicosAppState) => state
);

export const reducers: ActionReducerMap<DocumentoAvulsoEditDadosBasicosAppState> = {
    documentoAvulso: DocumentoAvulsoEditDadosBasicosReducer
};

export * from './documento-avulso-edit.reducer';
