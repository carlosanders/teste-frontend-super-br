import {createSelector} from '@ngrx/store';
import {getModeloEditAppState, ModeloEditAppState, ModeloEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ModalidadeOrgaoCentral, Modelo, Setor} from '@cdk/models';
import {modalidadeOrgaoCentral as orgaoSchema, modelo as modeloSchema, setor as setorSchema} from '@cdk/normalizr';
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

const schemaModeloSelectors = createSchemaSelectors<Modelo>(modeloSchema);
const schemaOrgaoSelectors = createSchemaSelectors<ModalidadeOrgaoCentral>(orgaoSchema);
const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getModeloEditState: any = createSelector(
    getModeloEditAppState,
    (state: ModeloEditAppState) => state.modelo
);

export const getCoordenadorState: any = createSelector(
    getCoordenadorAppState,
    (state: CoordenadorAppState) => state.coordenador
);

export const getCoordenadorSetorState: any = createSelector(
    getCoordenadorSetorAppState,
    (state: CoordenadorSetorAppState) => state.setor
);

export const getUnidadesOrgaoCentralState: any = createSelector(
    getUnidadesOrgaoCentralAppState,
    (state: UnidadesOrgaoCentralAppState) => state.unidades
);

export const getModeloId: any = createSelector(
    getModeloEditState,
    (state: ModeloEditState) => state.loaded ? state.loaded.value : null
);

export const getSetorId: any = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded && state.setorId ? state.setorId : null
);

export const getUnidadeId: any = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded && state.unidadeId ? state.unidadeId : null
);

export const getUnidadeHandleId: any = createSelector(
    getUnidadesOrgaoCentralState,
    (state: UnidadesOrgaoCentralState) => state.loadedUnidade ? state.loadedUnidade.value : null
);

export const getSetorHandleId: any = createSelector(
    getCoordenadorSetorState,
    (state: CoordenadorSetorState) => state.loaded ? state.loaded.value : null
);

export const getModalidadeOrgaoCentralId: any = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded && state.orgaoId ? state.orgaoId : null
);

export const getModelo: any = createSelector(
    schemaModeloSelectors.getNormalizedEntities,
    getModeloId,
    schemaModeloSelectors.entityProjector
);

export const getModalidadeOrgaoCentral: any = createSelector(
    schemaOrgaoSelectors.getNormalizedEntities,
    getModalidadeOrgaoCentralId,
    schemaOrgaoSelectors.entityProjector
);

export const getSetor: any = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);

export const getUnidade: any = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getUnidadeId,
    schemaSetorSelectors.entityProjector
);

export const getUnidadeHandle: any = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getUnidadeHandleId,
    schemaSetorSelectors.entityProjector
);

export const getSetorHandle: any = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorHandleId,
    schemaSetorSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getModeloEditState,
    (state: ModeloEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getModeloEditState,
    (state: ModeloEditState) => state.loaded
);

export const getHasLoadedEntidade: any = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded
);

export const getErrors: any = createSelector(
    getModeloEditState,
    (state: ModeloEditState) => state.errors
);
