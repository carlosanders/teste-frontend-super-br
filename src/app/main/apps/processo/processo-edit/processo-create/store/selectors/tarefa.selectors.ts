import {createSelector} from '@ngrx/store';
import {DadosBasicosAppState, getDadosBasicosAppState, TarefaState} from '../reducers';

export const getTarefaState = createSelector(
    getDadosBasicosAppState,
    (state: DadosBasicosAppState) => state.tarefa
);

export const getTarefaIsSaving = createSelector(
    getTarefaState,
    (state: TarefaState) => state.saving
);

export const getTarefaErrors = createSelector(
    getTarefaState,
    (state: TarefaState) => state.errors
);
