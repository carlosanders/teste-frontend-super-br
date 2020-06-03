import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { TarefasReducer, TarefasState } from './tarefas.reducer';
import { FoldersReducer, FoldersState } from './folders.reducer';

export interface TarefasAppState
{
    tarefas: TarefasState;
    folders: FoldersState;
}

export const getTarefasAppState = createFeatureSelector<TarefasAppState>(
    'tarefas-app'
);

export const getAppState = createSelector(
    getTarefasAppState,
    (state: TarefasAppState) => state
);

export const reducers: ActionReducerMap<TarefasAppState> = {
    tarefas: TarefasReducer,
    folders: FoldersReducer
};

export * from './tarefas.reducer';
export * from './folders.reducer';