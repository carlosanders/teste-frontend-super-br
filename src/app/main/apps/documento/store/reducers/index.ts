import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { DocumentoReducer, DocumentoState } from './documento.reducer';
import { RepositoriosReducer, RepositoriosState } from './repositorios.reducer';
import { DocumentoAvulsoReducer, DocumentoAvulsoState } from './documento-avulso.reducer';
import { DocumentosVinculadosReducer, DocumentosVinculadosState } from './documentos-vinculados.reducer';
import { ComponenteDigitalReducer, ComponenteDigitalState } from './componentes-digitais.reducer';

export interface DocumentoAppState
{
    documento: DocumentoState;
    repositorios: RepositoriosState;
    documentoAvulso: DocumentoAvulsoState;
    documentosVinculados: DocumentosVinculadosState;
    componentesDigitais: ComponenteDigitalState;
}

export const getDocumentoAppState = createFeatureSelector<DocumentoAppState>(
    'documento-app'
);

export const getAppState = createSelector(
    getDocumentoAppState,
    (state: DocumentoAppState) => state
);

export const reducers: ActionReducerMap<DocumentoAppState> = {
    documento: DocumentoReducer,
    repositorios: RepositoriosReducer,
    documentoAvulso: DocumentoAvulsoReducer,
    documentosVinculados: DocumentosVinculadosReducer,
    componentesDigitais: ComponenteDigitalReducer
};

export * from './documento.reducer';
export * from './repositorios.reducer';
export * from './documento-avulso.reducer';
export * from './documentos-vinculados.reducer';
export * from './componentes-digitais.reducer';
