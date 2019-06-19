import {createSelector} from '@ngrx/store';
import {getTarefaCreateAppState, TarefaCreateAppState, TarefaCreateState} from '../reducers';

export const getTarefaCreateState = createSelector(
    getTarefaCreateAppState,
    (state: TarefaCreateAppState) => state.tarefaCreate
);

export const getIsSaving = createSelector(
    getTarefaCreateState,
    (state: TarefaCreateState) => state.savingProcessosId.length > 0
);

export const getErrors = createSelector(
    getTarefaCreateState,
    (state: TarefaCreateState) => state.errors
);
