import {createSelector} from '@ngrx/store';
import {getTarefaEditAppState, TarefaEditAppState, TarefaEditState} from '../reducers';

export const getTarefaEditState = createSelector(
    getTarefaEditAppState,
    (state: TarefaEditAppState) => state.tarefaEdit
);

export const getIsSaving = createSelector(
    getTarefaEditState,
    (state: TarefaEditState) => state.savingId.length > 0
);

export const getErrors = createSelector(
    getTarefaEditState,
    (state: TarefaEditState) => state.errors
);
