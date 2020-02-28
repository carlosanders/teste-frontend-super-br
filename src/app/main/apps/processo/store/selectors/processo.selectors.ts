import {createSelector} from '@ngrx/store';
import {getProcessoAppState, ProcessoAppState, ProcessoState} from 'app/main/apps/processo/store/reducers';
import {Processo} from '@cdk/models';
import {processo as processoSchema} from '@cdk/normalizr/processo.schema';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';

const schemaProcessoSelectors = createSchemaSelectors<Processo>(processoSchema);

export const getProcessoState = createSelector(
    getProcessoAppState,
    (state: ProcessoAppState) => state.processo
);

export const getSavingVincEtiquetaId = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.savingVincEtiquetaId
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
