import {createSelector} from '@ngrx/store';
import {EtiquetaEditAppState, EtiquetaEditState, getEtiquetaEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ModalidadeOrgaoCentral, Setor} from '@cdk/models';
import {modalidadeOrgaoCentral as orgaoSchema, setor as setorSchema} from '@cdk/normalizr';
import {
    getModalidadeOrgaoCentralId,
    getSetorHandleId,
    getSetorId,
    getUnidadeHandleId,
    getUnidadeId
} from '../../../../../modelos/modelos-edit/store';

const schemaOrgaoSelectors = createSchemaSelectors<ModalidadeOrgaoCentral>(orgaoSchema);
const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getEtiquetaEditState: any = createSelector(
    getEtiquetaEditAppState,
    (state: EtiquetaEditAppState) => state.etiqueta
);

export const getIsSaving: any = createSelector(
    getEtiquetaEditState,
    (state: EtiquetaEditState) => state.saving
);

export const getErrors: any = createSelector(
    getEtiquetaEditState,
    (state: EtiquetaEditState) => state.errors
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
