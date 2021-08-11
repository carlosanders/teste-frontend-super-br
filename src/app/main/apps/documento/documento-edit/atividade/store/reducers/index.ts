import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AtividadeDocumentoReducer, AtividadeDocumentoState} from './atividade-documento.reducer';
import {DocumentosReducer, DocumentosState} from './documentos.reducer';

export interface DocumentoEditAtividadeAppState
{
    atividadeDocumento: AtividadeDocumentoState;
    documentos: DocumentosState;
}

export const getDocumentoEditAtividadeAppState = createFeatureSelector<DocumentoEditAtividadeAppState>(
    'documento-edit-atividade-app'
);

export const getAppState = createSelector(
    getDocumentoEditAtividadeAppState,
    (state: DocumentoEditAtividadeAppState) => state
);

export const reducers: ActionReducerMap<DocumentoEditAtividadeAppState> = {
    atividadeDocumento: AtividadeDocumentoReducer,
    documentos: DocumentosReducer
};

export * from './atividade-documento.reducer';
export * from './documentos.reducer';
