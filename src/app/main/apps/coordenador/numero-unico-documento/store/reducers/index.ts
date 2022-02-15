import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {NumeroUnicoDocumentoReducer, NumeroUnicoDocumentoState} from './numero-unico-documento.reducer';

export interface NumeroUnicoDocumentoAppState
{
    numeros: NumeroUnicoDocumentoState;
}

export const getNumeroUnicoDocumentoAppState = createFeatureSelector<NumeroUnicoDocumentoAppState>(
    'numero-unico-documento-app'
);

export const getAppState: any = createSelector(
    getNumeroUnicoDocumentoAppState,
    (state: NumeroUnicoDocumentoAppState) => state
);

export const reducers: ActionReducerMap<NumeroUnicoDocumentoAppState> = {
    numeros: NumeroUnicoDocumentoReducer
};

export * from './numero-unico-documento.reducer';
