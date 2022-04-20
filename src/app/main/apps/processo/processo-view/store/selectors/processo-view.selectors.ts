import {createSelector, MemoizedSelector} from '@ngrx/store';
import {
    getProcessoViewAppState,
    ProcessoViewAppState,
    ProcessoViewState
} from 'app/main/apps/processo/processo-view/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {documento as documentoSchema, juntada as juntadaSchema} from '@cdk/normalizr';
import {Documento, Juntada} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Juntada>(juntadaSchema);
const schemaSelectorsDocumento = createSchemaSelectors<Documento>(documentoSchema);

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

export const getLoadingVinculacoesDocumentosIds: any = createSelector(
    getProcessoViewState,
    (state: ProcessoViewState) => state.loadingVinculacoesDocumentosId
);

export const getPaginadores: any = createSelector(
    getProcessoViewState,
    (state: ProcessoViewState) => state.paginadoresDocumentosVinculados
);

export const getPaginadoresComponentesDigitais: any = createSelector(
    getProcessoViewState,
    (state: ProcessoViewState) => state.paginadoresComponentes
);

export const getPaginadoresStateByDocumentoId = (documentoId: number): MemoizedSelector<any, any> => createSelector(
    getPaginadores,
    paginadores => paginadores[documentoId]
);

export const getPaginadoresComponentesStateByJuntadaId = (juntadaId: number): MemoizedSelector<any, any> => createSelector(
    getPaginadoresComponentesDigitais,
    paginadores => paginadores[juntadaId]
);

export const getDocumentoById = (documentoId: number): any => createSelector(
    schemaSelectorsDocumento.getNormalizedEntities,
    (() => documentoId),
    schemaSelectorsDocumento.entityProjector
);

export const getComponentesDigitaisByDocumentoId = (documentoId: number): any => createSelector(
    getDocumentoById(documentoId),
    ((documento: Documento) => documento?.componentesDigitais)
);

export const getLoadingComponentesDigitaisIds: any = createSelector(
    getProcessoViewState,
    (state: ProcessoViewState) => state.loadingComponentesId
);

export const getProcessoId: any = createSelector(
    getProcessoViewState,
    (state: ProcessoViewState) => state.processoId
);
