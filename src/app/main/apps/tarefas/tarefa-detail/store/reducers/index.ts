import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { TarefaDetailReducer, TarefaDetailState } from './tarefa-detail.reducer';
import {EtiquetaReducer, EtiquetaState} from './etiqueta.reducer';
import {ProcessoReducer, ProcessoState} from './processo.reducer';

export interface TarefaDetailAppState
{
    tarefaDetail: TarefaDetailState;
    etiqueta: EtiquetaState;
    processo: ProcessoState;
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
    processo: ProcessoReducer
};

export * from './tarefa-detail.reducer';
export * from './etiqueta.reducer';
export * from './processo.reducer';
