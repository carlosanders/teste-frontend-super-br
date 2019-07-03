import {createSelector} from '@ngrx/store';
import {getTarefaCreateBlocoAppState, TarefaCreateBlocoAppState, TarefaCreateBlocoState} from '../reducers';

export const getTarefaCreateBlocoState = createSelector(
    getTarefaCreateBlocoAppState,
    (state: TarefaCreateBlocoAppState) => state.tarefaCreateBloco
);

export const getIsSaving = createSelector(
    getTarefaCreateBlocoState,
    (state: TarefaCreateBlocoState) => state.savingProcessosId.length > 0
);

export const getErrors = createSelector(
    getTarefaCreateBlocoState,
    (state: TarefaCreateBlocoState) => state.errors
);
