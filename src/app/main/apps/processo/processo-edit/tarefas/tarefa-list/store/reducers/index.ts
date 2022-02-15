import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {TarefaListReducer, TarefaListState} from './tarefa-list.reducer';

export interface TarefaListAppState
{
    tarefaList: TarefaListState;
}

export const getTarefaListAppState = createFeatureSelector<TarefaListAppState>(
    'tarefa-list-app'
);

export const getAppState: any = createSelector(
    getTarefaListAppState,
    (state: TarefaListAppState) => state
);

export const reducers: ActionReducerMap<TarefaListAppState> = {
    tarefaList: TarefaListReducer
};

export * from './tarefa-list.reducer';
