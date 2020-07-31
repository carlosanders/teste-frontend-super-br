import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {DadosBasicosReducer, DadosBasicosState} from './dados-basicos.reducer';
import {AssuntoReducer, AssuntoState} from './assunto.reducer';
import {InteressadoReducer, InteressadoState} from './interessado.reducer';
import {VinculacaoProcessoReducer, VinculacaoProcessoState} from './vinculacao-processo.reducer';
import {JuntadaListReducer, JuntadaListState} from './juntada.reducer';

export interface DadosBasicosAppState
{
    dadosBasicos: DadosBasicosState;
    assuntos: AssuntoState;
    interessados: InteressadoState;
    vinculacoesProcessos: VinculacaoProcessoState;
    juntadas: JuntadaListState;
}

export const getDadosBasicosAppState = createFeatureSelector<DadosBasicosAppState>(
    'dados-basicos-app'
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
    juntadas: JuntadaListReducer
};

export * from './dados-basicos.reducer';
export * from './assunto.reducer';
export * from './interessado.reducer';
export * from './vinculacao-processo.reducer';
export * from './juntada.reducer';

