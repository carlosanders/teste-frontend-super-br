import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { ProcessoCapaReducer, ProcessoCapaState } from './processo-capa.reducer';
import { JuntadaReducer, JuntadaState } from './juntada.reducer';
import { AssuntoReducer, AssuntoState } from './assunto.reducer';
import { InteressadoReducer, InteressadoState } from './interessado.reducer';

export interface ProcessoCapaAppState
{
    processo: ProcessoCapaState;
    juntadas: JuntadaState;
    assuntos: AssuntoState;
    interessados: InteressadoState;
}

export const getProcessoCapaAppState = createFeatureSelector<ProcessoCapaAppState>(
    'processo-capa-app'
);

export const reducers: ActionReducerMap<ProcessoCapaAppState> = {
    processo: ProcessoCapaReducer,
    juntadas: JuntadaReducer,
    assuntos: AssuntoReducer,
    interessados: InteressadoReducer
};

export * from './processo-capa.reducer';
export * from './juntada.reducer';
export * from './assunto.reducer';
export * from './interessado.reducer';
