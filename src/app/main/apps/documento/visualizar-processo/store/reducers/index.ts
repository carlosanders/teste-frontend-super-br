import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface EditorVisualizarProcessoAppState
{
}

export const getEditorVisualizarProcessoAppState = createFeatureSelector<EditorVisualizarProcessoAppState>(
    'editor-visualizar-processo-app'
);

export const getAppState: any = createSelector(
    getEditorVisualizarProcessoAppState,
    (state: EditorVisualizarProcessoAppState) => state
);

export const reducers: ActionReducerMap<EditorVisualizarProcessoAppState> = {
};
