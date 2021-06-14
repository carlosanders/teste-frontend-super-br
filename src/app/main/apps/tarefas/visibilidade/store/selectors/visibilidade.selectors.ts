import {createSelector} from '@ngrx/store';
import {getVisibilidadeAppState, VisibilidadeAppState, VisibilidadeState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {visibilidade as visibilidadeSchema} from '@cdk/normalizr';
import {Visibilidade} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Visibilidade>(visibilidadeSchema);

export const getVisibilidadeState = createSelector(
    getVisibilidadeAppState,
    (state: VisibilidadeAppState) => state.visibilidades
);

export const getVisibilidadeIds = createSelector(
    getVisibilidadeState,
    (state: VisibilidadeState) => state.entitiesId
);

export const getVisibilidadeId = createSelector(
    getVisibilidadeState,
    (state: VisibilidadeState) => state.loaded ? state.loaded.value : null
);

export const getVisibilidadeListLoaded = createSelector(
    getVisibilidadeState,
    (state: VisibilidadeState) => state.loaded
);

export const getVisibilidadeList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getVisibilidadeIds,
    schemaSelectors.entitiesProjector
);

export const getVisibilidade = createSelector(
    schemaSelectors.getNormalizedEntities,
    getVisibilidadeId,
    schemaSelectors.entityProjector
);

export const getDeletingVisibilidadeIds = createSelector(
    getVisibilidadeState,
    (state: VisibilidadeState) => state.deletingIds
);

export const getDeletedVisibilidadeIds = createSelector(
    getVisibilidadeState,
    (state: VisibilidadeState) => state.deletedIds
);

export const getHasLoaded = createSelector(
    getVisibilidadeState,
    (state: VisibilidadeState) => state.loaded
);

export const getVisibilidadeIsLoading = createSelector(
    getVisibilidadeState,
    (state: VisibilidadeState) => state.loading
);

export const getIsSavingVisibilidade = createSelector(
    getVisibilidadeState,
    (state: VisibilidadeState) => state.saving
);
