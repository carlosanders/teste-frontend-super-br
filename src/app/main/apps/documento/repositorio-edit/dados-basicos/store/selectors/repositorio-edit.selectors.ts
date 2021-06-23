import {createSelector} from '@ngrx/store';
import {
    getRepositorioEditDadosBasicosAppState,
    RepositorioEditDadosBasicosAppState,
    RepositorioEditDadosBasicosState
} from '../reducers';

export const getRepositorioEditState = createSelector(
    getRepositorioEditDadosBasicosAppState,
    (state: RepositorioEditDadosBasicosAppState) => state.repositorio
);

export const getIsSaving = createSelector(
    getRepositorioEditState,
    (state: RepositorioEditDadosBasicosState) => state.saving
);

export const getErrors = createSelector(
    getRepositorioEditState,
    (state: RepositorioEditDadosBasicosState) => state.errors
);
