import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {atividadeCreateBlocoReducer, AtividadeCreateBlocoState} from './atividade-create-bloco.reducer';
import {atividadeBlocoCreateDocumentosReducer, AtividadeBlocoCreateDocumentosState} from './documentos.reducer';

export interface AtividadeCreateBlocoAppState
{
    atividadeCreateBloco: AtividadeCreateBlocoState;
    atividadeCreateBlocoDocumentos: AtividadeBlocoCreateDocumentosState;
}

export const getAtividadeCreateBlocoAppState = createFeatureSelector<AtividadeCreateBlocoAppState>(
    'atividade-create-bloco-app'
);

export const getAppState: any = createSelector(
    getAtividadeCreateBlocoAppState,
    (state: AtividadeCreateBlocoAppState) => state
);

export const reducers: ActionReducerMap<AtividadeCreateBlocoAppState> = {
    atividadeCreateBloco: atividadeCreateBlocoReducer,
    atividadeCreateBlocoDocumentos: atividadeBlocoCreateDocumentosReducer
};

export * from './atividade-create-bloco.reducer';
export * from './documentos.reducer';
