import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { TarefaDetailReducer, TarefaDetailState } from './tarefa-detail.reducer';
import {EtiquetaReducer, EtiquetaState} from './etiqueta.reducer';

export interface TarefaDetailAppState
{
    tarefaDetail: TarefaDetailState;
    etiqueta: EtiquetaState;
}

export const getTarefaDetailAppState = createFeatureSelector<TarefaDetailAppState>(
    'tarefa-detail-app'
);

export const getAppState = createSelector(
    getTarefaDetailAppState,
    (state: TarefaDetailAppState) => state
);

export const reducers: ActionReducerMap<TarefaDetailAppState> = {
    tarefaDetail: TarefaDetailReducer,
    etiqueta: EtiquetaReducer,
};

export * from './tarefa-detail.reducer';
export * from './etiqueta.reducer';
