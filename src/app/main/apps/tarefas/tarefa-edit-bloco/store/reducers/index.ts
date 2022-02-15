import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {TarefaEditBlocoReducer, TarefaEditBlocoState} from './tarefa-edit-bloco.reducer';

export interface TarefaEditBlocoAppState
{
    tarefaEditBloco: TarefaEditBlocoState;
}

export const getTarefaEditBlocoAppState = createFeatureSelector<TarefaEditBlocoAppState>(
    'tarefa-edit-bloco-app'
);

export const getAppState: any = createSelector(
    getTarefaEditBlocoAppState,
    (state: TarefaEditBlocoAppState) => state
);

export const reducers: ActionReducerMap<TarefaEditBlocoAppState> = {
    tarefaEditBloco: TarefaEditBlocoReducer
};

export * from './tarefa-edit-bloco.reducer';
