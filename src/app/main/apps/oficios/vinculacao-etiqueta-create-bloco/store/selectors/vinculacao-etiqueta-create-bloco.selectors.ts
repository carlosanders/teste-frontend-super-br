import {createSelector} from '@ngrx/store';
import {
    getVinculacaoEtiquetaCreateBlocoAppState,
    VinculacaoEtiquetaCreateBlocoAppState,
    VinculacaoEtiquetaCreateBlocoState
} from '../reducers';

export const getVinculacaoEtiquetaCreateBlocoState: any = createSelector(
    getVinculacaoEtiquetaCreateBlocoAppState,
    (state: VinculacaoEtiquetaCreateBlocoAppState) => state.vinculacaoEtiquetaCreateBloco
);

export const getIsSaving: any = createSelector(
    getVinculacaoEtiquetaCreateBlocoState,
    (state: VinculacaoEtiquetaCreateBlocoState) => state.savingDocumentosAvulsoId.length > 0
);

export const getErrors: any = createSelector(
    getVinculacaoEtiquetaCreateBlocoState,
    (state: VinculacaoEtiquetaCreateBlocoState) => state.errors
);
