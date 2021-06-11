import {createSelector} from '@ngrx/store';
import {
    getRedistribuicaoEditBlocoAppState,
    RedistribuicaoEditBlocoAppState,
    RedistribuicaoEditBlocoState
} from '../reducers';

export const getRedistribuicaoEditBlocoState = createSelector(
    getRedistribuicaoEditBlocoAppState,
    (state: RedistribuicaoEditBlocoAppState) => state.tarefaEditBloco
);

export const getTarefasProcessoRestritoValidadas = createSelector(
    getRedistribuicaoEditBlocoState,
    (state: RedistribuicaoEditBlocoState) => state.tarefasProcessoRestritosValidadas
);

export const getIsSaving = createSelector(
    getRedistribuicaoEditBlocoState,
    (state: RedistribuicaoEditBlocoState) => state.savingId.length > 0
);

export const getErrors = createSelector(
    getRedistribuicaoEditBlocoState,
    (state: RedistribuicaoEditBlocoState) => state.errors
);
