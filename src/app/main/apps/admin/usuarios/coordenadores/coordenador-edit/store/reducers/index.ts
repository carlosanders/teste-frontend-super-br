import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {CoordenadorEditReducer, CoordenadorEditState} from './coordenador-edit.reducer';

export interface CoordenadorEditAppState {
    coordenador: CoordenadorEditState;
}

export const getCoordenadorEditAppState = createFeatureSelector<CoordenadorEditAppState>(
    'admin-coordenador-edit-app'
);

export const getAppState: any = createSelector(
    getCoordenadorEditAppState,
    (state: CoordenadorEditAppState) => state
);

export const reducers: ActionReducerMap<CoordenadorEditAppState> = {
    coordenador: CoordenadorEditReducer
};

export * from './coordenador-edit.reducer';
