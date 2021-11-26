import {createSelector} from '@ngrx/store';
import {AssinaturaListAppState, AssinaturaListState, getAssinaturaListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {assinatura as assinaturaSchema} from '@cdk/normalizr';
import {Assinatura} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Assinatura>(assinaturaSchema);

export const getAssinaturaListState: any = createSelector(
    getAssinaturaListAppState,
    (state: AssinaturaListAppState) => state.assinaturaList
);

export const getAssinaturaListIds: any = createSelector(
    getAssinaturaListState,
    (state: AssinaturaListState) => state.entitiesId
);

export const getAssinaturaList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAssinaturaListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getAssinaturaListState,
    (state: AssinaturaListState) => state.pagination
);

export const getAssinaturaListLoaded: any = createSelector(
    getAssinaturaListState,
    (state: AssinaturaListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getAssinaturaListState,
    (state: AssinaturaListState) => state.loading
);
