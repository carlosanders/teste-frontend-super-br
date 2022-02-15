import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RepositorioEditReducer, RepositorioEditState} from './repositorio-edit.reducer';

export interface RepositorioEditAppState
{
    repositorio: RepositorioEditState;
}

export const getRepositorioEditAppState = createFeatureSelector<RepositorioEditAppState>(
    'repositorio-edit-app'
);

export const getAppState: any = createSelector(
    getRepositorioEditAppState,
    (state: RepositorioEditAppState) => state
);

export const reducers: ActionReducerMap<RepositorioEditAppState> = {
    repositorio: RepositorioEditReducer
};

export * from './repositorio-edit.reducer';
