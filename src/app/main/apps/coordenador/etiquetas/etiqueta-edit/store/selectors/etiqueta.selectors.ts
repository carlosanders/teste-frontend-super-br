import {createSelector} from '@ngrx/store';
import {EtiquetaAppState, EtiquetaState, getEtiquetaAppState} from '../reducers';
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


export const getEtiquetaState: any = createSelector(
    getEtiquetaAppState,
    (state: EtiquetaAppState) => state.etiqueta
);

export const getEtiquetaId: any = createSelector(
    getEtiquetaState,
    (state: EtiquetaState) => state.loaded && state.loaded.value !== 'criar' ? state.loaded.value : null
);

export const getEtiqueta: any = createSelector(
    schemaEtiquetaSelectors.getNormalizedEntities,
    getEtiquetaId,
    schemaEtiquetaSelectors.entityProjector
);

export const getEtiquetaLoaded: any = createSelector(
    getEtiquetaState,
    (state: EtiquetaState) => state.loaded
);

export const getEtiquetaIsLoading: any = createSelector(
    getEtiquetaState,
    (state: EtiquetaState) => state.loading
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

