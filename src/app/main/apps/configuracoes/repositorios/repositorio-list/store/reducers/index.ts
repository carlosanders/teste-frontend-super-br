import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RepositorioListReducer, RepositorioListState} from './repositorio-list.reducer';

export interface RepositorioListAppState
{
    repositorioList: RepositorioListState;
}

export const getRepositorioListAppState = createFeatureSelector<RepositorioListAppState>(
    'repositorio-list-app'
);

export const getAppState: any = createSelector(
    getRepositorioListAppState,
    (state: RepositorioListAppState) => state
);

export const reducers: ActionReducerMap<RepositorioListAppState> = {
    repositorioList: RepositorioListReducer
};

export * from './repositorio-list.reducer';
