import {createSelector} from '@ngrx/store';
import {EspecieAtividadeListAppState, EspecieAtividadeListState, getEspecieAtividadeListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {especieAtividade as especieAtividadeSchema} from '@cdk/normalizr';
import {EspecieAtividade} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<EspecieAtividade>(especieAtividadeSchema);

export const getEspecieAtividadeListState: any = createSelector(
    getEspecieAtividadeListAppState,
    (state: EspecieAtividadeListAppState) => state.especieAtividadeList
);

export const getEspecieAtividadeListIds: any = createSelector(
    getEspecieAtividadeListState,
    (state: EspecieAtividadeListState) => state.entitiesId
);

export const getEspecieAtividadeList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getEspecieAtividadeListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getEspecieAtividadeListState,
    (state: EspecieAtividadeListState) => state.pagination
);

export const getEspecieAtividadeListLoaded: any = createSelector(
    getEspecieAtividadeListState,
    (state: EspecieAtividadeListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getEspecieAtividadeListState,
    (state: EspecieAtividadeListState) => state.loading
);

export const getDeletingErrors: any = createSelector(
    getEspecieAtividadeListState,
    (state: EspecieAtividadeListState) => state.deletingErrors
);

