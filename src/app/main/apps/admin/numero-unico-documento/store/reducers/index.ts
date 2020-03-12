import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { NumeroUnicoDocumentoReducer, NumeroUnicoDocumentoState } from './numero-unico-documento.reducer';

export interface NumeroUnicoDocumentoAppState
{
    numerosUnicosDocumentos: NumeroUnicoDocumentoState;
}

export const getNumeroUnicoDocumentoAppState = createFeatureSelector<NumeroUnicoDocumentoAppState>(
    'numeros-unicos-documentos-app'
);

export const getAppState = createSelector(
    getNumeroUnicoDocumentoAppState,
    (state: NumeroUnicoDocumentoAppState) => state
);

export const reducers: ActionReducerMap<NumeroUnicoDocumentoAppState> = {
    numerosUnicosDocumentos: NumeroUnicoDocumentoReducer
};

export * from './numero-unico-documento.reducer';
