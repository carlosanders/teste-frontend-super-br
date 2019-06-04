import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { TarefaCreateReducer, TarefaCreateState } from './tarefa-create.reducer';

export interface TarefaCreateAppState
{
    tarefa: TarefaCreateState;
}

export const getTarefaCreateAppState = createFeatureSelector<TarefaCreateAppState>(
    'tarefa-create-app'
);

export const getAppState = createSelector(
    getTarefaCreateAppState,
    (state: TarefaCreateAppState) => state
);

export const reducers: ActionReducerMap<TarefaCreateAppState> = {
    tarefa: TarefaCreateReducer
};

export * from './tarefa-create.reducer';
