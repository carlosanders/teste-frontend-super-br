import {createSelector} from '@ngrx/store';
import {
    getRedistribuicaoEditBlocoAppState,
    RedistribuicaoEditBlocoAppState,
    RedistribuicaoEditBlocoState
} from '../reducers';

export const getRedistribuicaoEditBlocoState: any = createSelector(
    getRedistribuicaoEditBlocoAppState,
    (state: RedistribuicaoEditBlocoAppState) => state.tarefaEditBloco
);

export const getTarefasProcessoRestritoValidadas: any = createSelector(
    getRedistribuicaoEditBlocoState,
    (state: RedistribuicaoEditBlocoState) => state.tarefasProcessoRestritosValidadas
);

export const getIsSaving: any = createSelector(
    getRedistribuicaoEditBlocoState,
    (state: RedistribuicaoEditBlocoState) => state.savingId.length > 0
);

export const getErrors: any = createSelector(
    getRedistribuicaoEditBlocoState,
    (state: RedistribuicaoEditBlocoState) => state.errors
);
