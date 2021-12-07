import {createSelector} from '@ngrx/store';
import {DadosBasicosAppState, getDadosBasicosAppState, TarefaState} from '../reducers';

export const getTarefaState: any = createSelector(
    getDadosBasicosAppState,
    (state: DadosBasicosAppState) => state.tarefa
);

export const getTarefaIsSaving: any = createSelector(
    getTarefaState,
    (state: TarefaState) => state.saving
);

export const getTarefaErrors: any = createSelector(
    getTarefaState,
    (state: TarefaState) => state.errors
);
