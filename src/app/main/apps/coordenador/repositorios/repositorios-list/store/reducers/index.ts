import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RepositoriosListReducer, RepositoriosListState} from './repositorios-list.reducer';

export interface RepositoriosListAppState
{
    repositoriosList: RepositoriosListState;
}

export const getRepositoriosListAppState = createFeatureSelector<RepositoriosListAppState>(
    'repositorios-list-app'
);

export const getAppState: any = createSelector(
    getRepositoriosListAppState,
    (state: RepositoriosListAppState) => state
);

export const reducers: ActionReducerMap<RepositoriosListAppState> = {
    repositoriosList: RepositoriosListReducer
};

export * from './repositorios-list.reducer';
