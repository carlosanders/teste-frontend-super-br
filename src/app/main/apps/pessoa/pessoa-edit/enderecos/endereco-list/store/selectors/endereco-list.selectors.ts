import {createSelector} from '@ngrx/store';
import {EnderecoListAppState, EnderecoListState, getEnderecoListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {endereco as enderecoSchema} from '@cdk/normalizr';
import {Endereco} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Endereco>(enderecoSchema);

export const getEnderecoListState: any = createSelector(
    getEnderecoListAppState,
    (state: EnderecoListAppState) => state.enderecoList
);

export const getEnderecoListIds: any = createSelector(
    getEnderecoListState,
    (state: EnderecoListState) => state.entitiesId
);

export const getEnderecoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getEnderecoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getEnderecoListState,
    (state: EnderecoListState) => state.pagination
);

export const getEnderecoListLoaded: any = createSelector(
    getEnderecoListState,
    (state: EnderecoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getEnderecoListState,
    (state: EnderecoListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getEnderecoListState,
    (state: EnderecoListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getEnderecoListState,
    (state: EnderecoListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getEnderecoListState,
    (state: EnderecoListState) => state.deletingErrors
);
