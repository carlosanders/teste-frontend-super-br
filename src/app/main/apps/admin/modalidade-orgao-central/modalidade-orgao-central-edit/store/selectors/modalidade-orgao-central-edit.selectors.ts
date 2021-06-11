import {createSelector} from '@ngrx/store';
import {
    getModalidadeOrgaoCentralEditAppState,
    ModalidadeOrgaoCentralEditAppState,
    ModalidadeOrgaoCentralEditState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ModalidadeOrgaoCentral} from '@cdk/models';
import {modalidadeOrgaoCentral as modalidadeOrgaoCentralSchema} from '@cdk/normalizr';

const schemaModalidadeOrgaoCentralSelectors = createSchemaSelectors<ModalidadeOrgaoCentral>(modalidadeOrgaoCentralSchema);

export const getModalidadeOrgaoCentralEditState = createSelector(
    getModalidadeOrgaoCentralEditAppState,
    (state: ModalidadeOrgaoCentralEditAppState) => state.modalidadeOrgaoCentral
);

export const getModalidadeOrgaoCentralId = createSelector(
    getModalidadeOrgaoCentralEditState,
    (state: ModalidadeOrgaoCentralEditState) => state.entityId
);

export const getModalidadeOrgaoCentral = createSelector(
    schemaModalidadeOrgaoCentralSelectors.getNormalizedEntities,
    getModalidadeOrgaoCentralId,
    schemaModalidadeOrgaoCentralSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getModalidadeOrgaoCentralEditState,
    (state: ModalidadeOrgaoCentralEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getModalidadeOrgaoCentralEditState,
    (state: ModalidadeOrgaoCentralEditState) => state.loaded
);

export const getErrors = createSelector(
    getModalidadeOrgaoCentralEditState,
    (state: ModalidadeOrgaoCentralEditState) => state.errors
);
