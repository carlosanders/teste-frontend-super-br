import {createSelector} from '@ngrx/store';
import {
    CompartilhamentoCreateBlocoAppState,
    CompartilhamentoCreateBlocoState,
    getCompartilhamentoCreateBlocoAppState
} from '../reducers';

export const getCompartilhamentoCreateBlocoState: any = createSelector(
    getCompartilhamentoCreateBlocoAppState,
    (state: CompartilhamentoCreateBlocoAppState) => state.compartilhamentoCreateBloco
);

export const getIsSaving: any = createSelector(
    getCompartilhamentoCreateBlocoState,
    (state: CompartilhamentoCreateBlocoState) => state.savingTarefasId.length > 0
);

export const getErrors: any = createSelector(
    getCompartilhamentoCreateBlocoState,
    (state: CompartilhamentoCreateBlocoState) => state.errors
);
