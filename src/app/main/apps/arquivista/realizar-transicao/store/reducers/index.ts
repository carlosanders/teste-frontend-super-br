import {RealizarTransicaoReducer, RealizarTransicaoState} from './realizar-transicao.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface RealizarTransicaoAppState {
    arquivistaClassificacao: RealizarTransicaoState;
}

export const getRealizarTransicaoAppState = createFeatureSelector<RealizarTransicaoAppState>('<span class="mr-4 ml-4">/</span>arquivista-classificacao-edit');

export const getAppState = createSelector(
    getRealizarTransicaoAppState,
    (state: RealizarTransicaoAppState) => state
);

export const reducers: ActionReducerMap<RealizarTransicaoAppState> = {
    arquivistaClassificacao: RealizarTransicaoReducer
};

export * from './realizar-transicao.reducer';
