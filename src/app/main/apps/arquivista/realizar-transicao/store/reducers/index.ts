import {RealizarTransicaoReducer, RealizarTransicaoState} from './realizar-transicao.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface RealizarTransicaoAppState {
    transicao: RealizarTransicaoState;
}

export const getRealizarTransicaoAppState = createFeatureSelector<RealizarTransicaoAppState>(
    'realizar-transicao'
);

export const getAppState: any = createSelector(
    getRealizarTransicaoAppState,
    (state: RealizarTransicaoAppState) => state
);

export const reducers: ActionReducerMap<RealizarTransicaoAppState> = {
    transicao: RealizarTransicaoReducer
};

export * from './realizar-transicao.reducer';
