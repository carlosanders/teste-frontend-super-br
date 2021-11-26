import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {TarefaCreateReducer, TarefaCreateState} from './tarefa-create.reducer';
import {ProcessoReducer, ProcessoState} from './processo.reducer';

export interface TarefaCreateAppState
{
    tarefa: TarefaCreateState;
    processo: ProcessoState;
}

export const getTarefaCreateAppState = createFeatureSelector<TarefaCreateAppState>(
    'tarefa-create-app'
);

export const getAppState: any = createSelector(
    getTarefaCreateAppState,
    (state: TarefaCreateAppState) => state
);

export const reducers: ActionReducerMap<TarefaCreateAppState> = {
    tarefa: TarefaCreateReducer,
    processo: ProcessoReducer
};

export * from './tarefa-create.reducer';
export * from './processo.reducer';
