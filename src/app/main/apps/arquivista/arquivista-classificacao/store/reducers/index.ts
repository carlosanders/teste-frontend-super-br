import {ArquivistaClassificacaoReducer, ArquivistaClassificacaoState} from './arquivista-classificacao.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface ArquivistaClassificacaoAppState {
    arquivistaClassificacao: ArquivistaClassificacaoState;
}

export const getArquivistaClassificacaoAppState = createFeatureSelector<ArquivistaClassificacaoAppState>(
    'arquivista-classificacao-app'
);

export const getAppState = createSelector(
    getArquivistaClassificacaoAppState,
    (state: ArquivistaClassificacaoAppState) => state
);

export const reducers: ActionReducerMap<ArquivistaClassificacaoAppState> = {
    arquivistaClassificacao: ArquivistaClassificacaoReducer
}

export * from './arquivista-classificacao.reducer';