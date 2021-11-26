import {createSelector} from '@ngrx/store';
import {CoordenadorSetorAppState, CoordenadorSetorState, getCoordenadorSetorAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models';
import {setor as setorSchema} from '@cdk/normalizr';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getCoordenadorSetorState: any = createSelector(
    getCoordenadorSetorAppState,
    (state: CoordenadorSetorAppState) => state.setor
);

export const getSetorId: any = createSelector(
    getCoordenadorSetorState,
    (state: CoordenadorSetorState) => state.loaded ? state.loaded.value : null
);

export const getSetor: any = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);

export const getUnidadeId: any = createSelector(
    getCoordenadorSetorState,
    (state: CoordenadorSetorState) => state.loadedUnidade ? state.loadedUnidade.value : null
);

export const getUnidade: any = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getUnidadeId,
    schemaSetorSelectors.entityProjector
);

export const getHasLoaded: any = createSelector(
    getCoordenadorSetorState,
    (state: CoordenadorSetorState) => state.loaded
);

export const getHasLoadedUnidade: any = createSelector(
    getCoordenadorSetorState,
    (state: CoordenadorSetorState) => state.loadedUnidade
);

export const getErrors: any = createSelector(
    getCoordenadorSetorState,
    (state: CoordenadorSetorState) => state.errors
);
