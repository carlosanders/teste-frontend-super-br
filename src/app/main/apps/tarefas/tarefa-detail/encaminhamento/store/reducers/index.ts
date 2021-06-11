import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {ProcessoReducer, ProcessoState} from './processo.reducer';

export interface EncaminhamentoAppState
{
    processo: ProcessoState;
}

export const getEncaminhamentoAppState = createFeatureSelector<EncaminhamentoAppState>(
    'encaminhamento-app'
);


export const reducers: ActionReducerMap<EncaminhamentoAppState> = {
    processo: ProcessoReducer
};

export * from './processo.reducer';
