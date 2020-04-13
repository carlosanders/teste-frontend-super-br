import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { RepositoriosEditReducer, RepositorioEditState } from './repositorios-edit.reducer';

export interface RepositorioEditAppState
{
    repositorio: RepositorioEditState;
}

export const getRepositorioEditAppState = createFeatureSelector<RepositorioEditAppState>(
    'repositorio-edit-app'
);

export const getAppState = createSelector(
    getRepositorioEditAppState,
    (state: RepositorioEditAppState) => state
);

export const reducers: ActionReducerMap<RepositorioEditAppState> = {
    repositorio: RepositoriosEditReducer
};

export * from './repositorios-edit.reducer';
