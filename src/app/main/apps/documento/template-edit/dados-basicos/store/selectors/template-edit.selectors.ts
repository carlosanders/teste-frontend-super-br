import {createSelector} from '@ngrx/store';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {
    getTemplateEditDadosBasicosAppState,
    TemplateEditDadosBasicosAppState,
    TemplateEditDadosBasicosState
} from '../reducers';
import {Template} from '@cdk/models';
import {template as templateSchema} from '@cdk/normalizr';

const schemaTemplateSelectors = createSchemaSelectors<Template>(templateSchema);

export const getTemplateEditState = createSelector(
    getTemplateEditDadosBasicosAppState,
    (state: TemplateEditDadosBasicosAppState) => state.template
);

export const getTemplateId = createSelector(
    getTemplateEditState,
    (state: TemplateEditDadosBasicosState) => state.templateId
);

export const getTemplate = createSelector(
    schemaTemplateSelectors.getNormalizedEntities,
    getTemplateId,
    schemaTemplateSelectors.entityProjector
);

export const getTemplateLoaded = createSelector(
    getTemplateEditState,
    (state: TemplateEditDadosBasicosState) => state.loaded
);

export const getIsSaving = createSelector(
    getTemplateEditState,
    (state: TemplateEditDadosBasicosState) => state.saving
);

export const getErrors = createSelector(
    getTemplateEditState,
    (state: TemplateEditDadosBasicosState) => state.errors
);
