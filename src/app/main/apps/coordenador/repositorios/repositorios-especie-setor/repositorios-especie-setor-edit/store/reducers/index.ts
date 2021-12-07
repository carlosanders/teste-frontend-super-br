import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {
    RepositoriosEspecieSetorEditReducer,
    RepositoriosEspecieSetorEditState
} from './repositorios-especie-setor-edit.reducer';

export interface RepositoriosEspecieSetorEditAppState
{
    vinculacaoRepositorio: RepositoriosEspecieSetorEditState;
}

export const getRepositoriosEspecieSetorEditAppState = createFeatureSelector<RepositoriosEspecieSetorEditAppState>(
    'repositorios-especie-setor-edit-app'
);

export const getAppState: any = createSelector(
    getRepositoriosEspecieSetorEditAppState,
    (state: RepositoriosEspecieSetorEditAppState) => state
);

export const reducers: ActionReducerMap<RepositoriosEspecieSetorEditAppState> = {
    vinculacaoRepositorio: RepositoriosEspecieSetorEditReducer
};

export * from './repositorios-especie-setor-edit.reducer';
