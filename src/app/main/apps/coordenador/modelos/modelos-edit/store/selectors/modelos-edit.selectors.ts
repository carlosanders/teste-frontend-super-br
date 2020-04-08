import {createSelector} from '@ngrx/store';
import {getModeloEditAppState, ModeloEditAppState, ModeloEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ModalidadeOrgaoCentral, Modelo, Setor} from '@cdk/models';
import {modelo as modeloSchema} from '@cdk/normalizr/modelo.schema';
import {modalidadeOrgaoCentral as orgaoSchema} from '@cdk/normalizr/modalidade-orgao-central.schema';
import {setor as setorSchema} from '@cdk/normalizr/setor.schema';
import {CoordenadorAppState, CoordenadorState, getCoordenadorAppState} from '../../../../store/reducers';

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

export const getModeloId = createSelector(
    getModeloEditState,
    (state: ModeloEditState) => state.loaded ? state.loaded.value : null
);

export const getSetorId = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded && state.setorId ? state.setorId : null
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
