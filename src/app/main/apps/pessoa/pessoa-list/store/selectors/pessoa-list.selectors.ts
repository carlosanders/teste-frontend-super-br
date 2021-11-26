import {createSelector} from '@ngrx/store';
import {
    getPessoaListAppState,
    PessoaListAppState,
    PessoaListState
} from 'app/main/apps/pessoa/pessoa-list/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {pessoa as pessoaSchema} from '@cdk/normalizr';
import {Pessoa} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Pessoa>(pessoaSchema);

export const getPessoaListState: any = createSelector(
    getPessoaListAppState,
    (state: PessoaListAppState) => state.pessoaList
);

export const getPessoaListIds: any = createSelector(
    getPessoaListState,
    (state: PessoaListState) => state.entitiesId
);

export const getPessoaList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getPessoaListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getPessoaListState,
    (state: PessoaListState) => state.pagination
);

export const getPessoaListLoaded: any = createSelector(
    getPessoaListState,
    (state: PessoaListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getPessoaListState,
    (state: PessoaListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getPessoaListState,
    (state: PessoaListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getPessoaListState,
    (state: PessoaListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getPessoaListState,
    (state: PessoaListState) => state.deletingErrors
);
