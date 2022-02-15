import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RepositoriosEspecieSetorReducer, RepositoriosEspecieSetorState} from './repositorios-especie-setor.reducer';

export interface RepositoriosEspecieSetorAppState
{
    repositorios: RepositoriosEspecieSetorState;
}

export const getRepositoriosEspecieSetorAppState = createFeatureSelector<RepositoriosEspecieSetorAppState>(
    'repositorios-especie-setor-app'
);

export const getAppState: any = createSelector(
    getRepositoriosEspecieSetorAppState,
    (state: RepositoriosEspecieSetorAppState) => state
);

export const reducers: ActionReducerMap<RepositoriosEspecieSetorAppState> = {
    repositorios: RepositoriosEspecieSetorReducer
};

export * from './repositorios-especie-setor.reducer';
