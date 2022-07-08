import {createSelector} from '@ngrx/store';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {juntada as juntadaSchema, processo as processoSchema} from '@cdk/normalizr';
import {Juntada, Processo} from '@cdk/models';
import {VisualizarProcessoAppState, VisualizarProcessoState, getVisualizarProcessoAppState} from '../reducers';

const schemaSelectors = createSchemaSelectors<Processo>(processoSchema);
const schemaSelectorsJuntada = createSchemaSelectors<Juntada>(juntadaSchema);

export const getVisualizarProcessoState: any = createSelector(
    getVisualizarProcessoAppState,
    (state: VisualizarProcessoAppState) => state.visualizarProcesso
);

export const getProcessoId: any = createSelector(
    getVisualizarProcessoState,
    (state: VisualizarProcessoState) => state.processoId
);

export const getProcessoLoaded: any = createSelector(
    getVisualizarProcessoState,
    (state: VisualizarProcessoState) => state.loaded
);

export const getProcesso: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getProcessoId,
    schemaSelectors.entityProjector
);

export const getJuntadasIds: any = createSelector(
    getVisualizarProcessoState,
    (state: VisualizarProcessoState) => state.entitiesId
);

export const getJuntadas: any = createSelector(
    schemaSelectorsJuntada.getNormalizedEntities,
    getJuntadasIds,
    schemaSelectorsJuntada.entitiesProjector
);

export const getCurrentJuntadaId: any = createSelector(
    getVisualizarProcessoState,
    (state: VisualizarProcessoState) => state.currentStep?.step ?? null
);

export const getCurrentJuntada: any = createSelector(
    schemaSelectorsJuntada.getNormalizedEntities,
    getCurrentJuntadaId,
    schemaSelectorsJuntada.entityProjector
);

export const getPagination: any = createSelector(
    getVisualizarProcessoState,
    (state: VisualizarProcessoState) => state.pagination
);

export const getJuntadasLoaded: any = createSelector(
    getVisualizarProcessoState,
    (state: VisualizarProcessoState) => state.loadedJuntadas
);

export const getIsLoading: any = createSelector(
    getVisualizarProcessoState,
    (state: VisualizarProcessoState) => state.loading
);

export const getIsLoadingLatestBinary: any = createSelector(
    getVisualizarProcessoState,
    (state: VisualizarProcessoState) => state.loadingLatestBinary
);

export const getBinary: any = createSelector(
    getVisualizarProcessoState,
    (state: VisualizarProcessoState) => state.binary
);

export const getCurrentStep: any = createSelector(
    getVisualizarProcessoState,
    (state: VisualizarProcessoState) => state.currentStep
);

export const getCurrentStepLoaded: any = createSelector(
    getVisualizarProcessoState,
    (state: VisualizarProcessoState) => state.currentStepLoaded
);

export const getIsLoadingBinary: any = createSelector(
    getVisualizarProcessoState,
    (state: VisualizarProcessoState) => state.binary.loading
);

export const getIsBookmark: any = createSelector(
    getVisualizarProcessoState,
    (state: VisualizarProcessoState) => state.bookmark
);

export const getPaginaBookmark: any = createSelector(
    getVisualizarProcessoState,
    (state: VisualizarProcessoState) => state.pagina
);
