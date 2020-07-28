import {createSelector} from '@ngrx/store';
import {
    getTemplatesListAppState,
    TemplatesListAppState,
    TemplatesListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {template as templatesSchema} from '@cdk/normalizr';
import {Template} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Template>(templatesSchema);

export const getTemplatesListState = createSelector(
    getTemplatesListAppState,
    (state: TemplatesListAppState) => state.templatesList
);

export const getTemplatesListIds = createSelector(
    getTemplatesListState,
    (state: TemplatesListState) => state.entitiesId
);

export const getTemplatesList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTemplatesListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getTemplatesListState,
    (state: TemplatesListState) => state.pagination
);

export const getTemplatesListLoaded = createSelector(
    getTemplatesListState,
    (state: TemplatesListState) => state.loaded
);

export const getIsLoading = createSelector(
    getTemplatesListState,
    (state: TemplatesListState) => state.loading
);

