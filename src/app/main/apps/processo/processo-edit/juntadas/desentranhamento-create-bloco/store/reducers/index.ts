import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {JuntadaCreateBlocoReducer, JuntadaCreateBlocoState} from './juntada-create-bloco.reducer';

export interface DesentranhamentoCreateBlocoAppState {
    juntadaCreateBloco: JuntadaCreateBlocoState;
}

export const getDesentranhamentoCreateBlocoAppState = createFeatureSelector<DesentranhamentoCreateBlocoAppState>(
    'desentranhamento-create-bloco-app'
);

export const getAppState: any = createSelector(
    getDesentranhamentoCreateBlocoAppState,
    (state: DesentranhamentoCreateBlocoAppState) => state
);

export const reducers: ActionReducerMap<DesentranhamentoCreateBlocoAppState> = {
    juntadaCreateBloco: JuntadaCreateBlocoReducer,
};

export * from './juntada-create-bloco.reducer';
