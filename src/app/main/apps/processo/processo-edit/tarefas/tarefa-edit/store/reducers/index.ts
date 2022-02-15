import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {TarefaEditReducer, TarefaEditState} from './tarefa-edit.reducer';

export interface TarefaEditAppState
{
    tarefa: TarefaEditState;
}

export const getTarefaEditAppState = createFeatureSelector<TarefaEditAppState>(
    'tarefa-edit-app'
);

export const getAppState: any = createSelector(
    getTarefaEditAppState,
    (state: TarefaEditAppState) => state
);

export const reducers: ActionReducerMap<TarefaEditAppState> = {
    tarefa: TarefaEditReducer
};

export * from './tarefa-edit.reducer';
