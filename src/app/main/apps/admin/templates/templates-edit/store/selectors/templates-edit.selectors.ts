import {createSelector} from '@ngrx/store';
import {getTemplatesEditAppState, TemplatesEditAppState, TemplatesEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Template} from '@cdk/models';
import {template as templatesSchema} from '@cdk/normalizr/template.schema';

const schemaTemplatesSelectors = createSchemaSelectors<Template>(templatesSchema);

export const getTemplatesEditState = createSelector(
    getTemplatesEditAppState,
    (state: TemplatesEditAppState) => state.templates
);

export const getTemplatesId = createSelector(
    getTemplatesEditState,
    (state: TemplatesEditState) => state.loaded ? state.loaded.value : null
);

export const getTemplates = createSelector(
    schemaTemplatesSelectors.getNormalizedEntities,
    getTemplatesId,
    schemaTemplatesSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getTemplatesEditState,
    (state: TemplatesEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getTemplatesEditState,
    (state: TemplatesEditState) => state.loaded
);

export const getErrors = createSelector(
    getTemplatesEditState,
    (state: TemplatesEditState) => state.errors
);
