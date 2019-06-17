import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { VinculacaoEtiquetaCreateReducer, VinculacaoEtiquetaCreateState } from './vinculacao-etiqueta-create.reducer';

export interface VinculacaoEtiquetaCreateAppState
{
    vinculacaoEtiquetaCreate: VinculacaoEtiquetaCreateState;
}

export const getVinculacaoEtiquetaCreateAppState = createFeatureSelector<VinculacaoEtiquetaCreateAppState>(
    'vinculacao-etiqueta-create-bloco-app'
);

export const getAppState = createSelector(
    getVinculacaoEtiquetaCreateAppState,
    (state: VinculacaoEtiquetaCreateAppState) => state
);

export const reducers: ActionReducerMap<VinculacaoEtiquetaCreateAppState> = {
    vinculacaoEtiquetaCreate: VinculacaoEtiquetaCreateReducer
};

export * from './vinculacao-etiqueta-create.reducer';
