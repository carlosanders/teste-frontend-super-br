import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { TarefaCreateReducer, TarefaCreateState } from './tarefa-create.reducer';

export interface TarefaCreateAppState
{
    tarefaCreate: TarefaCreateState;
}

export const getTarefaCreateAppState = createFeatureSelector<TarefaCreateAppState>(
    'tarefa-create-bloco-app'
);

export const getAppState = createSelector(
    getTarefaCreateAppState,
    (state: TarefaCreateAppState) => state
);

export const reducers: ActionReducerMap<TarefaCreateAppState> = {
    tarefaCreate: TarefaCreateReducer
};

export * from './tarefa-create.reducer';
