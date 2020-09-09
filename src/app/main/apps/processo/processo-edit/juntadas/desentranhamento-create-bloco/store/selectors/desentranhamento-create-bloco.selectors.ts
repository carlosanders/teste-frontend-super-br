import {createSelector} from '@ngrx/store';
import {
    DesentranhamentoCreateBlocoAppState,
    DesentranhamentoCreateBlocoState,
    getDesentranhamentoCreateBlocoAppState
} from '../reducers';

export const getDesentranhamentoCreateBlocoState = createSelector(
    getDesentranhamentoCreateBlocoAppState,
    (state: DesentranhamentoCreateBlocoAppState) => state.desentranhamentoCreateBloco
);

export const getIsSaving = createSelector(
    getDesentranhamentoCreateBlocoState,
    (state: DesentranhamentoCreateBlocoState) => state.savingJuntadasId.length > 0
);

export const getErrors = createSelector(
    getDesentranhamentoCreateBlocoState,
    (state: DesentranhamentoCreateBlocoState) => state.errors
);
