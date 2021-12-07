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

export const getTemplateEditState: any = createSelector(
    getTemplateEditDadosBasicosAppState,
    (state: TemplateEditDadosBasicosAppState) => state.template
);

export const getTemplateId: any = createSelector(
    getTemplateEditState,
    (state: TemplateEditDadosBasicosState) => state.templateId
);

export const getTemplate: any = createSelector(
    schemaTemplateSelectors.getNormalizedEntities,
    getTemplateId,
    schemaTemplateSelectors.entityProjector
);

export const getTemplateLoaded: any = createSelector(
    getTemplateEditState,
    (state: TemplateEditDadosBasicosState) => state.loaded
);

export const getIsSaving: any = createSelector(
    getTemplateEditState,
    (state: TemplateEditDadosBasicosState) => state.saving
);

export const getErrors: any = createSelector(
    getTemplateEditState,
    (state: TemplateEditDadosBasicosState) => state.errors
);
