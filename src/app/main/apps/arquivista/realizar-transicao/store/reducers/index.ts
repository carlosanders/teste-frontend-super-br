import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { RealizarTransicaoReducer, RealizarTransicaoState } from './realizar-transicao.reducer';

export interface RealizarTransicaoAppState
{
    transicao: RealizarTransicaoState;
}

export const getRealizarTransicaoAppState = createFeatureSelector<RealizarTransicaoAppState>(
    'app-realizar-transicao'
);

export const getAppState = createSelector(
    getRealizarTransicaoAppState,
    (state: RealizarTransicaoAppState) => state
);

export const reducers: ActionReducerMap<RealizarTransicaoAppState> = {
    transicao: RealizarTransicaoReducer
};

export * from './realizar-transicao.reducer';