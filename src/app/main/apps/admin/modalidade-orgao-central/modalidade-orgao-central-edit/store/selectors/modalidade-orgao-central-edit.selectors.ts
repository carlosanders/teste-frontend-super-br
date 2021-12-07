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

export const getModalidadeOrgaoCentralEditState: any = createSelector(
    getModalidadeOrgaoCentralEditAppState,
    (state: ModalidadeOrgaoCentralEditAppState) => state.modalidadeOrgaoCentral
);

export const getModalidadeOrgaoCentralId: any = createSelector(
    getModalidadeOrgaoCentralEditState,
    (state: ModalidadeOrgaoCentralEditState) => state.entityId
);

export const getModalidadeOrgaoCentral: any = createSelector(
    schemaModalidadeOrgaoCentralSelectors.getNormalizedEntities,
    getModalidadeOrgaoCentralId,
    schemaModalidadeOrgaoCentralSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getModalidadeOrgaoCentralEditState,
    (state: ModalidadeOrgaoCentralEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getModalidadeOrgaoCentralEditState,
    (state: ModalidadeOrgaoCentralEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getModalidadeOrgaoCentralEditState,
    (state: ModalidadeOrgaoCentralEditState) => state.errors
);
