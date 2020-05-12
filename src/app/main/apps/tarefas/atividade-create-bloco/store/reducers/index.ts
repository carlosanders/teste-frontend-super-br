import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AtividadeCreateBlocoReducer, AtividadeCreateBlocoState } from './atividade-create-bloco.reducer';
import {AtividadeBlocoCreateDocumentosReducer, AtividadeBlocoCreateDocumentosState} from './documentos.reducer';

export interface AtividadeCreateBlocoAppState
{
    atividadeCreateBloco: AtividadeCreateBlocoState;
    atividadeCreateBlocoDocumentos: AtividadeBlocoCreateDocumentosState;
}

export const getAtividadeCreateBlocoAppState = createFeatureSelector<AtividadeCreateBlocoAppState>(
    'atividade-create-bloco-app'
);

export const getAppState = createSelector(
    getAtividadeCreateBlocoAppState,
    (state: AtividadeCreateBlocoAppState) => state
);

export const reducers: ActionReducerMap<AtividadeCreateBlocoAppState> = {
    atividadeCreateBloco: AtividadeCreateBlocoReducer,
    atividadeCreateBlocoDocumentos: AtividadeBlocoCreateDocumentosReducer
};

export * from './atividade-create-bloco.reducer';
export * from './documentos.reducer';
