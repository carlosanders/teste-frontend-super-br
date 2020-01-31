import {createSelector} from '@ngrx/store';
import {getAproveitarDadosAppState, AproveitarDadosAppState, AproveitarDadosState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Processo} from '@cdk/models/processo.model';
import {processo as processoSchema} from '@cdk/normalizr/processo.schema';

const schemaProcessoSelectors = createSchemaSelectors<Processo>(processoSchema);

export const getAproveitarDadosState = createSelector(
    getAproveitarDadosAppState,
    (state: AproveitarDadosAppState) => state.aproveitarDados
);

export const getProcessoId = createSelector(
    getAproveitarDadosState,
    (state: AproveitarDadosState) => state.loaded && state.loaded.value !== 'criar' ? state.loaded.value : null
);

export const getProcesso = createSelector(
    schemaProcessoSelectors.getNormalizedEntities,
    getProcessoId,
    schemaProcessoSelectors.entityProjector
);

export const getProcessoLoaded = createSelector(
    getAproveitarDadosState,
    (state: AproveitarDadosState) => state.loaded
);

export const getIsSaving = createSelector(
    getAproveitarDadosState,
    (state: AproveitarDadosState) => state.saving
);

export const getErrors = createSelector(
    getAproveitarDadosState,
    (state: AproveitarDadosState) => state.errors
);
