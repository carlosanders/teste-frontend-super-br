import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {InteressadoListReducer, InteressadoListState} from './interessado-list.reducer';

export interface InteressadoListAppState
{
    interessadoList: InteressadoListState;
}

export const getInteressadoListAppState = createFeatureSelector<InteressadoListAppState>(
    'interessado-list-app'
);

export const getAppState: any = createSelector(
    getInteressadoListAppState,
    (state: InteressadoListAppState) => state
);

export const reducers: ActionReducerMap<InteressadoListAppState> = {
    interessadoList: InteressadoListReducer
};

export * from './interessado-list.reducer';
