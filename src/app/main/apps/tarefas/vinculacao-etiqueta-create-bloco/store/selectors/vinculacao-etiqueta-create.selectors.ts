import {createSelector} from '@ngrx/store';
import {getVinculacaoEtiquetaCreateAppState, VinculacaoEtiquetaCreateAppState, VinculacaoEtiquetaCreateState} from '../reducers';

export const getVinculacaoEtiquetaCreateState = createSelector(
    getVinculacaoEtiquetaCreateAppState,
    (state: VinculacaoEtiquetaCreateAppState) => state.vinculacaoEtiquetaCreate
);

export const getIsSaving = createSelector(
    getVinculacaoEtiquetaCreateState,
    (state: VinculacaoEtiquetaCreateState) => state.savingTarefasId.length > 0
);

export const getErrors = createSelector(
    getVinculacaoEtiquetaCreateState,
    (state: VinculacaoEtiquetaCreateState) => state.errors
);
