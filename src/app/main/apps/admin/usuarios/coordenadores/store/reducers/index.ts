import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {CoordenadoresReducer, CoordenadoresState} from './coordenadores.reducer';

export interface CoordenadoresAppState {
    coordenadores: CoordenadoresState;
}

export const getCoordenadoresAppState = createFeatureSelector<CoordenadoresAppState>(
    'admin-coordenadores-app'
);

export const getAppState: any = createSelector(
    getCoordenadoresAppState,
    (state: CoordenadoresAppState) => state
);

export const reducers: ActionReducerMap<CoordenadoresAppState> = {
    coordenadores: CoordenadoresReducer
};

export * from './coordenadores.reducer';
