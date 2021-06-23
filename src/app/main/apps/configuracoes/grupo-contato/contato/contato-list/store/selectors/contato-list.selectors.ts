import {createSelector} from '@ngrx/store';
import {ContatoListAppState, ContatoListState, getContatoListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {contato as contatoSchema} from '@cdk/normalizr';
import {Contato} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Contato>(contatoSchema);

export const getContatoListState = createSelector(
    getContatoListAppState,
    (state: ContatoListAppState) => state.contatoList
);

export const getContatoListIds = createSelector(
    getContatoListState,
    (state: ContatoListState) => state.entitiesId
);

export const getContatoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getContatoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getContatoListState,
    (state: ContatoListState) => state.pagination
);

export const getContatoListLoaded = createSelector(
    getContatoListState,
    (state: ContatoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getContatoListState,
    (state: ContatoListState) => state.loading
);

export const getDeletingIds = createSelector(
    getContatoListState,
    (state: ContatoListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getContatoListState,
    (state: ContatoListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getContatoListState,
    (state: ContatoListState) => state.deletingErrors
);
