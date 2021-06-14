import {createSelector} from '@ngrx/store';
import {AtividadeCreateBlocoAppState, AtividadeCreateBlocoState, getAtividadeCreateBlocoAppState} from '../reducers';

export const getAtividadeCreateBlocoState = createSelector(
    getAtividadeCreateBlocoAppState,
    (state: AtividadeCreateBlocoAppState) => state.atividadeCreateBloco
);

export const getIsSaving = createSelector(
    getAtividadeCreateBlocoState,
    (state: AtividadeCreateBlocoState) => state.savingTarefasId.length > 0
);

export const getErrors = createSelector(
    getAtividadeCreateBlocoState,
    (state: AtividadeCreateBlocoState) => state.errors
);
