import {createSelector} from '@ngrx/store';
import {
    getClassificacaoListAppState,
    ClassificacaoListAppState,
    ClassificacaoListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {classificacao as classificacaoSchema} from '@cdk/normalizr/classificacao.schema';
import {Classificacao} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Classificacao>(classificacaoSchema);

export const getClassificacaoListState = createSelector(
    getClassificacaoListAppState,
    (state: ClassificacaoListAppState) => state.classificacaoList
);

export const getClassificacaoListIds = createSelector(
    getClassificacaoListState,
    (state: ClassificacaoListState) => state.entitiesId
);

export const getClassificacaoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getClassificacaoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getClassificacaoListState,
    (state: ClassificacaoListState) => state.pagination
);

export const getClassificacaoListLoaded = createSelector(
    getClassificacaoListState,
    (state: ClassificacaoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getClassificacaoListState,
    (state: ClassificacaoListState) => state.loading
);