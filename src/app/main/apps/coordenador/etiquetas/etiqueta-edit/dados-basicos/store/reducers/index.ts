import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { EtiquetaEditReducer, EtiquetaEditState } from './dados-basicos.reducer';

export interface CoordenadorEtiquetaEditAppState
{
    etiqueta: EtiquetaEditState;
}

export const getCoordenadorEtiquetaEditAppState = createFeatureSelector<CoordenadorEtiquetaEditAppState>(
    'coordenador-etiqueta-dados-basicos-app'
);

export const getAppState = createSelector(
    getCoordenadorEtiquetaEditAppState,
    (state: CoordenadorEtiquetaEditAppState) => state
);

export const reducers: ActionReducerMap<CoordenadorEtiquetaEditAppState> = {
    etiqueta: EtiquetaEditReducer
};

export * from './dados-basicos.reducer';
