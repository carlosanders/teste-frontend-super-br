import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { ProcessoCapaReducer, ProcessoCapaState } from './processo-capa.reducer';
import {JuntadaReducer, JuntadaState} from './juntada.reducer';

export interface ProcessoCapaAppState
{
    processo: ProcessoCapaState;
    juntadas: JuntadaState;
}

export const getProcessoCapaAppState = createFeatureSelector<ProcessoCapaAppState>(
    'processo-capa-app'
);

export const reducers: ActionReducerMap<ProcessoCapaAppState> = {
    processo: ProcessoCapaReducer,
    juntadas: JuntadaReducer
};

export * from './processo-capa.reducer';
export * from './juntada.reducer';
