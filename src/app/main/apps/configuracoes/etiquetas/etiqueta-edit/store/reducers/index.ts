import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { EtiquetaEditReducer, EtiquetaEditState } from './etiqueta-edit.reducer';

export interface EtiquetaEditAppState
{
    etiqueta: EtiquetaEditState;
}

export const getEtiquetaEditAppState = createFeatureSelector<EtiquetaEditAppState>(
    'etiqueta-edit-app'
);

export const getAppState = createSelector(
    getEtiquetaEditAppState,
    (state: EtiquetaEditAppState) => state
);

export const reducers: ActionReducerMap<EtiquetaEditAppState> = {
    etiqueta: EtiquetaEditReducer
};

export * from './etiqueta-edit.reducer';
