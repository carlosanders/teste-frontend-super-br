import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AtividadeCreateReducer, AtividadeCreateState } from './atividade-create.reducer';
import { AtividadeCreateDocumentosReducer, AtividadeCreateDocumentosState } from './documentos.reducer';
import {FavoritoListReducer, FavoritoListState} from "./favorito-list.reducer";

export interface AtividadeCreateAppState
{
    atividadeCreate: AtividadeCreateState;
    atividadeCreateDocumentos: AtividadeCreateDocumentosState;
    favorito: FavoritoListState;
}

export const getAtividadeCreateAppState = createFeatureSelector<AtividadeCreateAppState>(
    'atividade-create-app'
);

export const getAppState = createSelector(
    getAtividadeCreateAppState,
    (state: AtividadeCreateAppState) => state
);

export const reducers: ActionReducerMap<AtividadeCreateAppState> = {
    atividadeCreate: AtividadeCreateReducer,
    atividadeCreateDocumentos: AtividadeCreateDocumentosReducer,
    favorito: FavoritoListReducer
};

export * from './atividade-create.reducer';
export * from './documentos.reducer';
export * from './favorito-list.reducer';