import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { TarefasReducer, TarefasState } from './tarefas.reducer';
import { FoldersReducer, FoldersState } from './folders.reducer';


export interface BoardTarefasAppState
{
    tarefas: TarefasState;
    folders: FoldersState;

}
export const getBoardTarefasAppState = createFeatureSelector<BoardTarefasAppState>(
    'board-tarefas-app'
);


export const getAppState: any = createSelector(
    getBoardTarefasAppState,
    (state: BoardTarefasAppState) => state
);

export const reducers: ActionReducerMap<BoardTarefasAppState> = {
    tarefas: TarefasReducer,
    folders: FoldersReducer,
};


export * from './tarefas.reducer';
export * from './folders.reducer';
