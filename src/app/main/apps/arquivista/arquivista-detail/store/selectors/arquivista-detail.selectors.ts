import {createSelector} from '@ngrx/store';
import {ArquivistaDetailAppState, ArquivistaDetailState, getArquivistaDetailAppState} from '../reducers/';

export const getArquivistaDetailState = createSelector(
    getArquivistaDetailAppState,
    (state: ArquivistaDetailAppState) => state.arquivistaDetail
);

export const getMaximizado = createSelector(
    getArquivistaDetailState,
    (state: ArquivistaDetailState) => state.maximizado
);

export const getSavingVinculacaoEtiquetaId = createSelector(
    getArquivistaDetailState,
    (state: ArquivistaDetailState) => state.savingVinculacaoEtiquetaId
);

