import {createSelector} from '@ngrx/store';
import {
    getEnderecoListAppState,
    EnderecoListAppState,
    EnderecoListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {endereco as enderecoSchema} from '@cdk/normalizr';
import {Endereco} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Endereco>(enderecoSchema);

export const getEnderecoListState = createSelector(
    getEnderecoListAppState,
    (state: EnderecoListAppState) => state.enderecoList
);

export const getEnderecoListIds = createSelector(
    getEnderecoListState,
    (state: EnderecoListState) => state.entitiesId
);

export const getEnderecoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getEnderecoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getEnderecoListState,
    (state: EnderecoListState) => state.pagination
);

export const getEnderecoListLoaded = createSelector(
    getEnderecoListState,
    (state: EnderecoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getEnderecoListState,
    (state: EnderecoListState) => state.loading
);

export const getDeletingIds = createSelector(
    getEnderecoListState,
    (state: EnderecoListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getEnderecoListState,
    (state: EnderecoListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getEnderecoListState,
    (state: EnderecoListState) => state.deletingErrors
);
