import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { EtiquetaReducer, EtiquetaState } from './etiqueta.reducer';

export interface CoordenadorEtiquetaAppState
{
    etiqueta: EtiquetaState;
}

export const getCoordenadorEtiquetaAppState = createFeatureSelector<CoordenadorEtiquetaAppState>(
    'coordenador-etiqueta-app'
);

export const getAppState = createSelector(
    getCoordenadorEtiquetaAppState,
    (state: CoordenadorEtiquetaAppState) => state
);

export const reducers: ActionReducerMap<CoordenadorEtiquetaAppState> = {
    etiqueta: EtiquetaReducer
};

export * from './etiqueta.reducer';
