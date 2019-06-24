import {createSelector} from '@ngrx/store';
import {
    getVisibilidadeListAppState,
    VisibilidadeListAppState,
    VisibilidadeListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {visibilidade as visibilidadeSchema} from '@cdk/normalizr/visibilidade.schema';
import {Visibilidade} from '@cdk/models/visibilidade.model';

const schemaSelectors = createSchemaSelectors<Visibilidade>(visibilidadeSchema);

export const getVisibilidadeListState = createSelector(
    getVisibilidadeListAppState,
    (state: VisibilidadeListAppState) => state.visibilidadeList
);

export const getVisibilidadeListIds = createSelector(
    getVisibilidadeListState,
    (state: VisibilidadeListState) => state.entitiesId
);

export const getVisibilidadeList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getVisibilidadeListIds,
    schemaSelectors.entitiesProjector
);

export const getVisibilidadeListLoaded = createSelector(
    getVisibilidadeListState,
    (state: VisibilidadeListState) => state.loaded
);

export const getIsLoading = createSelector(
    getVisibilidadeListState,
    (state: VisibilidadeListState) => state.loading
);

export const getDeletingIds = createSelector(
    getVisibilidadeListState,
    (state: VisibilidadeListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getVisibilidadeListState,
    (state: VisibilidadeListState) => state.deletedIds
);
