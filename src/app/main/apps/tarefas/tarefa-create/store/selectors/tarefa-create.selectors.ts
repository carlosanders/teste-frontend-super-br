import {createSelector} from '@ngrx/store';
import {
    getTarefaCreateAppState,
    TarefaCreateAppState,
    TarefaCreateState
} from 'app/main/apps/tarefas/tarefa-create/store/reducers';

export const getTarefaCreateState: any = createSelector(
    getTarefaCreateAppState,
    (state: TarefaCreateAppState) => state.tarefa
);

export const getIsSaving: any = createSelector(
    getTarefaCreateState,
    (state: TarefaCreateState) => state.saving
);

export const getErrors: any = createSelector(
    getTarefaCreateState,
    (state: TarefaCreateState) => state.errors
);
