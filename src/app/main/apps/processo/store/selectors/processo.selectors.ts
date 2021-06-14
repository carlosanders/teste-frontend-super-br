import {createSelector} from '@ngrx/store';
import {getProcessoAppState, ProcessoAppState, ProcessoState} from 'app/main/apps/processo/store/reducers';
import {Compartilhamento, Processo} from '@cdk/models';
import {compartilhamento as acompanhamentoSchema, processo as processoSchema} from '@cdk/normalizr';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {AcompanhamentoState} from '../../processo-capa/store';

const schemaProcessoSelectors = createSchemaSelectors<Processo>(processoSchema);
const schemaAcompanhamentoSelectors = createSchemaSelectors<Compartilhamento>(acompanhamentoSchema);

export const getProcessoState = createSelector(
    getProcessoAppState,
    (state: ProcessoAppState) => state.processo
);

export const getSavingVinculacaoEtiquetaId = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.savingVinculacaoEtiquetaId
);

export const getExpandirTela = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.expandir
);

export const getErrors = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.errors
);

export const getProcessoId = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.loaded && state.loaded.value !== 'criar' ? state.loaded.value : null
);

export const getProcesso = createSelector(
    schemaProcessoSelectors.getNormalizedEntities,
    getProcessoId,
    schemaProcessoSelectors.entityProjector
);

export const getProcessoLoaded = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.loaded
);

export const getProcessoIsLoading = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.loading
);

export const getPluginLoadingProcesso = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.pluginLoading
);

export const getSteps = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.steps
);

export const getAcompanhamentoId = createSelector(
    getProcessoState,
    (state: AcompanhamentoState) => state.entitiesId
);

export const getAcompanhamento = createSelector(
    schemaAcompanhamentoSelectors.getNormalizedEntities,
    getAcompanhamentoId,
    schemaAcompanhamentoSelectors.entitiesProjector
);

export const getSaveAcompanhamentoId = createSelector(
    getProcessoState,
    (state: AcompanhamentoState) => state.entityId
);

export const getAcompanhamentoProcessoLoaded = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.loaded
);

export const getIsSaving = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.saving
);

export const getDeletedIds = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.deletedIds
);

export const getIsAcompanhamentoLoading = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.loading
);

export const getTogglingAcompanharProcesso = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.loadingAcompanhamento
);

