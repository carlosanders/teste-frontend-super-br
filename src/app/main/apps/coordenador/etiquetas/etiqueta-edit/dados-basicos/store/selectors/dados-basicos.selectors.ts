import {createSelector} from '@ngrx/store';
import {getCoordenadorEtiquetaEditAppState, CoordenadorEtiquetaEditAppState, EtiquetaEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Etiqueta, ModalidadeOrgaoCentral, Setor} from '@cdk/models';
import {etiqueta as etiquetaSchema, modalidadeOrgaoCentral as orgaoSchema, setor as setorSchema} from '@cdk/normalizr';
import {CoordenadorAppState, CoordenadorState, getCoordenadorAppState} from '../../../../../store/reducers';
import {
    CoordenadorSetorAppState,
    CoordenadorSetorState,
    getCoordenadorSetorAppState
} from '../../../../../setor/store/reducers';
import {
    getUnidadesOrgaoCentralAppState,
    UnidadesOrgaoCentralAppState,
    UnidadesOrgaoCentralState
} from '../../../../../unidades/store/reducers';

const schemaEtiquetaSelectors = createSchemaSelectors<Etiqueta>(etiquetaSchema);
const schemaOrgaoSelectors = createSchemaSelectors<ModalidadeOrgaoCentral>(orgaoSchema);
const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getEtiquetaEditState = createSelector(
    getCoordenadorEtiquetaEditAppState,
    (state: CoordenadorEtiquetaEditAppState) => state.etiqueta
);

export const getEtiquetaId = createSelector(
    getEtiquetaEditState,
    (state: EtiquetaEditState) => state.loaded ? state.loaded.value : null
);

export const getEtiqueta = createSelector(
    schemaEtiquetaSelectors.getNormalizedEntities,
    getEtiquetaId,
    schemaEtiquetaSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getEtiquetaEditState,
    (state: EtiquetaEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getEtiquetaEditState,
    (state: EtiquetaEditState) => state.loaded
);

export const getErrors = createSelector(
    getEtiquetaEditState,
    (state: EtiquetaEditState) => state.errors
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

export const getHasLoadedEntidade = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded
);
