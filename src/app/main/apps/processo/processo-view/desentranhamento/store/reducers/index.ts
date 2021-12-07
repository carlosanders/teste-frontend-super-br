import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ProcessoViewDesentranhamentoReducer, ProcessoViewDesentranhamentoState} from './juntada.reducer';

export interface ProcessoViewDesentranhamentoAppState
{
    juntada: ProcessoViewDesentranhamentoState;
}

export const getProcessoViewDesentranhamentoAppState = createFeatureSelector<ProcessoViewDesentranhamentoAppState>(
    'processo-view-desentranhamento-app'
);

export const getAppState: any = createSelector(
    getProcessoViewDesentranhamentoAppState,
    (state: ProcessoViewDesentranhamentoAppState) => state
);

export const reducers: ActionReducerMap<ProcessoViewDesentranhamentoAppState> = {
    juntada: ProcessoViewDesentranhamentoReducer
};

export * from './juntada.reducer';
