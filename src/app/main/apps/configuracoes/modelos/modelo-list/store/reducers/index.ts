import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ModeloListReducer, ModeloListState} from './modelo-list.reducer';

export interface ModeloListAppState
{
    modeloList: ModeloListState;
}

export const getModeloListAppState = createFeatureSelector<ModeloListAppState>(
    'modelo-list-app'
);

export const getAppState: any = createSelector(
    getModeloListAppState,
    (state: ModeloListAppState) => state
);

export const reducers: ActionReducerMap<ModeloListAppState> = {
    modeloList: ModeloListReducer
};

export * from './modelo-list.reducer';
