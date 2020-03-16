import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ArquivistaClassificacaoReducer, ArquivistaClassificacaoState} from './arquivista-classificacao.reducer';

export interface ArquivistaClassificacaoAppState {
    classificacao: ArquivistaClassificacaoState;
}

export const getArquivistaClassificacaoAppState = createFeatureSelector<ArquivistaClassificacaoAppState>(
    'arquivista-classificacao'
);

export const getAppState = createSelector(
    getArquivistaClassificacaoAppState,
    (state: ArquivistaClassificacaoAppState) => state
);

export const reducers: ActionReducerMap<ArquivistaClassificacaoAppState> = {
    classificacao: ArquivistaClassificacaoReducer
};

export * from './arquivista-classificacao.reducer';
