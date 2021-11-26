import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ModeloEditReducer, ModeloEditState} from './modelo-edit.reducer';

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
    modelo: ModeloEditReducer
};

export * from './modelo-edit.reducer';
