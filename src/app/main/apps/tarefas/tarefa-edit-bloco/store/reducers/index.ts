import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { TarefaEditReducer, TarefaEditState } from './tarefa-edit.reducer';

export interface TarefaEditAppState
{
    tarefaEdit: TarefaEditState;
}

export const getTarefaEditAppState = createFeatureSelector<TarefaEditAppState>(
    'tarefa-edit-bloco-app'
);

export const getAppState = createSelector(
    getTarefaEditAppState,
    (state: TarefaEditAppState) => state
);

export const reducers: ActionReducerMap<TarefaEditAppState> = {
    tarefaEdit: TarefaEditReducer
};

export * from './tarefa-edit.reducer';
