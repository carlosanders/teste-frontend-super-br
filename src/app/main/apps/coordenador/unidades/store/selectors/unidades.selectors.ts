import {createSelector} from '@ngrx/store';
import {getUnidadesOrgaoCentralAppState, UnidadesOrgaoCentralAppState, UnidadesOrgaoCentralState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models';
import {modalidadeOrgaoCentral as orgaoCentralSchema, setor as setorSchema} from '@cdk/normalizr';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);
const schemaOrgaoCentralSelectors = createSchemaSelectors<Setor>(orgaoCentralSchema);

export const getUnidadesOrgaoCentralState: any = createSelector(
    getUnidadesOrgaoCentralAppState,
    (state: UnidadesOrgaoCentralAppState) => state.unidades
);

export const getUnidadeId: any = createSelector(
    getUnidadesOrgaoCentralState,
    (state: UnidadesOrgaoCentralState) => state.loadedUnidade ? state.loadedUnidade.value : null
);

export const getUnidade: any = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getUnidadeId,
    schemaSetorSelectors.entityProjector
);

export const getOrgaoCentralId: any = createSelector(
    getUnidadesOrgaoCentralState,
    (state: UnidadesOrgaoCentralState) => state.loaded ? state.loaded.value : null
);

export const getOrgaoCentral: any = createSelector(
    schemaOrgaoCentralSelectors.getNormalizedEntities,
    getOrgaoCentralId,
    schemaOrgaoCentralSelectors.entityProjector
);

export const getHasLoaded: any = createSelector(
    getUnidadesOrgaoCentralState,
    (state: UnidadesOrgaoCentralState) => state.loaded
);

export const getHasLoadedUnidade: any = createSelector(
    getUnidadesOrgaoCentralState,
    (state: UnidadesOrgaoCentralState) => state.loadedUnidade
);

export const getErrors: any = createSelector(
    getUnidadesOrgaoCentralState,
    (state: UnidadesOrgaoCentralState) => state.errors
);
