import {createSelector} from '@ngrx/store';
import {getCompartilhamentoCreateAppState, CompartilhamentoCreateAppState, CompartilhamentoCreateState} from 'app/main/apps/tarefas/tarefa-detail/compartilhamentos/compartilhamento-create/store/reducers';

export const getCompartilhamentoCreateState = createSelector(
    getCompartilhamentoCreateAppState,
    (state: CompartilhamentoCreateAppState) => state.compartilhamentoCreate
);

export const getIsSaving = createSelector(
    getCompartilhamentoCreateState,
    (state: CompartilhamentoCreateState) => state.saving
);

export const getErrors = createSelector(
    getCompartilhamentoCreateState,
    (state: CompartilhamentoCreateState) => state.errors
);
