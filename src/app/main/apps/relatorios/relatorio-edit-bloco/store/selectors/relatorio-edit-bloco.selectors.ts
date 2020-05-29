import {createSelector} from '@ngrx/store';
import {getRelatorioEditBlocoAppState, RelatorioEditBlocoAppState, RelatorioEditBlocoState} from '../reducers';

export const getRelatorioEditBlocoState = createSelector(
    getRelatorioEditBlocoAppState,
    (state: RelatorioEditBlocoAppState) => state.relatorioEditBloco
);

export const getIsSaving = createSelector(
    getRelatorioEditBlocoState,
    (state: RelatorioEditBlocoState) => state.savingId.length > 0
);

export const getErrors = createSelector(
    getRelatorioEditBlocoState,
    (state: RelatorioEditBlocoState) => state.errors
);
