import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {TarefaCreateBlocoReducer, TarefaCreateBlocoState} from './tarefa-create-bloco.reducer';

export interface TarefaCreateBlocoAppState
{
    tarefaCreateBloco: TarefaCreateBlocoState;
}

export const getTarefaCreateBlocoAppState = createFeatureSelector<TarefaCreateBlocoAppState>(
    'encaminhar-bloco-tarefa-create-app'
);

export const getAppState: any = createSelector(
    getTarefaCreateBlocoAppState,
    (state: TarefaCreateBlocoAppState) => state
);

export const reducers: ActionReducerMap<TarefaCreateBlocoAppState> = {
    tarefaCreateBloco: TarefaCreateBlocoReducer,
};

export * from './tarefa-create-bloco.reducer';
