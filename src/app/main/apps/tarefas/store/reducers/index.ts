import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { TarefasReducer, TarefasState } from './tarefas.reducer';
import { FoldersReducer, FoldersState } from './folders.reducer';
import {RootLotacaoListReducer, RootLotacaoListState} from './lotacao.reducer';


export interface TarefasAppState
{
    tarefas: TarefasState;
    folders: FoldersState;
    lotacaoList: RootLotacaoListState;

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
    folders: FoldersReducer,
    lotacaoList: RootLotacaoListReducer
};


export * from './tarefas.reducer';
export * from './folders.reducer';
export * from './lotacao.reducer';

