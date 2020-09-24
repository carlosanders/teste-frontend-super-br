import {ArquivistaClassificacaoReducer, ArquivistaClassificacaoState} from './arquivista-classificacao-edit.reducers';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface ArquivistaClassificacaoAppState {
    arquivistaClassificacao: ArquivistaClassificacaoState;
}

export const getArquivistaClassificacaoAppState = createFeatureSelector<ArquivistaClassificacaoAppState>(
    '<span class="mr-4 ml-4">/</span>arquivista-classificacao-edit');

export const getAppState = createSelector(
    getArquivistaClassificacaoAppState,
    (state: ArquivistaClassificacaoAppState) => state
);

export const reducers: ActionReducerMap<ArquivistaClassificacaoAppState> = {
    arquivistaClassificacao: ArquivistaClassificacaoReducer
};

export * from './arquivista-classificacao-edit.reducers';
