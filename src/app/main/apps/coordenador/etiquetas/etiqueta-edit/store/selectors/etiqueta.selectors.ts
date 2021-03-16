import {createSelector} from '@ngrx/store';
import {getEtiquetaAppState, EtiquetaAppState, EtiquetaState} from '../reducers';
import {Etiqueta, ModalidadeOrgaoCentral, Setor} from '@cdk/models';
import {etiqueta as etiquetaSchema, modalidadeOrgaoCentral as orgaoSchema, setor as setorSchema} from '@cdk/normalizr';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {
    getModalidadeOrgaoCentralId,
    getSetorHandleId,
    getSetorId,
    getUnidadeHandleId,
    getUnidadeId
} from '../../../../modelos/modelos-edit/store/selectors';

const schemaEtiquetaSelectors = createSchemaSelectors<Etiqueta>(etiquetaSchema);
const schemaOrgaoSelectors = createSchemaSelectors<ModalidadeOrgaoCentral>(orgaoSchema);
const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);


export const getEtiquetaState = createSelector(
    getEtiquetaAppState,
    (state: EtiquetaAppState) => state.etiqueta
);

export const getEtiquetaId = createSelector(
    getEtiquetaState,
    (state: EtiquetaState) => state.loaded && state.loaded.value !== 'criar' ? state.loaded.value : null
);

export const getEtiqueta = createSelector(
    schemaEtiquetaSelectors.getNormalizedEntities,
    getEtiquetaId,
    schemaEtiquetaSelectors.entityProjector
);

export const getEtiquetaLoaded = createSelector(
    getEtiquetaState,
    (state: EtiquetaState) => state.loaded
);

export const getEtiquetaIsLoading = createSelector(
    getEtiquetaState,
    (state: EtiquetaState) => state.loading
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

