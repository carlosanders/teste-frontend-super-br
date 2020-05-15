import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { TarefaCreateReducer, TarefaCreateState } from './tarefa-create.reducer';
import { ProcessoReducer, ProcessoState } from './processo.reducer';
import {FavoritoListReducer, FavoritoListState} from "./favorito-list.reducer";

export interface TarefaCreateAppState
{
    tarefa: TarefaCreateState;
    processo: ProcessoState;
    favorito: FavoritoListState;
}

export const getTarefaCreateAppState = createFeatureSelector<TarefaCreateAppState>(
    'tarefa-create-app'
);

export const getAppState = createSelector(
    getTarefaCreateAppState,
    (state: TarefaCreateAppState) => state
);

export const reducers: ActionReducerMap<TarefaCreateAppState> = {
    tarefa: TarefaCreateReducer,
    processo: ProcessoReducer,
    favorito: FavoritoListReducer
};

export * from './tarefa-create.reducer';
export * from './processo.reducer';
export * from './favorito-list.reducer';
