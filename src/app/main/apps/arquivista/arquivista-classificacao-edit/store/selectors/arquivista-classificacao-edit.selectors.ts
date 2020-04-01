import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Processo} from '@cdk/models';
import {processo as processoShema} from '@cdk/normalizr/processo.schema';
import {createSelector} from '@ngrx/store';
import {getArquivistaClassificacaoAppState, ArquivistaClassificacaoAppState, ArquivistaClassificacaoState} from '../reducers';
import {getProcessosIds} from '../../../arquivista-list/store/selectors';

const schemaArquivistaClassificacaoSelectors = createSchemaSelectors<Processo>(processoShema);

export const getArquivistaClassificacaoState = createSelector(
    getArquivistaClassificacaoAppState,
    (state: ArquivistaClassificacaoAppState) => state.arquivistaClassificacao
);

export const getArquivistaClassificacaoId = createSelector(
    getArquivistaClassificacaoState,
    (state: ArquivistaClassificacaoState) => state.loaded ? state.loaded.value : null
);

export const getProcessos = createSelector(
    schemaArquivistaClassificacaoSelectors.getNormalizedEntities,
    getProcessosIds,
    schemaArquivistaClassificacaoSelectors.entitiesProjector
);

export const getArquivistaClassificacaoList = createSelector(
    schemaArquivistaClassificacaoSelectors.getNormalizedEntities,
    getArquivistaClassificacaoId,
    schemaArquivistaClassificacaoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getArquivistaClassificacaoState,
    (state: ArquivistaClassificacaoState) => state.saving
);

export const getHasLoaded = createSelector(
    getArquivistaClassificacaoState,
    (state: ArquivistaClassificacaoState) => state.loaded
);

export const getErrors = createSelector(
    getArquivistaClassificacaoState,
    (state: ArquivistaClassificacaoState) => state.errors
);