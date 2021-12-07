import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RepositorioEditDadosBasicosReducer, RepositorioEditDadosBasicosState} from './repositorio-edit.reducer';

export interface RepositorioEditDadosBasicosAppState
{
    repositorio: RepositorioEditDadosBasicosState;
}

export const getRepositorioEditDadosBasicosAppState = createFeatureSelector<RepositorioEditDadosBasicosAppState>(
    'documento-repositorio-edit-dados-basicos-app'
);

export const getAppState: any = createSelector(
    getRepositorioEditDadosBasicosAppState,
    (state: RepositorioEditDadosBasicosAppState) => state
);

export const reducers: ActionReducerMap<RepositorioEditDadosBasicosAppState> = {
    repositorio: RepositorioEditDadosBasicosReducer
};

export * from './repositorio-edit.reducer';
