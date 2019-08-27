import {createSelector} from '@ngrx/store';
import {
    getAssinaturaListAppState,
    AssinaturaListAppState,
    AssinaturaListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {assinatura as assinaturaSchema} from '@cdk/normalizr/assinatura.schema';
import {Assinatura} from '@cdk/models/assinatura.model';

const schemaSelectors = createSchemaSelectors<Assinatura>(assinaturaSchema);

export const getAssinaturaListState = createSelector(
    getAssinaturaListAppState,
    (state: AssinaturaListAppState) => state.assinaturaList
);

export const getAssinaturaListIds = createSelector(
    getAssinaturaListState,
    (state: AssinaturaListState) => state.entitiesId
);

export const getAssinaturaList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAssinaturaListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getAssinaturaListState,
    (state: AssinaturaListState) => state.pagination
);

export const getAssinaturaListLoaded = createSelector(
    getAssinaturaListState,
    (state: AssinaturaListState) => state.loaded
);

export const getIsLoading = createSelector(
    getAssinaturaListState,
    (state: AssinaturaListState) => state.loading
);
