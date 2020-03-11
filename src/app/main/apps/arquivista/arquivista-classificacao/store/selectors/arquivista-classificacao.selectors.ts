import {getArquivistaClassificacaoAppState, ArquivistaClassificacaoAppState, ArquivistaClassificacaoState} from '../reducers';
import {createSelector} from '@ngrx/store';
import {classificacao as classificacaoSchema} from '@cdk/normalizr/classificacao.schema';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Classificacao} from '@cdk/models';

const schemaClassificacaoSelectors = createSchemaSelectors<Classificacao>(classificacaoSchema);

export const getClassificacaoState = createSelector(
    getArquivistaClassificacaoAppState,
    (state: ArquivistaClassificacaoAppState) => state.classificacao
);

export const getClassificacaoId = createSelector(
    getClassificacaoState,
    (state: ArquivistaClassificacaoState) => state.loaded ? state.loaded.value : null
);

export const getClassificacao = createSelector(
    schemaClassificacaoSelectors.getNormalizedEntities,
    getClassificacaoId,
    schemaClassificacaoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getClassificacaoState,
    (state: ArquivistaClassificacaoState) => state.saving
);

export const getHasLoaded = createSelector(
    getClassificacaoState,
    (state: ArquivistaClassificacaoState) => state.loaded
);

export const getErrors = createSelector(
    getClassificacaoState,
    (state: ArquivistaClassificacaoState) => state.errors
);

