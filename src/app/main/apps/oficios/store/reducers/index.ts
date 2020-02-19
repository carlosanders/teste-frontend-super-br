import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { ProcessosReducer, ProcessosState } from './processos.reducer';
import { DocumentosAvulsoReducer, DocumentosAvulsoState } from './documentos-avulso.reducer';
import { FoldersReducer, FoldersState } from './folders.reducer';

export interface DocumentoAvulsoAppState
{
    documentosAvulso: DocumentosAvulsoState;
    folders: FoldersState;
}

export const getDocumentoAvulsoAppState = createFeatureSelector<DocumentoAvulsoAppState>(
    'processos-app'
);

export const getAppState = createSelector(
    getDocumentoAvulsoAppState,
    (state: DocumentoAvulsoAppState) => state
);

export const reducers: ActionReducerMap<DocumentoAvulsoAppState> = {
    documentosAvulso: DocumentosAvulsoReducer,
    folders: FoldersReducer
};

export * from './processos.reducer';
export * from './folders.reducer';
export * from './documentos-avulso.reducer';
