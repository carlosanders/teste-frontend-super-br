import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ModeloEditState, ModelosEditReducer} from './modelos-edit.reducer';

export interface ModeloEditAppState
{
    modelo: ModeloEditState;
}

export const getModeloEditAppState = createFeatureSelector<ModeloEditAppState>(
    'modelo-edit-app'
);

export const getAppState: any = createSelector(
    getModeloEditAppState,
    (state: ModeloEditAppState) => state
);

export const reducers: ActionReducerMap<ModeloEditAppState> = {
    modelo: ModelosEditReducer
};

export * from './modelos-edit.reducer';
