import {createSelector} from '@ngrx/store';
import {
    getModeloEditDadosBasicosAppState,
    ModeloEditDadosBasicosAppState,
    ModeloEditDadosBasicosState
} from '../reducers';

export const getModeloEditState: any = createSelector(
    getModeloEditDadosBasicosAppState,
    (state: ModeloEditDadosBasicosAppState) => state.modelo
);

export const getIsSaving: any = createSelector(
    getModeloEditState,
    (state: ModeloEditDadosBasicosState) => state.saving
);

export const getErrors: any = createSelector(
    getModeloEditState,
    (state: ModeloEditDadosBasicosState) => state.errors
);
