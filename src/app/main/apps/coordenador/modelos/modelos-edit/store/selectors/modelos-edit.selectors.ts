import {createSelector} from '@ngrx/store';
import {getModeloEditAppState, ModeloEditAppState, ModeloEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ModalidadeOrgaoCentral, Modelo, Setor} from '@cdk/models';
import {modelo as modeloSchema} from '@cdk/normalizr';
import {modalidadeOrgaoCentral as orgaoSchema} from '@cdk/normalizr';
import {setor as setorSchema} from '@cdk/normalizr';
import {CoordenadorAppState, CoordenadorState, getCoordenadorAppState} from '../../../../store/reducers';
import {UnidadesOrgaoCentralAppState, getUnidadesOrgaoCentralAppState, UnidadesOrgaoCentralState} from '../../../../unidades/store/reducers';
import {CoordenadorSetorAppState, getCoordenadorSetorAppState, CoordenadorSetorState} from '../../../../setor/store/reducers';

const schemaModeloSelectors = createSchemaSelectors<Modelo>(modeloSchema);
const schemaOrgaoSelectors = createSchemaSelectors<ModalidadeOrgaoCentral>(orgaoSchema);
const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getModeloEditState = createSelector(
    getModeloEditAppState,
    (state: ModeloEditAppState) => state.modelo
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

export const getModeloId = createSelector(
    getModeloEditState,
    (state: ModeloEditState) => state.loaded ? state.loaded.value : null
);

export const getSetorId = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded && state.setorId ? state.setorId : null
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

export const getOrgaoCentralId = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded && state.orgaoId ? state.orgaoId : null
);

export const getModelo = createSelector(
    schemaModeloSelectors.getNormalizedEntities,
    getModeloId,
    schemaModeloSelectors.entityProjector
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
    getModeloEditState,
    (state: ModeloEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getModeloEditState,
    (state: ModeloEditState) => state.loaded
);

export const getHasLoadedEntidade = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded
);

export const getErrors = createSelector(
    getModeloEditState,
    (state: ModeloEditState) => state.errors
);
