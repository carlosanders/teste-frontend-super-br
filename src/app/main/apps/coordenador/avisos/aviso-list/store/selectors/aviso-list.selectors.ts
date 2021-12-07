import {createSelector} from '@ngrx/store';
import {AvisoListAppState, AvisoListState, getAvisoListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {aviso as avisoSchema} from '@cdk/normalizr';
import {Aviso} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Aviso>(avisoSchema);

export const getAvisoListState: any = createSelector(
    getAvisoListAppState,
    (state: AvisoListAppState) => state.avisoList
);

export const getAvisoListIds: any = createSelector(
    getAvisoListState,
    (state: AvisoListState) => state.entitiesId
);

export const getAvisoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAvisoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getAvisoListState,
    (state: AvisoListState) => state.pagination
);

export const getAvisoListLoaded: any = createSelector(
    getAvisoListState,
    (state: AvisoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getAvisoListState,
    (state: AvisoListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getAvisoListState,
    (state: AvisoListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getAvisoListState,
    (state: AvisoListState) => state.deletedIds
);
