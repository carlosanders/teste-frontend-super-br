import {createSelector} from '@ngrx/store';
import {
    AtividadeCreateAppState,
    AtividadeCreateState,
    getAtividadeCreateAppState
} from 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-create/store/reducers';

export const getAtividadeCreateState: any = createSelector(
    getAtividadeCreateAppState,
    (state: AtividadeCreateAppState) => state.atividadeCreate
);

export const getIsSaving: any = createSelector(
    getAtividadeCreateState,
    (state: AtividadeCreateState) => state.saving
);

export const getErrors: any = createSelector(
    getAtividadeCreateState,
    (state: AtividadeCreateState) => state.errors
);
