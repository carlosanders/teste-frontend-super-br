import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {DadosBasicosReducer, DadosBasicosState} from './dados-basicos.reducer';
import {AssuntoReducer, AssuntoState} from './assunto.reducer';
import {InteressadoReducer, InteressadoState} from './interessado.reducer';
import {VinculacaoProcessoReducer, VinculacaoProcessoState} from './vinculacao-processo.reducer';
import {JuntadaReducer, JuntadaState} from './juntada.reducer';
import {TarefaState, TarefaReducer} from './tarefa.reducer';

export interface DadosBasicosAppState
{
    dadosBasicos: DadosBasicosState;
    assuntos: AssuntoState;
    interessados: InteressadoState;
    vinculacoesProcessos: VinculacaoProcessoState;
    juntadas: JuntadaState;
    tarefa: TarefaState
}

export const getDadosBasicosAppState = createFeatureSelector<DadosBasicosAppState>(
    'dados-basicos-steps-app'
);

export const getAppState = createSelector(
    getDadosBasicosAppState,
    (state: DadosBasicosAppState) => state
);

export const reducers: ActionReducerMap<DadosBasicosAppState> = {
    dadosBasicos: DadosBasicosReducer,
    assuntos: AssuntoReducer,
    interessados: InteressadoReducer,
    vinculacoesProcessos: VinculacaoProcessoReducer,
    juntadas: JuntadaReducer,
    tarefa: TarefaReducer
};

export * from './dados-basicos.reducer';
export * from './assunto.reducer';
export * from './interessado.reducer';
export * from './vinculacao-processo.reducer';
export * from './juntada.reducer';
export * from './tarefa.reducer';

