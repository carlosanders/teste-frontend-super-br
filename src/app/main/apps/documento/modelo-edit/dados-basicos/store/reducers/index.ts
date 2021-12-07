import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ModeloEditDadosBasicosReducer, ModeloEditDadosBasicosState} from './modelo-edit.reducer';

export interface ModeloEditDadosBasicosAppState
{
    modelo: ModeloEditDadosBasicosState;
}

export const getModeloEditDadosBasicosAppState = createFeatureSelector<ModeloEditDadosBasicosAppState>(
    'documento-modelo-edit-dados-basicos-app'
);

export const getAppState: any = createSelector(
    getModeloEditDadosBasicosAppState,
    (state: ModeloEditDadosBasicosAppState) => state
);

export const reducers: ActionReducerMap<ModeloEditDadosBasicosAppState> = {
    modelo: ModeloEditDadosBasicosReducer
};

export * from './modelo-edit.reducer';
