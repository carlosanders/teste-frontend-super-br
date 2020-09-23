import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {
    DesentranhamentoCreateBlocoReducer,
    DesentranhamentoCreateBlocoState
} from './desentranhamento-create-bloco.reducer';
import {JuntadaCreateBlocoReducer, JuntadaCreateBlocoState} from './juntada-create-bloco.reducer';

export interface DesentranhamentoCreateBlocoAppState {
    desentranhamentoCreateBloco: DesentranhamentoCreateBlocoState;
    juntadaCreateBloco: JuntadaCreateBlocoState;
}

export const getDesentranhamentoCreateBlocoAppState = createFeatureSelector<DesentranhamentoCreateBlocoAppState>(
    'desentranhamento-create-bloco-app'
);

export const getAppState = createSelector(
    getDesentranhamentoCreateBlocoAppState,
    (state: DesentranhamentoCreateBlocoAppState) => state
);

export const reducers: ActionReducerMap<DesentranhamentoCreateBlocoAppState> = {
    desentranhamentoCreateBloco: DesentranhamentoCreateBlocoReducer,
    juntadaCreateBloco: JuntadaCreateBlocoReducer,
};

export * from './desentranhamento-create-bloco.reducer';
export * from './juntada-create-bloco.reducer';
