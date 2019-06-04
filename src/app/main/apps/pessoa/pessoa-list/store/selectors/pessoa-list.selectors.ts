import {createSelector} from '@ngrx/store';
import {
    getPessoaListAppState,
    PessoaListAppState,
    PessoaListState
} from 'app/main/apps/pessoa/pessoa-list/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {pessoa as pessoaSchema} from '@cdk/normalizr/pessoa.schema';
import {Pessoa} from '@cdk/models/pessoa.model';

const schemaSelectors = createSchemaSelectors<Pessoa>(pessoaSchema);

export const getPessoaListState = createSelector(
    getPessoaListAppState,
    (state: PessoaListAppState) => state.pessoaList
);

export const getPessoaListIds = createSelector(
    getPessoaListState,
    (state: PessoaListState) => state.entitiesId
);

export const getPessoaList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getPessoaListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getPessoaListState,
    (state: PessoaListState) => state.pagination
);

export const getPessoaListLoaded = createSelector(
    getPessoaListState,
    (state: PessoaListState) => state.loaded
);

export const getIsLoading = createSelector(
    getPessoaListState,
    (state: PessoaListState) => state.loading
);

export const getDeletingIds = createSelector(
    getPessoaListState,
    (state: PessoaListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getPessoaListState,
    (state: PessoaListState) => state.deletedIds
);
