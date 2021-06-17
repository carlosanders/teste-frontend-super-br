import {createSelector} from '@ngrx/store';
import {
    CompartilhamentoCreateBlocoAppState,
    CompartilhamentoCreateBlocoState,
    getCompartilhamentoCreateBlocoAppState
} from '../reducers';

export const getCompartilhamentoCreateBlocoState = createSelector(
    getCompartilhamentoCreateBlocoAppState,
    (state: CompartilhamentoCreateBlocoAppState) => state.compartilhamentoCreateBloco
);

export const getIsSaving = createSelector(
    getCompartilhamentoCreateBlocoState,
    (state: CompartilhamentoCreateBlocoState) => state.savingTarefasId.length > 0
);

export const getErrors = createSelector(
    getCompartilhamentoCreateBlocoState,
    (state: CompartilhamentoCreateBlocoState) => state.errors
);
