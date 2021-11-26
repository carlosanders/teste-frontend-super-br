import {createSelector} from '@ngrx/store';
import {
    CompartilhamentoCreateAppState,
    CompartilhamentoCreateState,
    getCompartilhamentoCreateAppState
} from 'app/main/apps/tarefas/tarefa-detail/compartilhamentos/compartilhamento-create/store/reducers';

export const getCompartilhamentoCreateState: any = createSelector(
    getCompartilhamentoCreateAppState,
    (state: CompartilhamentoCreateAppState) => state.compartilhamentoCreate
);

export const getIsSaving: any = createSelector(
    getCompartilhamentoCreateState,
    (state: CompartilhamentoCreateState) => state.saving
);

export const getErrors: any = createSelector(
    getCompartilhamentoCreateState,
    (state: CompartilhamentoCreateState) => state.errors
);
