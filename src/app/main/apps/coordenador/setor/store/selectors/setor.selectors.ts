import {createSelector} from '@ngrx/store';
import {getCoordenadorSetorAppState, CoordenadorSetorAppState, CoordenadorSetorState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models';
import {setor as setorSchema} from '@cdk/normalizr/setor.schema';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getCoordenadorSetorState = createSelector(
    getCoordenadorSetorAppState,
    (state: CoordenadorSetorAppState) => state.setor
);

export const getSetorId = createSelector(
    getCoordenadorSetorState,
    (state: CoordenadorSetorState) => state.loaded ? state.loaded.value : null
);

export const getSetor = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);

export const getUnidadeId = createSelector(
    getCoordenadorSetorState,
    (state: CoordenadorSetorState) => state.loadedUnidade ? state.loadedUnidade.value : null
);

export const getUnidade = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getUnidadeId,
    schemaSetorSelectors.entityProjector
);

export const getHasLoaded = createSelector(
    getCoordenadorSetorState,
    (state: CoordenadorSetorState) => state.loaded
);

export const getHasLoadedUnidade = createSelector(
    getCoordenadorSetorState,
    (state: CoordenadorSetorState) => state.loadedUnidade
);

export const getErrors = createSelector(
    getCoordenadorSetorState,
    (state: CoordenadorSetorState) => state.errors
);