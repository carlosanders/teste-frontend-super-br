import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {NumeroUnicoDocumentoListReducer, NumeroUnicoDocumentoListState} from './numero-unico-documento-list.reducer';

export interface NumeroUnicoDocumentoListAppState
{
    numeroUnicoDocumentoList: NumeroUnicoDocumentoListState;
}

export const getNumeroUnicoDocumentoListAppState = createFeatureSelector<NumeroUnicoDocumentoListAppState>(
    'numero-unico-documento-list-app'
);

export const getAppState: any = createSelector(
    getNumeroUnicoDocumentoListAppState,
    (state: NumeroUnicoDocumentoListAppState) => state
);

export const reducers: ActionReducerMap<NumeroUnicoDocumentoListAppState> = {
    numeroUnicoDocumentoList: NumeroUnicoDocumentoListReducer
};

export * from './numero-unico-documento-list.reducer';
