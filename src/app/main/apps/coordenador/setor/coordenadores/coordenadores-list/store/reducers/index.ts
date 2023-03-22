import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {CoordenadoresListReducer, CoordenadoresListState} from './coordenadores-list.reducer';

export interface CoordenadoresListAppState {
    coordenadoresList: CoordenadoresListState;
}

export const getCoordenadoresListAppState = createFeatureSelector<CoordenadoresListAppState>(
    'coordenadores-setor-list-app'
);

export const getAppState: any = createSelector(
    getCoordenadoresListAppState,
    (state: CoordenadoresListAppState) => state
);

export const reducers: ActionReducerMap<CoordenadoresListAppState> = {
    coordenadoresList: CoordenadoresListReducer
};

export * from './coordenadores-list.reducer';
