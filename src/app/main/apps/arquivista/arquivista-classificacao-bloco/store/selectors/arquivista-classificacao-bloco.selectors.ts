import {createSelector} from '@ngrx/store';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Processo} from '@cdk/models';
import {processo as processoShema} from '@cdk/normalizr';
import {getArquivistaClassificacaoBlocoAppState, ArquivistaClassificacaoBlocoAppState, ArquivistaClassificacaoBlocoState} from '../reducers';
import {getProcessosIds} from '../../../arquivista-list/store/selectors';

const schemaArquivistaClassificacaoBlocoSelectors = createSchemaSelectors<Processo>(processoShema);

export const getArquivistaClassificacaoBlocoState = createSelector(
    getArquivistaClassificacaoBlocoAppState,
    (state: ArquivistaClassificacaoBlocoAppState) => state.arquivistaClassificacaoBloco
);

export const getArquivistaClassificacaoBlocoId = createSelector(
    getArquivistaClassificacaoBlocoState,
    (state: ArquivistaClassificacaoBlocoState) => state.loaded ? state.loaded.value : null
);

export const getArquivistaClassificacaoBlocoList = createSelector(
    schemaArquivistaClassificacaoBlocoSelectors.getNormalizedEntities,
    getArquivistaClassificacaoBlocoId,
    schemaArquivistaClassificacaoBlocoSelectors.entityProjector
);

export const getProcessos = createSelector(
    schemaArquivistaClassificacaoBlocoSelectors.getNormalizedEntities,
    getProcessosIds,
    schemaArquivistaClassificacaoBlocoSelectors.entitiesProjector
);

export const getIsSaving = createSelector(
    getArquivistaClassificacaoBlocoState,
    (state: ArquivistaClassificacaoBlocoState) => state.saving
);

export const getHasLoaded = createSelector(
    getArquivistaClassificacaoBlocoState,
    (state: ArquivistaClassificacaoBlocoState) => state.loaded
);

export const getErrors = createSelector(
    getArquivistaClassificacaoBlocoState,
    (state: ArquivistaClassificacaoBlocoState) => state.errors
);