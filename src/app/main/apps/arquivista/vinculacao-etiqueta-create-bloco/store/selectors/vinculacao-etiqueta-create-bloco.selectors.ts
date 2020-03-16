import {createSelector} from '@ngrx/store';
import {getVinculacaoEtiquetaCreateBlocoAppState, VinculacaoEtiquetaCreateBlocoAppState, VinculacaoEtiquetaCreateBlocoState} from '../reducers';

export const getVinculacaoEtiquetaCreateBlocoState = createSelector(
    getVinculacaoEtiquetaCreateBlocoAppState,
    (state: VinculacaoEtiquetaCreateBlocoAppState) => state.vinculacaoEtiquetaCreateBloco
);

export const getIsSaving = createSelector(
    getVinculacaoEtiquetaCreateBlocoState,
    (state: VinculacaoEtiquetaCreateBlocoState) => state.savingProcessosId.length > 0
);

export const getErrors = createSelector(
    getVinculacaoEtiquetaCreateBlocoState,
    (state: VinculacaoEtiquetaCreateBlocoState) => state.errors
);