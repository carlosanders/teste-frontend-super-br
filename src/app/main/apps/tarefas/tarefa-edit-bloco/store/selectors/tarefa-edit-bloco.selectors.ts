import {createSelector} from '@ngrx/store';
import {getTarefaEditBlocoAppState, TarefaEditBlocoAppState, TarefaEditBlocoState} from '../reducers';

export const getTarefaEditBlocoState = createSelector(
    getTarefaEditBlocoAppState,
    (state: TarefaEditBlocoAppState) => state.tarefaEditBloco
);

export const getIsSaving = createSelector(
    getTarefaEditBlocoState,
    (state: TarefaEditBlocoState) => state.savingId.length > 0
);

export const getErrors = createSelector(
    getTarefaEditBlocoState,
    (state: TarefaEditBlocoState) => state.errors
);
