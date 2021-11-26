import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {CoordenadorSetorReducer, CoordenadorSetorState} from './setor.reducer';

export interface CoordenadorSetorAppState
{
    setor: CoordenadorSetorState;
}

export const getCoordenadorSetorAppState = createFeatureSelector<CoordenadorSetorAppState>(
    'coordenador-setor-app'
);

export const getAppState: any = createSelector(
    getCoordenadorSetorAppState,
    (state: CoordenadorSetorAppState) => state
);

export const reducers: ActionReducerMap<CoordenadorSetorAppState> = {
    setor: CoordenadorSetorReducer
};

export * from './setor.reducer';
