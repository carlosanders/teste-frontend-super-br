import {createSelector} from '@ngrx/store';
import {getDadosBasicosAppState, DadosBasicosAppState, DadosBasicosState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Processo} from '@cdk/models/processo.model';
import {processo as processoSchema} from '@cdk/normalizr/processo.schema';

const schemaProcessoSelectors = createSchemaSelectors<Processo>(processoSchema);

export const getDadosBasicosState = createSelector(
    getDadosBasicosAppState,
    (state: DadosBasicosAppState) => state.dadosBasicos
);

export const getProcessoId = createSelector(
    getDadosBasicosState,
    (state: DadosBasicosState) => state.loaded && state.loaded.value !== 'criar' ? state.loaded.value : null
);

export const getProcesso = createSelector(
    schemaProcessoSelectors.getNormalizedEntities,
    getProcessoId,
    schemaProcessoSelectors.entityProjector
);

export const getProcessoLoaded = createSelector(
    getDadosBasicosState,
    (state: DadosBasicosState) => state.loaded
);

export const getIsSaving = createSelector(
    getDadosBasicosState,
    (state: DadosBasicosState) => state.saving
);

export const getErrors = createSelector(
    getDadosBasicosState,
    (state: DadosBasicosState) => state.errors
);
