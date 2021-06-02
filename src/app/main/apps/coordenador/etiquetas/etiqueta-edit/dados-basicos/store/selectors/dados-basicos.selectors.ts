import {createSelector} from '@ngrx/store';
import {getEtiquetaEditAppState, EtiquetaEditAppState, EtiquetaEditState} from '../reducers';
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

export const getEtiquetaEditState = createSelector(
    getEtiquetaEditAppState,
    (state: EtiquetaEditAppState) => state.etiqueta
);

export const getIsSaving = createSelector(
    getEtiquetaEditState,
    (state: EtiquetaEditState) => state.saving
);

export const getErrors = createSelector(
    getEtiquetaEditState,
    (state: EtiquetaEditState) => state.errors
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
