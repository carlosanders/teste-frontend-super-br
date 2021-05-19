import {createSelector} from '@ngrx/store';
import {
    getEspecieAtividadeListAppState,
    EspecieAtividadeListAppState,
    EspecieAtividadeListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {especieAtividade as especieAtividadeSchema} from '@cdk/normalizr';
import {EspecieAtividade} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<EspecieAtividade>(especieAtividadeSchema);

export const getEspecieAtividadeListState = createSelector(
    getEspecieAtividadeListAppState,
    (state: EspecieAtividadeListAppState) => state.especieAtividadeList
);

export const getEspecieAtividadeListIds = createSelector(
    getEspecieAtividadeListState,
    (state: EspecieAtividadeListState) => state.entitiesId
);

export const getEspecieAtividadeList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getEspecieAtividadeListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getEspecieAtividadeListState,
    (state: EspecieAtividadeListState) => state.pagination
);

export const getEspecieAtividadeListLoaded = createSelector(
    getEspecieAtividadeListState,
    (state: EspecieAtividadeListState) => state.loaded
);

export const getIsLoading = createSelector(
    getEspecieAtividadeListState,
    (state: EspecieAtividadeListState) => state.loading
);

export const getDeletingErrors = createSelector(
    getEspecieAtividadeListState,
    (state: EspecieAtividadeListState) => state.deletingErrors
);

