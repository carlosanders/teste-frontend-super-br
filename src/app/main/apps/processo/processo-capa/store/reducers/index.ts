import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {ProcessoCapaReducer, ProcessoCapaState} from './processo-capa.reducer';
import {AssuntoReducer, AssuntoState} from './assunto.reducer';
import {InteressadoReducer, InteressadoState} from './interessado.reducer';
import {VinculacaoProcessoReducer, VinculacaoProcessoState} from './vinculacao-processo.reducer';
import {AcompanhamentoReducer, AcompanhamentoState} from "./acompanhamento.reducer";

export interface ProcessoCapaAppState {
    processo: ProcessoCapaState;
    assuntos: AssuntoState;
    interessados: InteressadoState;
    vinculacoesProcessos: VinculacaoProcessoState;
    acompanhamento: AcompanhamentoState;
}

export const getProcessoCapaAppState = createFeatureSelector<ProcessoCapaAppState>(
    'processo-capa-app'
);

export const reducers: ActionReducerMap<ProcessoCapaAppState> = {
    processo: ProcessoCapaReducer,
    assuntos: AssuntoReducer,
    interessados: InteressadoReducer,
    vinculacoesProcessos: VinculacaoProcessoReducer,
    acompanhamento: AcompanhamentoReducer
};

export * from './processo-capa.reducer';
export * from './assunto.reducer';
export * from './interessado.reducer';
export * from './vinculacao-processo.reducer';
export * from './acompanhamento.reducer';
