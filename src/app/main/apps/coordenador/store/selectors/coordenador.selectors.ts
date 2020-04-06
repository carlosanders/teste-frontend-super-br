import {createSelector} from '@ngrx/store';
import {getCoordenadorAppState, CoordenadorAppState, CoordenadorState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models';
import {setor as setorSchema} from '@cdk/normalizr/setor.schema';
import {modalidadeOrgaoCentral as orgaoCentralSchema} from '@cdk/normalizr/modalidade-orgao-central.schema';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);
const schemaOrgaoCentralSelectors = createSchemaSelectors<Setor>(orgaoCentralSchema);

export const getCoordenadorState = createSelector(
    getCoordenadorAppState,
    (state: CoordenadorAppState) => state.coordenador
);

export const getSetorId = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded ? state.setorId : null
);

export const getSetor = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);

export const getOrgaoCentralId = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded ? state.orgaoId : null
);

export const getOrgaoCentral = createSelector(
    schemaOrgaoCentralSelectors.getNormalizedEntities,
    getOrgaoCentralId,
    schemaOrgaoCentralSelectors.entityProjector
);

export const getHasLoaded = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded
);

export const getErrors = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.errors
);