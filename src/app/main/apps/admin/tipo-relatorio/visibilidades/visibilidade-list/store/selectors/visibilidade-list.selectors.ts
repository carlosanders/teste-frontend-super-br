import {createSelector} from '@ngrx/store';
import {getVisibilidadeListAppState, VisibilidadeListAppState, VisibilidadeListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {visibilidade as visibilidadeSchema} from '@cdk/normalizr';
import {Visibilidade} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Visibilidade>(visibilidadeSchema);

export const getVisibilidadeListState: any = createSelector(
    getVisibilidadeListAppState,
    (state: VisibilidadeListAppState) => state.visibilidadeList
);

export const getVisibilidadeListIds: any = createSelector(
    getVisibilidadeListState,
    (state: VisibilidadeListState) => state.entitiesId
);

export const getVisibilidadeList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getVisibilidadeListIds,
    schemaSelectors.entitiesProjector
);

export const getVisibilidadeListLoaded: any = createSelector(
    getVisibilidadeListState,
    (state: VisibilidadeListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getVisibilidadeListState,
    (state: VisibilidadeListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getVisibilidadeListState,
    (state: VisibilidadeListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getVisibilidadeListState,
    (state: VisibilidadeListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getVisibilidadeListState,
    (state: VisibilidadeListState) => state.deletingErrors
);
