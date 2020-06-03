import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AtividadeCreateReducer, AtividadeCreateState } from './atividade-create.reducer';
import { AtividadeCreateDocumentosReducer, AtividadeCreateDocumentosState } from './documentos.reducer';

export interface AtividadeCreateAppState
{
    atividadeCreate: AtividadeCreateState;
    atividadeCreateDocumentos: AtividadeCreateDocumentosState;
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
    atividadeCreateDocumentos: AtividadeCreateDocumentosReducer
};

export * from './atividade-create.reducer';
export * from './documentos.reducer';