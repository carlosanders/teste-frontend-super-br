import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { ProcessosReducer, TarefasState } from './processos.reducer';
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
    tarefas: ProcessosReducer,
    folders: FoldersReducer
};

export * from './processos.reducer';
export * from './folders.reducer';
