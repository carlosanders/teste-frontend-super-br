import {createSelector} from '@ngrx/store';
import {getAtividadeCreateAppState, AtividadeCreateAppState, AtividadeCreateState} from 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-create/store/reducers';

export const getAtividadeCreateState = createSelector(
    getAtividadeCreateAppState,
    (state: AtividadeCreateAppState) => state.atividadeCreate
);

export const getIsSaving = createSelector(
    getAtividadeCreateState,
    (state: AtividadeCreateState) => state.saving
);

export const getErrors = createSelector(
    getAtividadeCreateState,
    (state: AtividadeCreateState) => state.errors
);
