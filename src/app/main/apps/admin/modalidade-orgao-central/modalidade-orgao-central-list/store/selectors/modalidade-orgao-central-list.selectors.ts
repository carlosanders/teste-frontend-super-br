import {createSelector} from '@ngrx/store';
import {
    getModalidadeOrgaoCentralListAppState,
    ModalidadeOrgaoCentralListAppState,
    ModalidadeOrgaoCentralListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {modalidadeOrgaoCentral as modalidadeOrgaoCentralSchema} from '@cdk/normalizr';
import {ModalidadeOrgaoCentral} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<ModalidadeOrgaoCentral>(modalidadeOrgaoCentralSchema);

export const getModalidadeOrgaoCentralListState = createSelector(
    getModalidadeOrgaoCentralListAppState,
    (state: ModalidadeOrgaoCentralListAppState) => state.modalidadeOrgaoCentralList
);

export const getModalidadeOrgaoCentralListIds = createSelector(
    getModalidadeOrgaoCentralListState,
    (state: ModalidadeOrgaoCentralListState) => state.entitiesId
);

export const getModalidadeOrgaoCentralList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getModalidadeOrgaoCentralListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getModalidadeOrgaoCentralListState,
    (state: ModalidadeOrgaoCentralListState) => state.pagination
);

export const getModalidadeOrgaoCentralListLoaded = createSelector(
    getModalidadeOrgaoCentralListState,
    (state: ModalidadeOrgaoCentralListState) => state.loaded
);

export const getIsLoading = createSelector(
    getModalidadeOrgaoCentralListState,
    (state: ModalidadeOrgaoCentralListState) => state.loading
);

export const getDeletingErrors = createSelector(
    getModalidadeOrgaoCentralListState,
    (state: ModalidadeOrgaoCentralListState) => state.deletingErrors
);
