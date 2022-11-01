import {createSelector} from '@ngrx/store';
import {getRepresentanteListAppState, RepresentanteListAppState, RepresentanteListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {representante as representanteSchema} from '@cdk/normalizr';
import {Representante} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Representante>(representanteSchema);

export const getRepresentanteListState: any = createSelector(
    getRepresentanteListAppState,
    (state: RepresentanteListAppState) => state.representanteList
);

export const getRepresentanteListIds: any = createSelector(
    getRepresentanteListState,
    (state: RepresentanteListState) => state.entitiesId
);

export const getRepresentanteList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getRepresentanteListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getRepresentanteListState,
    (state: RepresentanteListState) => state.pagination
);

export const getRepresentanteListLoaded: any = createSelector(
    getRepresentanteListState,
    (state: RepresentanteListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getRepresentanteListState,
    (state: RepresentanteListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getRepresentanteListState,
    (state: RepresentanteListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getRepresentanteListState,
    (state: RepresentanteListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getRepresentanteListState,
    (state: RepresentanteListState) => state.deletingErrors
);
