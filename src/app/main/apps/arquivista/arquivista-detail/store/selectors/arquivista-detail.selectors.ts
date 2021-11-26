import {createSelector} from '@ngrx/store';
import {ArquivistaDetailAppState, ArquivistaDetailState, getArquivistaDetailAppState} from '../reducers/';

export const getArquivistaDetailState: any = createSelector(
    getArquivistaDetailAppState,
    (state: ArquivistaDetailAppState) => state.arquivistaDetail
);

export const getMaximizado: any = createSelector(
    getArquivistaDetailState,
    (state: ArquivistaDetailState) => state.maximizado
);

export const getSavingVinculacaoEtiquetaId: any = createSelector(
    getArquivistaDetailState,
    (state: ArquivistaDetailState) => state.savingVinculacaoEtiquetaId
);

