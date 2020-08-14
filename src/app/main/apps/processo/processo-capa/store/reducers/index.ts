import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {ProcessoCapaReducer, ProcessoCapaState} from './processo-capa.reducer';
import {AssuntoReducer, AssuntoState} from './assunto.reducer';
import {InteressadoReducer, InteressadoState} from './interessado.reducer';
import {VinculacaoProcessoReducer, VinculacaoProcessoState} from './vinculacao-processo.reducer';
import {TarefaReducer, TarefaState} from './tarefa.reducer';

export interface ProcessoCapaAppState {
    processo: ProcessoCapaState;
    assuntos: AssuntoState;
    interessados: InteressadoState;
    vinculacoesProcessos: VinculacaoProcessoState;
    tarefas: TarefaState;
}

export const getProcessoCapaAppState = createFeatureSelector<ProcessoCapaAppState>(
    'processo-capa-app'
);

export const reducers: ActionReducerMap<ProcessoCapaAppState> = {
    processo: ProcessoCapaReducer,
    assuntos: AssuntoReducer,
    interessados: InteressadoReducer,
    vinculacoesProcessos: VinculacaoProcessoReducer,
    tarefas: TarefaReducer
};

export * from './processo-capa.reducer';
export * from './assunto.reducer';
export * from './interessado.reducer';
export * from './vinculacao-processo.reducer';
export * from './tarefa.reducer';
