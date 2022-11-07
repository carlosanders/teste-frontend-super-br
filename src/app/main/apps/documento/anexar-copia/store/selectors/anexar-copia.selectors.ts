import {createSelector} from '@ngrx/store';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {documento as documentoSchema, juntada as juntadaSchema, processo as processoSchema} from '@cdk/normalizr';
import {Documento, Juntada, Processo} from '@cdk/models';
import {AnexarCopiaAppState, AnexarCopiaState, getAnexarCopiaAppState} from '../reducers';

const schemaSelectors = createSchemaSelectors<Processo>(processoSchema);
const schemaSelectorsJuntada = createSchemaSelectors<Juntada>(juntadaSchema);
const schemaSelectorsDocumento = createSchemaSelectors<Documento>(documentoSchema);

export const getAnexarCopiaState: any = createSelector(
    getAnexarCopiaAppState,
    (state: AnexarCopiaAppState) => state.anexarCopia
);

export const getProcessoId: any = createSelector(
    getAnexarCopiaState,
    (state: AnexarCopiaState) => state.processoId
);

export const getDocumentoId: any = createSelector(
    getAnexarCopiaState,
    (state: AnexarCopiaState) => state.currentStep?.documentoId
);

export const getDocumento: any = createSelector(
    schemaSelectorsDocumento.getNormalizedEntities,
    getDocumentoId,
    schemaSelectorsDocumento.entityProjector
);

export const getProcessoLoaded: any = createSelector(
    getAnexarCopiaState,
    (state: AnexarCopiaState) => state.loaded
);

export const getProcesso: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getProcessoId,
    schemaSelectors.entityProjector
);

export const getJuntadasIds: any = createSelector(
    getAnexarCopiaState,
    (state: AnexarCopiaState) => state.entitiesId
);

export const getJuntadas: any = createSelector(
    schemaSelectorsJuntada.getNormalizedEntities,
    getJuntadasIds,
    schemaSelectorsJuntada.entitiesProjector
);

export const getCurrentJuntadaId: any = createSelector(
    getAnexarCopiaState,
    (state: AnexarCopiaState) => state.currentStep?.step ?? null
);

export const getCurrentJuntada: any = createSelector(
    schemaSelectorsJuntada.getNormalizedEntities,
    getCurrentJuntadaId,
    schemaSelectorsJuntada.entityProjector
);

export const getPagination: any = createSelector(
    getAnexarCopiaState,
    (state: AnexarCopiaState) => state.pagination
);

export const getJuntadasLoaded: any = createSelector(
    getAnexarCopiaState,
    (state: AnexarCopiaState) => state.loadedJuntadas
);

export const getIsLoading: any = createSelector(
    getAnexarCopiaState,
    (state: AnexarCopiaState) => state.loading
);

export const getIsLoadingLatestBinary: any = createSelector(
    getAnexarCopiaState,
    (state: AnexarCopiaState) => state.loadingLatestBinary
);

export const getBinary: any = createSelector(
    getAnexarCopiaState,
    (state: AnexarCopiaState) => state.binary
);

export const getCurrentStep: any = createSelector(
    getAnexarCopiaState,
    (state: AnexarCopiaState) => state.currentStep
);

export const getCurrentStepLoaded: any = createSelector(
    getAnexarCopiaState,
    (state: AnexarCopiaState) => state.currentStepLoaded
);

export const getIsLoadingBinary: any = createSelector(
    getAnexarCopiaState,
    (state: AnexarCopiaState) => state.binary.loading
);
