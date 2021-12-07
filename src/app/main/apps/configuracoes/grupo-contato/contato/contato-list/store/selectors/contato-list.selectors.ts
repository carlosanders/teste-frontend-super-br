import {createSelector} from '@ngrx/store';
import {ContatoListAppState, ContatoListState, getContatoListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {contato as contatoSchema} from '@cdk/normalizr';
import {Contato} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Contato>(contatoSchema);

export const getContatoListState: any = createSelector(
    getContatoListAppState,
    (state: ContatoListAppState) => state.contatoList
);

export const getContatoListIds: any = createSelector(
    getContatoListState,
    (state: ContatoListState) => state.entitiesId
);

export const getContatoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getContatoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getContatoListState,
    (state: ContatoListState) => state.pagination
);

export const getContatoListLoaded: any = createSelector(
    getContatoListState,
    (state: ContatoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getContatoListState,
    (state: ContatoListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getContatoListState,
    (state: ContatoListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getContatoListState,
    (state: ContatoListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getContatoListState,
    (state: ContatoListState) => state.deletingErrors
);
