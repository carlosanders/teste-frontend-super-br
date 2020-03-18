import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { UploadBlocoReducer, AtividadeCreateBlocoState } from './upload-bloco.reducer';

export interface AtividadeCreateBlocoAppState
{
    atividadeCreateBloco: AtividadeCreateBlocoState;
}

export const getAtividadeCreateBlocoAppState = createFeatureSelector<AtividadeCreateBlocoAppState>(
    'responder-complementar-create-bloco-app'
);

export const getAppState = createSelector(
    getAtividadeCreateBlocoAppState,
    (state: AtividadeCreateBlocoAppState) => state
);

export const reducers: ActionReducerMap<AtividadeCreateBlocoAppState> = {
    atividadeCreateBloco: UploadBlocoReducer
};

export * from './upload-bloco.reducer';
