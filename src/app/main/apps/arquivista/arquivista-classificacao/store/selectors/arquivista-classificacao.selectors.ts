import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Processo} from '@cdk/models';
import {processo as processoSchema} from '@cdk/normalizr/processo.schema';
import {createSelector} from '@ngrx/store';
import {ArquivistaClassificacaoAppState, ArquivistaClassificacaoState, getArquivistaClassificacaoAppState} from '../reducers/';

const schemaProcessoSelectors = createSchemaSelectors<Processo>(processoSchema);

export const getArquivistaClassificacaoState = createSelector(
    getArquivistaClassificacaoAppState,
    (state: ArquivistaClassificacaoAppState) => state.arquivistaClassificacao
);

export const getHasLoaded = createSelector(
    getArquivistaClassificacaoState,
    (state: ArquivistaClassificacaoState) => state.loaded
);

export const getProcessoId = createSelector(
    getArquivistaClassificacaoState,
    (state: ArquivistaClassificacaoState) => state.loaded ? state.loaded.value : null
);

export const getProcesso = createSelector(
    schemaProcessoSelectors.getNormalizedEntities,
    getProcessoId,
    schemaProcessoSelectors.entityProjector
);

export const getMaximizado = createSelector(
    getArquivistaClassificacaoState,
    (state: ArquivistaClassificacaoState) => state.maximizado
);

export const getSavingVincEtiquetaId = createSelector(
    getArquivistaClassificacaoState,
    (state: ArquivistaClassificacaoState) => state.savingVincEtiquetaId
);

export const getErrors = createSelector(
    getArquivistaClassificacaoState,
    (state: ArquivistaClassificacaoState) => state.errors
);