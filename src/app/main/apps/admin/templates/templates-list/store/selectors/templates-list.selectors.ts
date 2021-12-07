import {createSelector} from '@ngrx/store';
import {getTemplatesListAppState, TemplatesListAppState, TemplatesListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {template as templatesSchema} from '@cdk/normalizr';
import {Template} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Template>(templatesSchema);

export const getTemplatesListState: any = createSelector(
    getTemplatesListAppState,
    (state: TemplatesListAppState) => state.templatesList
);

export const getTemplatesListIds: any = createSelector(
    getTemplatesListState,
    (state: TemplatesListState) => state.entitiesId
);

export const getTemplatesList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTemplatesListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getTemplatesListState,
    (state: TemplatesListState) => state.pagination
);

export const getTemplatesListLoaded: any = createSelector(
    getTemplatesListState,
    (state: TemplatesListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getTemplatesListState,
    (state: TemplatesListState) => state.loading
);

