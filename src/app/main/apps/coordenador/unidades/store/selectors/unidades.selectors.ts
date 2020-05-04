import {createSelector} from '@ngrx/store';
import {getUnidadesOrgaoCentralAppState, UnidadesOrgaoCentralAppState, UnidadesOrgaoCentralState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models';
import {setor as setorSchema} from '@cdk/normalizr/setor.schema';
import {modalidadeOrgaoCentral as orgaoCentralSchema} from '@cdk/normalizr/modalidade-orgao-central.schema';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);
const schemaOrgaoCentralSelectors = createSchemaSelectors<Setor>(orgaoCentralSchema);

export const getUnidadesOrgaoCentralState = createSelector(
    getUnidadesOrgaoCentralAppState,
    (state: UnidadesOrgaoCentralAppState) => state.unidades
);

export const getSetorId = createSelector(
    getUnidadesOrgaoCentralState,
    (state: UnidadesOrgaoCentralState) => state.loadedUnidade ? state.loaded.value : null
);

export const getSetor = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);

export const getOrgaoCentralId = createSelector(
    getUnidadesOrgaoCentralState,
    (state: UnidadesOrgaoCentralState) => state.loaded ? state.loaded.value : null
);

export const getOrgaoCentral = createSelector(
    schemaOrgaoCentralSelectors.getNormalizedEntities,
    getOrgaoCentralId,
    schemaOrgaoCentralSelectors.entityProjector
);

export const getHasLoaded = createSelector(
    getUnidadesOrgaoCentralState,
    (state: UnidadesOrgaoCentralState) => state.loaded
);

export const getHasLoadedUnidade = createSelector(
    getUnidadesOrgaoCentralState,
    (state: UnidadesOrgaoCentralState) => state.loadedUnidade
);

export const getErrors = createSelector(
    getUnidadesOrgaoCentralState,
    (state: UnidadesOrgaoCentralState) => state.errors
);