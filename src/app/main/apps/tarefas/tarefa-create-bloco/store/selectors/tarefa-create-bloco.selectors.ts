import {createSelector} from '@ngrx/store';
import {getTarefaCreateBlocoAppState, TarefaCreateBlocoAppState, TarefaCreateBlocoState} from '../reducers';

export const getTarefaCreateBlocoState: any = createSelector(
    getTarefaCreateBlocoAppState,
    (state: TarefaCreateBlocoAppState) => state.tarefaCreateBloco
);

export const getIsSaving: any = createSelector(
    getTarefaCreateBlocoState,
    (state: TarefaCreateBlocoState) => state.savingProcessosId.length > 0
);

export const getErrors: any = createSelector(
    getTarefaCreateBlocoState,
    (state: TarefaCreateBlocoState) => state.errors
);
