import {createSelector} from '@ngrx/store';
import {
    getRepositorioEditDadosBasicosAppState,
    RepositorioEditDadosBasicosAppState,
    RepositorioEditDadosBasicosState
} from '../reducers';

export const getRepositorioEditState: any = createSelector(
    getRepositorioEditDadosBasicosAppState,
    (state: RepositorioEditDadosBasicosAppState) => state.repositorio
);

export const getIsSaving: any = createSelector(
    getRepositorioEditState,
    (state: RepositorioEditDadosBasicosState) => state.saving
);

export const getErrors: any = createSelector(
    getRepositorioEditState,
    (state: RepositorioEditDadosBasicosState) => state.errors
);
