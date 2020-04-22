import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { TipoDocumentoListReducer, TipoDocumentoListState } from './tipo-documento-list.reducer';

export interface TipoDocumentoListAppState
{
    tipoDocumento: TipoDocumentoListState;
}

export const getTipoDocumentoListAppState = createFeatureSelector<TipoDocumentoListAppState>(
    'tipo-documento-list-app'
);

export const getAppState = createSelector(
    getTipoDocumentoListAppState,
    (state: TipoDocumentoListAppState) => state
);

export const reducers: ActionReducerMap<TipoDocumentoListAppState> = {
    tipoDocumento: TipoDocumentoListReducer
};

export * from './tipo-documento-list.reducer';
