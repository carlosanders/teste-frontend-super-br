import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {DadosBasicosReducer, DadosBasicosState} from './dados-basicos.reducer';
import {AssuntoReducer, AssuntoState} from './assunto.reducer';
import {InteressadoReducer, InteressadoState} from './interessado.reducer';
import {VinculacaoProcessoReducer, VinculacaoProcessoState} from './vinculacao-processo.reducer';
import {JuntadaReducer, JuntadaState} from './juntada.reducer';
import {TarefaReducer, TarefaState} from './tarefa.reducer';
import {ConfiguracaoNupReducer, ConfiguracaoNupState} from './configuracao-nup.reducer';

export interface DadosBasicosAppState
{
    dadosBasicos: DadosBasicosState;
    assuntos: AssuntoState;
    interessados: InteressadoState;
    vinculacoesProcessos: VinculacaoProcessoState;
    juntadas: JuntadaState;
    tarefa: TarefaState;
    configuracaoNup: ConfiguracaoNupState;
}

export const getDadosBasicosAppState = createFeatureSelector<DadosBasicosAppState>(
    'dados-basicos-steps-app'
);

export const getAppState: any = createSelector(
    getDadosBasicosAppState,
    (state: DadosBasicosAppState) => state
);

export const reducers: ActionReducerMap<DadosBasicosAppState> = {
    dadosBasicos: DadosBasicosReducer,
    assuntos: AssuntoReducer,
    interessados: InteressadoReducer,
    vinculacoesProcessos: VinculacaoProcessoReducer,
    juntadas: JuntadaReducer,
    tarefa: TarefaReducer,
    configuracaoNup: ConfiguracaoNupReducer
};

export * from './dados-basicos.reducer';
export * from './assunto.reducer';
export * from './interessado.reducer';
export * from './vinculacao-processo.reducer';
export * from './juntada.reducer';
export * from './tarefa.reducer';
export * from './configuracao-nup.reducer';

