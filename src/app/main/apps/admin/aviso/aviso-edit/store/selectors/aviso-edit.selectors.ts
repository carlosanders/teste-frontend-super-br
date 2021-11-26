import {createSelector} from '@ngrx/store';
import {AvisoEditAppState, AvisoEditState, getAvisoEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Aviso, ModalidadeOrgaoCentral, Setor} from '@cdk/models';
import {aviso as avisoSchema, modalidadeOrgaoCentral as orgaoSchema, setor as setorSchema} from '@cdk/normalizr';
import {
    getUnidadesOrgaoCentralAppState,
    UnidadesOrgaoCentralAppState,
    UnidadesOrgaoCentralState
} from '../../../../../coordenador/unidades/store';
import {CoordenadorAppState, CoordenadorState, getCoordenadorAppState} from '../../../../../coordenador/store';
import {
    CoordenadorSetorAppState,
    CoordenadorSetorState,
    getCoordenadorSetorAppState
} from '../../../../../coordenador/setor/store';

const schemaAvisoSelectors = createSchemaSelectors<Aviso>(avisoSchema);
const schemaOrgaoSelectors = createSchemaSelectors<ModalidadeOrgaoCentral>(orgaoSchema);
const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getAvisoEditState: any = createSelector(
    getAvisoEditAppState,
    (state: AvisoEditAppState) => state.aviso
);

export const getUnidadesOrgaoCentralState: any = createSelector(
    getUnidadesOrgaoCentralAppState,
    (state: UnidadesOrgaoCentralAppState) => state.unidades
);

export const getAvisoId: any = createSelector(
    getAvisoEditState,
    (state: AvisoEditState) => state.entityId
);

export const getCoordenadorState: any = createSelector(
    getCoordenadorAppState,
    (state: CoordenadorAppState) => state.coordenador
);

export const getCoordenadorSetorState: any = createSelector(
    getCoordenadorSetorAppState,
    (state: CoordenadorSetorAppState) => state.setor
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

export const getAviso: any = createSelector(
    schemaAvisoSelectors.getNormalizedEntities,
    getAvisoId,
    schemaAvisoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getAvisoEditState,
    (state: AvisoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getAvisoEditState,
    (state: AvisoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getAvisoEditState,
    (state: AvisoEditState) => state.errors
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

