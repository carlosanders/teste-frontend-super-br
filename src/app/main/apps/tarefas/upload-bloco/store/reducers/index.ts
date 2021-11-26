import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AtividadeCreateBlocoState, UploadBlocoReducer} from './upload-bloco.reducer';

export interface AtividadeCreateBlocoAppState
{
    atividadeCreateBloco: AtividadeCreateBlocoState;
}

export const getAtividadeCreateBlocoAppState = createFeatureSelector<AtividadeCreateBlocoAppState>(
    'upload-bloco-app'
);

export const getAppState: any = createSelector(
    getAtividadeCreateBlocoAppState,
    (state: AtividadeCreateBlocoAppState) => state
);

export const reducers: ActionReducerMap<AtividadeCreateBlocoAppState> = {
    atividadeCreateBloco: UploadBlocoReducer
};

export * from './upload-bloco.reducer';
