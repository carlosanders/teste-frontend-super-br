import {createSelector} from '@ngrx/store';
import {getTemplatesEditAppState, TemplatesEditAppState, TemplatesEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Template} from '@cdk/models';
import {template as templatesSchema} from '@cdk/normalizr';

const schemaTemplatesSelectors = createSchemaSelectors<Template>(templatesSchema);

export const getTemplatesEditState: any = createSelector(
    getTemplatesEditAppState,
    (state: TemplatesEditAppState) => state.templates
);

export const getTemplatesId: any = createSelector(
    getTemplatesEditState,
    (state: TemplatesEditState) => state.loaded ? state.loaded.value : null
);

export const getTemplates: any = createSelector(
    schemaTemplatesSelectors.getNormalizedEntities,
    getTemplatesId,
    schemaTemplatesSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getTemplatesEditState,
    (state: TemplatesEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getTemplatesEditState,
    (state: TemplatesEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getTemplatesEditState,
    (state: TemplatesEditState) => state.errors
);
