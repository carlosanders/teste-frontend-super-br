import {createSelector} from '@ngrx/store';
import {getCoordenadorAppState, CoordenadorAppState, CoordenadorState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models';
import {setor as setorSchema} from '@cdk/normalizr/setor.schema';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getCoordenadorState = createSelector(
    getCoordenadorAppState,
    (state: CoordenadorAppState) => state.coordenador
);

export const getUnidadeId = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded ? state.loaded.value : null
);

export const getUnidade = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getUnidadeId,
    schemaSetorSelectors.entityProjector
);

export const getHasLoaded = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded
);

export const getErrors = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.errors
);
