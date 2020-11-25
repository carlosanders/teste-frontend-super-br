import {createSelector} from '@ngrx/store';
import {
    getProcessoViewAppState,
    ProcessoViewAppState,
    ProcessoViewState
} from 'app/main/apps/processo/processo-view/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {juntada as juntadaSchema} from '@cdk/normalizr';
import {Juntada} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Juntada>(juntadaSchema);

export const getProcessoViewState = createSelector(
    getProcessoViewAppState,
    (state: ProcessoViewAppState) => state.processoView
);

export const getJuntadasIds = createSelector(
    getProcessoViewState,
    (state: ProcessoViewState) => state.entitiesId
);

export const getJuntadas = createSelector(
    schemaSelectors.getNormalizedEntities,
    getJuntadasIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getProcessoViewState,
    (state: ProcessoViewState) => state.pagination
);

export const getJuntadasLoaded = createSelector(
    getProcessoViewState,
    (state: ProcessoViewState) => state.loaded
);

export const getIsLoading = createSelector(
    getProcessoViewState,
    (state: ProcessoViewState) => state.loading
);

export const getBinary = createSelector(
    getProcessoViewState,
    (state: ProcessoViewState) => state.binary
);

export const getIndex = createSelector(
    getProcessoViewState,
    (state: ProcessoViewState) => state.index
);

export const getCurrentStep = createSelector(
    getProcessoViewState,
    (state: ProcessoViewState) => state.currentStep
);

export const getCurrentStepLoaded = createSelector(
    getProcessoViewState,
    (state: ProcessoViewState) => state.currentStepLoaded
);
