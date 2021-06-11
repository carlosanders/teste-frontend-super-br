import {createSelector} from '@ngrx/store';
import {
    getModeloEditDadosBasicosAppState,
    ModeloEditDadosBasicosAppState,
    ModeloEditDadosBasicosState
} from '../reducers';

export const getModeloEditState = createSelector(
    getModeloEditDadosBasicosAppState,
    (state: ModeloEditDadosBasicosAppState) => state.modelo
);

export const getIsSaving = createSelector(
    getModeloEditState,
    (state: ModeloEditDadosBasicosState) => state.saving
);

export const getErrors = createSelector(
    getModeloEditState,
    (state: ModeloEditDadosBasicosState) => state.errors
);
