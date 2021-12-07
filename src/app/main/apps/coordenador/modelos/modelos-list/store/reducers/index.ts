import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ModelosListReducer, ModelosListState} from './modelos-list.reducer';

export interface ModelosListAppState
{
    modelosList: ModelosListState;
}

export const getModelosListAppState = createFeatureSelector<ModelosListAppState>(
    'modelos-list-app'
);

export const getAppState: any = createSelector(
    getModelosListAppState,
    (state: ModelosListAppState) => state
);

export const reducers: ActionReducerMap<ModelosListAppState> = {
    modelosList: ModelosListReducer
};

export * from './modelos-list.reducer';
