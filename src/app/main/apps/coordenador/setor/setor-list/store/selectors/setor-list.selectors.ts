import {createSelector} from '@ngrx/store';
import {getSetorListAppState, SetorListAppState, SetorListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {setor as setorSchema} from '@cdk/normalizr';
import {Setor} from '@cdk/models/setor.model';
import {getRouterState} from '../../../../../../../store';

const schemaSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getSetorListState: any = createSelector(
    getSetorListAppState,
    (state: SetorListAppState) => state.setorList
);

export const getUnidadeHandle: any = createSelector(
    getRouterState,
    router => router?.state.params['generoHandle'] === 'unidade' ? router?.state.params['entidadeHandle'] : ''
);

export const getCurrentUnidade: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getUnidadeHandle,
    schemaSelectors.entityProjector
);

export const getSetorListIds: any = createSelector(
    getSetorListState,
    (state: SetorListState) => state.entitiesId
);

export const getSetorList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSetorListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getSetorListState,
    (state: SetorListState) => state.pagination
);

export const getSetorListLoaded: any = createSelector(
    getSetorListState,
    (state: SetorListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getSetorListState,
    (state: SetorListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getSetorListState,
    (state: SetorListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getSetorListState,
    (state: SetorListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getSetorListState,
    (state: SetorListState) => state.deletingErrors
);
