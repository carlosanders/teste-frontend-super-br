import {createSelector} from '@ngrx/store';
import {ClassificacaoListAppState, ClassificacaoListState, getClassificacaoListAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {classificacao as classificacaoSchema} from '@cdk/normalizr';
import {Classificacao} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Classificacao>(classificacaoSchema);

export const getClassificacaoListState: any = createSelector(
    getClassificacaoListAppState,
    (state: ClassificacaoListAppState) => state.classificacaoList
);

export const getClassificacaoListIds: any = createSelector(
    getClassificacaoListState,
    (state: ClassificacaoListState) => state.entitiesId
);

export const getClassificacaoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getClassificacaoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getClassificacaoListState,
    (state: ClassificacaoListState) => state.pagination
);

export const getClassificacaoListLoaded: any = createSelector(
    getClassificacaoListState,
    (state: ClassificacaoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getClassificacaoListState,
    (state: ClassificacaoListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getClassificacaoListState,
    (state: ClassificacaoListState) => state.deletingIds
);

export const getDeletingErrors: any = createSelector(
    getClassificacaoListState,
    (state: ClassificacaoListState) => state.deletingErrors
);

export const getDeletedIds: any = createSelector(
    getClassificacaoListState,
    (state: ClassificacaoListState) => state.deletedIds
);
