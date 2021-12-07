import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {TemplateEditDadosBasicosReducer, TemplateEditDadosBasicosState} from './template-edit.reducer';

export interface TemplateEditDadosBasicosAppState
{
    template: TemplateEditDadosBasicosState;
}

export const getTemplateEditDadosBasicosAppState = createFeatureSelector<TemplateEditDadosBasicosAppState>(
    'documento-template-edit-dados-basicos-app'
);

export const getAppState: any = createSelector(
    getTemplateEditDadosBasicosAppState,
    (state: TemplateEditDadosBasicosAppState) => state
);

export const reducers: ActionReducerMap<TemplateEditDadosBasicosAppState> = {
    template: TemplateEditDadosBasicosReducer
};

export * from './template-edit.reducer';
