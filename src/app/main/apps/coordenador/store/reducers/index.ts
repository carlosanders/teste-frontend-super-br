import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {CoordenadorReducer, CoordenadorState} from './coordenador.reducer';

export interface CoordenadorAppState
{
    coordenador: CoordenadorState;
}

export const getCoordenadorAppState = createFeatureSelector<CoordenadorAppState>(
    'coordenador-app'
);

export const getAppState: any = createSelector(
    getCoordenadorAppState,
    (state: CoordenadorAppState) => state
);

export const reducers: ActionReducerMap<CoordenadorAppState> = {
    coordenador: CoordenadorReducer
};

export * from './coordenador.reducer';
