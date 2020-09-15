import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AtividadeDocumentoReducer, AtividadeDocumentoState } from './atividade-documento.reducer';

export interface DocumentoEditAtividadeAppState
{
    atividadeDocumento: AtividadeDocumentoState;
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
};

export * from './atividade-documento.reducer';
