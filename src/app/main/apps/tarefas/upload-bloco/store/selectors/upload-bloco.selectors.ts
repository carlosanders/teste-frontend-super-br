import {createSelector} from '@ngrx/store';
import {AtividadeCreateBlocoAppState, AtividadeCreateBlocoState, getAtividadeCreateBlocoAppState} from '../reducers';

export const getAtividadeCreateBlocoState: any = createSelector(
    getAtividadeCreateBlocoAppState,
    (state: AtividadeCreateBlocoAppState) => state.atividadeCreateBloco
);

export const getIsSaving: any = createSelector(
    getAtividadeCreateBlocoState,
    (state: AtividadeCreateBlocoState) => state.savingTarefasId.length > 0
);

export const getErrors: any = createSelector(
    getAtividadeCreateBlocoState,
    (state: AtividadeCreateBlocoState) => state.errors
);
