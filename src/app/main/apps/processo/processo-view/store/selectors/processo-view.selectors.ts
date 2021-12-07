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

export const getProcessoViewState: any = createSelector(
    getProcessoViewAppState,
    (state: ProcessoViewAppState) => state.processoView
);

export const getJuntadasIds: any = createSelector(
    getProcessoViewState,
    (state: ProcessoViewState) => state.entitiesId
);

export const expandirTela: any = createSelector(
    getProcessoViewState,
    (state: ProcessoViewState) => state.expandir
);

export const getJuntadas: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getJuntadasIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getProcessoViewState,
    (state: ProcessoViewState) => state.pagination
);

export const getJuntadasLoaded: any = createSelector(
    getProcessoViewState,
    (state: ProcessoViewState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getProcessoViewState,
    (state: ProcessoViewState) => state.loading
);

export const getBinary: any = createSelector(
    getProcessoViewState,
    (state: ProcessoViewState) => state.binary
);

export const getIndex: any = createSelector(
    getProcessoViewState,
    (state: ProcessoViewState) => state.index
);

export const getCurrentStep: any = createSelector(
    getProcessoViewState,
    (state: ProcessoViewState) => state.currentStep
);

export const getCurrentStepLoaded: any = createSelector(
    getProcessoViewState,
    (state: ProcessoViewState) => state.currentStepLoaded
);

export const getIsLoadingBinary: any = createSelector(
    getProcessoViewState,
    (state: ProcessoViewState) => state.binary.loading
);
