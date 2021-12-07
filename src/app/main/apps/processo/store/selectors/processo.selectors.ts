import {createSelector} from '@ngrx/store';
import {getProcessoAppState, ProcessoAppState, ProcessoState} from 'app/main/apps/processo/store/reducers';
import {Compartilhamento, Processo} from '@cdk/models';
import {compartilhamento as acompanhamentoSchema, processo as processoSchema} from '@cdk/normalizr';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {AcompanhamentoState} from '../../processo-capa/store';

const schemaProcessoSelectors = createSchemaSelectors<Processo>(processoSchema);
const schemaAcompanhamentoSelectors = createSchemaSelectors<Compartilhamento>(acompanhamentoSchema);

export const getProcessoState: any = createSelector(
    getProcessoAppState,
    (state: ProcessoAppState) => state.processo
);

export const getSavingVinculacaoEtiquetaId: any = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.savingVinculacaoEtiquetaId
);

export const getExpandirTela: any = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.expandir
);

export const getErrors: any = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.errors
);

export const getProcessoId: any = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.loaded && state.loaded.value !== 'criar' ? state.loaded.value : null
);

export const getProcesso: any = createSelector(
    schemaProcessoSelectors.getNormalizedEntities,
    getProcessoId,
    schemaProcessoSelectors.entityProjector
);

export const getProcessoLoaded: any = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.loaded
);

export const getProcessoIsLoading: any = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.loading
);

export const getPluginLoadingProcesso: any = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.pluginLoading
);

export const getSteps: any = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.steps
);

export const getAcompanhamentoId: any = createSelector(
    getProcessoState,
    (state: AcompanhamentoState) => state.entitiesId
);

export const getAcompanhamento: any = createSelector(
    schemaAcompanhamentoSelectors.getNormalizedEntities,
    getAcompanhamentoId,
    schemaAcompanhamentoSelectors.entitiesProjector
);

export const getSaveAcompanhamentoId: any = createSelector(
    getProcessoState,
    (state: AcompanhamentoState) => state.entityId
);

export const getAcompanhamentoProcessoLoaded: any = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.loaded
);

export const getIsSaving: any = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.saving
);

export const getDeletedIds: any = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.deletedIds
);

export const getIsAcompanhamentoLoading: any = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.loading
);

export const getTogglingAcompanharProcesso: any = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.loadingAcompanhamento
);

