import {createSelector} from '@ngrx/store';
import {CoordenadorAppState, CoordenadorState, getCoordenadorAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models';
import {modalidadeOrgaoCentral as orgaoCentralSchema, setor as setorSchema} from '@cdk/normalizr';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);
const schemaOrgaoCentralSelectors = createSchemaSelectors<Setor>(orgaoCentralSchema);

export const getCoordenadorState: any = createSelector(
    getCoordenadorAppState,
    (state: CoordenadorAppState) => state.coordenador
);

export const getSetorId: any = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded ? state.setorId : null
);

export const getSetor: any = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);

export const getUnidadeId: any = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded ? state.unidadeId : null
);

export const getUnidade: any = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getUnidadeId,
    schemaSetorSelectors.entityProjector
);

export const getOrgaoCentralId: any = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded ? state.orgaoId : null
);

export const getOrgaoCentral: any = createSelector(
    schemaOrgaoCentralSelectors.getNormalizedEntities,
    getOrgaoCentralId,
    schemaOrgaoCentralSelectors.entityProjector
);

export const getHasLoaded: any = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded
);

export const getErrors: any = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.errors
);
