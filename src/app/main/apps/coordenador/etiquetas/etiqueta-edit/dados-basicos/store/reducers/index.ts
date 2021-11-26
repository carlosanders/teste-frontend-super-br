import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {EtiquetaEditReducer, EtiquetaEditState} from './dados-basicos.reducer';

export interface EtiquetaEditAppState
{
    etiqueta: EtiquetaEditState;
}

export const getEtiquetaEditAppState = createFeatureSelector<EtiquetaEditAppState>(
    'etiqueta-dados-basicos-app'
);

export const getAppState: any = createSelector(
    getEtiquetaEditAppState,
    (state: EtiquetaEditAppState) => state
);

export const reducers: ActionReducerMap<EtiquetaEditAppState> = {
    etiqueta: EtiquetaEditReducer
};

export * from './dados-basicos.reducer';
