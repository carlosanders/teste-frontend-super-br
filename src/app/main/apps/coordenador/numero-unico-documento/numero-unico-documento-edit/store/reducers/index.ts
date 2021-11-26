import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {NumeroUnicoDocumentoEditReducer, NumeroUnicoDocumentoEditState} from './numero-unico-documento-edit.reducer';

export interface NumeroUnicoDocumentoEditAppState
{
    numeroUnicoDocumento: NumeroUnicoDocumentoEditState;
}

export const getNumeroUnicoDocumentoEditAppState = createFeatureSelector<NumeroUnicoDocumentoEditAppState>(
    'numero-unico-documento-edit-app'
);

export const getAppState: any = createSelector(
    getNumeroUnicoDocumentoEditAppState,
    (state: NumeroUnicoDocumentoEditAppState) => state
);

export const reducers: ActionReducerMap<NumeroUnicoDocumentoEditAppState> = {
    numeroUnicoDocumento: NumeroUnicoDocumentoEditReducer
};

export * from './numero-unico-documento-edit.reducer';
