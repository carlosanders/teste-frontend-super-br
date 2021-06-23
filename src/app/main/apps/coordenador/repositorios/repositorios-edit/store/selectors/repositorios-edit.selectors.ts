import {createSelector} from '@ngrx/store';
import {getRepositorioEditAppState, RepositorioEditAppState, RepositorioEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {
    modalidadeOrgaoCentral as orgaoSchema,
    repositorio as repositorioSchema,
    setor as setorSchema
} from '@cdk/normalizr';
import {ModalidadeOrgaoCentral, Repositorio, Setor} from '@cdk/models';
import {CoordenadorAppState, CoordenadorState, getCoordenadorAppState} from '../../../../store/reducers';
import {
    getUnidadesOrgaoCentralAppState,
    UnidadesOrgaoCentralAppState,
    UnidadesOrgaoCentralState
} from '../../../../unidades/store/reducers';
import {
    CoordenadorSetorAppState,
    CoordenadorSetorState,
    getCoordenadorSetorAppState
} from '../../../../setor/store/reducers';


const schemaRepositorioSelectors = createSchemaSelectors<Repositorio>(repositorioSchema);
const schemaOrgaoSelectors = createSchemaSelectors<ModalidadeOrgaoCentral>(orgaoSchema);
const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getRepositorioEditState = createSelector(
    getRepositorioEditAppState,
    (state: RepositorioEditAppState) => state.repositorio
);

export const getCoordenadorState = createSelector(
    getCoordenadorAppState,
    (state: CoordenadorAppState) => state.coordenador
);

export const getCoordenadorSetorState = createSelector(
    getCoordenadorSetorAppState,
    (state: CoordenadorSetorAppState) => state.setor
);

export const getUnidadesOrgaoCentralState = createSelector(
    getUnidadesOrgaoCentralAppState,
    (state: UnidadesOrgaoCentralAppState) => state.unidades
);

export const getRepositorioId = createSelector(
    getRepositorioEditState,
    (state: RepositorioEditState) => state.loaded ? state.loaded.value : null
);

export const getSetorId = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded && state.setorId ? state.setorId : null
);

export const getModalidadeOrgaoCentralId = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded && state.orgaoId ? state.orgaoId : null
);

export const getUnidadeId = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded && state.unidadeId ? state.unidadeId : null
);

export const getUnidadeHandleId = createSelector(
    getUnidadesOrgaoCentralState,
    (state: UnidadesOrgaoCentralState) => state.loadedUnidade ? state.loadedUnidade.value : null
);

export const getSetorHandleId = createSelector(
    getCoordenadorSetorState,
    (state: CoordenadorSetorState) => state.loaded ? state.loaded.value : null
);

export const getRepositorio = createSelector(
    schemaRepositorioSelectors.getNormalizedEntities,
    getRepositorioId,
    schemaRepositorioSelectors.entityProjector
);

export const getModalidadeOrgaoCentral = createSelector(
    schemaOrgaoSelectors.getNormalizedEntities,
    getModalidadeOrgaoCentralId,
    schemaOrgaoSelectors.entityProjector
);

export const getSetor = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);

export const getUnidade = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getUnidadeId,
    schemaSetorSelectors.entityProjector
);

export const getUnidadeHandle = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getUnidadeHandleId,
    schemaSetorSelectors.entityProjector
);

export const getSetorHandle = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorHandleId,
    schemaSetorSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getRepositorioEditState,
    (state: RepositorioEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getRepositorioEditState,
    (state: RepositorioEditState) => state.loaded
);

export const getHasLoadedEntidade = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded
);

export const getErrors = createSelector(
    getRepositorioEditState,
    (state: RepositorioEditState) => state.errors
);
