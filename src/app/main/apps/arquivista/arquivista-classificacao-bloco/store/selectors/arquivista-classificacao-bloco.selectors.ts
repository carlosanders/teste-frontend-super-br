import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Processo} from '@cdk/models';
import {processo as processoShema} from '@cdk/normalizr/processo.schema';
import {createSelector} from '@ngrx/store';
import {getArquivistaClassificacaoBlocoAppState, ArquivistaClassificacaoBlocoAppState, ArquivistaClassificacaoBlocoState} from '../reducers';

const schemaArquivistaClassificacaoBlocoSelectors = createSchemaSelectors<Processo>(processoShema);

export const getArquivistaClassificacaoBlocoState = createSelector(
    getArquivistaClassificacaoBlocoAppState,
    (state: ArquivistaClassificacaoBlocoAppState) => state.arquivistaClassificacao
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