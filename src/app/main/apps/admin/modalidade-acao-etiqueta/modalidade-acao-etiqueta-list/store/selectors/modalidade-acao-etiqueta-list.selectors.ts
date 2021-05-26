import {createSelector} from '@ngrx/store';
import {
    getModalidadeAcaoEtiquetaListAppState,
    ModalidadeAcaoEtiquetaListAppState,
    ModalidadeAcaoEtiquetaListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {modalidadeAcaoEtiqueta as modalidadeAcaoEtiquetaSchema} from '@cdk/normalizr';
import {ModalidadeAcaoEtiqueta} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<ModalidadeAcaoEtiqueta>(modalidadeAcaoEtiquetaSchema);

export const getModalidadeAcaoEtiquetaListState = createSelector(
    getModalidadeAcaoEtiquetaListAppState,
    (state: ModalidadeAcaoEtiquetaListAppState) => state.modalidadeAcaoEtiquetaList
);

export const getModalidadeAcaoEtiquetaListIds = createSelector(
    getModalidadeAcaoEtiquetaListState,
    (state: ModalidadeAcaoEtiquetaListState) => state.entitiesId
);

export const getModalidadeAcaoEtiquetaList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getModalidadeAcaoEtiquetaListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getModalidadeAcaoEtiquetaListState,
    (state: ModalidadeAcaoEtiquetaListState) => state.pagination
);

export const getModalidadeAcaoEtiquetaListLoaded = createSelector(
    getModalidadeAcaoEtiquetaListState,
    (state: ModalidadeAcaoEtiquetaListState) => state.loaded
);

export const getIsLoading = createSelector(
    getModalidadeAcaoEtiquetaListState,
    (state: ModalidadeAcaoEtiquetaListState) => state.loading
);

export const getDeletingIds = createSelector(
    getModalidadeAcaoEtiquetaListState,
    (state: ModalidadeAcaoEtiquetaListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getModalidadeAcaoEtiquetaListState,
    (state: ModalidadeAcaoEtiquetaListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getModalidadeAcaoEtiquetaListState,
    (state: ModalidadeAcaoEtiquetaListState) => state.deletingErrors
);
