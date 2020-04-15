import {createSelector} from '@ngrx/store';
import {getRepositorioEditAppState, RepositorioEditAppState, RepositorioEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {repositorio as repositorioSchema} from '@cdk/normalizr/repositorio.schema';
import {modalidadeOrgaoCentral as orgaoSchema} from '@cdk/normalizr/modalidade-orgao-central.schema';
import {setor as setorSchema} from '@cdk/normalizr/setor.schema';
import {ModalidadeOrgaoCentral, Repositorio, Setor} from '@cdk/models';
import {CoordenadorAppState, CoordenadorState, getCoordenadorAppState} from '../../../../store/reducers';

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

export const getRepositorioId = createSelector(
    getRepositorioEditState,
    (state: RepositorioEditState) => state.loaded ? state.loaded.value : null
);

export const getSetorId = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded && state.setorId ? state.setorId : null
);

export const getOrgaoCentralId = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded && state.orgaoId ? state.orgaoId : null
);

export const getRepositorio = createSelector(
    schemaRepositorioSelectors.getNormalizedEntities,
    getRepositorioId,
    schemaRepositorioSelectors.entityProjector
);

export const getOrgaoCentral = createSelector(
    schemaOrgaoSelectors.getNormalizedEntities,
    getOrgaoCentralId,
    schemaOrgaoSelectors.entityProjector
);

export const getSetor = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
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
