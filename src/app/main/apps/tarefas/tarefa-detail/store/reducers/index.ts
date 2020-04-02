import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { TarefaDetailReducer, TarefaDetailState } from './tarefa-detail.reducer';

export interface TarefaDetailAppState
{
    tarefaDetail: TarefaDetailState;
}

export const getTarefaDetailAppState = createFeatureSelector<TarefaDetailAppState>(
    'tarefa-detail-app'
);

export const getAppState = createSelector(
    getTarefaDetailAppState,
    (state: TarefaDetailAppState) => state
);

export const reducers: ActionReducerMap<TarefaDetailAppState> = {
    tarefaDetail: TarefaDetailReducer
};

export * from './tarefa-detail.reducer';
