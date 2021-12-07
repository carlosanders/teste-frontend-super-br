import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {
    RepositoriosEspecieSetorListReducer,
    RepositoriosEspecieSetorListState
} from './repositorios-especie-setor-list.reducer';

export interface RepositoriosEspecieSetorListAppState
{
    repositoriosEspecieSetorList: RepositoriosEspecieSetorListState;
}

export const getRepositoriosEspecieSetorListAppState = createFeatureSelector<RepositoriosEspecieSetorListAppState>(
    'repositorios-especie-setor-list-app'
);

export const getAppState: any = createSelector(
    getRepositoriosEspecieSetorListAppState,
    (state: RepositoriosEspecieSetorListAppState) => state
);

export const reducers: ActionReducerMap<RepositoriosEspecieSetorListAppState> = {
    repositoriosEspecieSetorList: RepositoriosEspecieSetorListReducer
};

export * from './repositorios-especie-setor-list.reducer';
