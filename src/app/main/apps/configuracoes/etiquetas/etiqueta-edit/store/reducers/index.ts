import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {EtiquetaReducer, EtiquetaState} from './etiqueta.reducer';

export interface EtiquetaAppState
{
    etiqueta: EtiquetaState;
}

export const getEtiquetaAppState = createFeatureSelector<EtiquetaAppState>(
    'etiqueta-app'
);

export const getAppState: any = createSelector(
    getEtiquetaAppState,
    (state: EtiquetaAppState) => state
);

export const reducers: ActionReducerMap<EtiquetaAppState> = {
    etiqueta: EtiquetaReducer
};

export * from './etiqueta.reducer';
