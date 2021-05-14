import {createSelector} from '@ngrx/store';
import {getAvisoEditAppState, AvisoEditAppState, AvisoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Aviso, ModalidadeOrgaoCentral, Setor} from '@cdk/models';
import {aviso as avisoSchema, modalidadeOrgaoCentral as orgaoSchema, setor as setorSchema} from '@cdk/normalizr';
import { getUnidadesOrgaoCentralAppState,UnidadesOrgaoCentralAppState,UnidadesOrgaoCentralState} from "../../../../../coordenador/unidades/store";
import {CoordenadorAppState, CoordenadorState, getCoordenadorAppState} from "../../../../../coordenador/store";
import {CoordenadorSetorAppState,CoordenadorSetorState,getCoordenadorSetorAppState} from '../../../../../coordenador/setor/store';

const schemaAvisoSelectors = createSchemaSelectors<Aviso>(avisoSchema);
const schemaOrgaoSelectors = createSchemaSelectors<ModalidadeOrgaoCentral>(orgaoSchema);
const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getAvisoEditState = createSelector(
    getAvisoEditAppState,
    (state: AvisoEditAppState) => state.aviso
);

export const getUnidadesOrgaoCentralState = createSelector(
    getUnidadesOrgaoCentralAppState,
    (state: UnidadesOrgaoCentralAppState) => state.unidades
);

export const getAvisoId = createSelector(
    getAvisoEditState,
    (state: AvisoEditState) => state.entityId
);

export const getCoordenadorState = createSelector(
    getCoordenadorAppState,
    (state: CoordenadorAppState) => state.coordenador
);

export const getCoordenadorSetorState = createSelector(
    getCoordenadorSetorAppState,
    (state: CoordenadorSetorAppState) => state.setor
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

export const getModalidadeOrgaoCentralId = createSelector(
    getCoordenadorState,
    (state: CoordenadorState) => state.loaded && state.orgaoId ? state.orgaoId : null
);

export const getAviso = createSelector(
    schemaAvisoSelectors.getNormalizedEntities,
    getAvisoId,
    schemaAvisoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getAvisoEditState,
    (state: AvisoEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getAvisoEditState,
    (state: AvisoEditState) => state.loaded
);

export const getErrors = createSelector(
    getAvisoEditState,
    (state: AvisoEditState) => state.errors
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

