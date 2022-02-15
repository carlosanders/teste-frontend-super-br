import {createSelector} from '@ngrx/store';
import {getTarefaEditBlocoAppState, TarefaEditBlocoAppState, TarefaEditBlocoState} from '../reducers';

export const getTarefaEditBlocoState: any = createSelector(
    getTarefaEditBlocoAppState,
    (state: TarefaEditBlocoAppState) => state.tarefaEditBloco
);

export const getIsSaving: any = createSelector(
    getTarefaEditBlocoState,
    (state: TarefaEditBlocoState) => state.savingId.length > 0
);

export const getErrors: any = createSelector(
    getTarefaEditBlocoState,
    (state: TarefaEditBlocoState) => state.errors
);
