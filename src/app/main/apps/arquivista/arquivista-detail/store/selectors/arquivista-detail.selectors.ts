import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Processo} from '@cdk/models';
import {processo as processoSchema} from '@cdk/normalizr/processo.schema';
import {createSelector} from '@ngrx/store';
import {ArquivistaDetailAppState, ArquivistaDetailState, getArquivistaDetailAppState} from '../reducers/';

const schemaProcessoSelectors = createSchemaSelectors<Processo>(processoSchema);

export const getArquivistaDetailState = createSelector(
    getArquivistaDetailAppState,
    (state: ArquivistaDetailAppState) => state.arquivistaDetail
);

export const getHasLoaded = createSelector(
    getArquivistaDetailState,
    (state: ArquivistaDetailState) => state.loaded
);

export const getProcessoId = createSelector(
    getArquivistaDetailState,
    (state: ArquivistaDetailState) => state.loaded ? state.loaded.value : null
);

export const getProcesso = createSelector(
    schemaProcessoSelectors.getNormalizedEntities,
    getProcessoId,
    schemaProcessoSelectors.entityProjector
);

export const getMaximizado = createSelector(
    getArquivistaDetailState,
    (state: ArquivistaDetailState) => state.maximizado
);

export const getSavingVincEtiquetaId = createSelector(
    getArquivistaDetailState,
    (state: ArquivistaDetailState) => state.savingVincEtiquetaId
);

export const getErrors = createSelector(
    getArquivistaDetailState,
    (state: ArquivistaDetailState) => state.errors
);