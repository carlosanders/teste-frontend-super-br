import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {TipoDocumentoListReducer, TipoDocumentoListState} from './tipo-documento-list.reducer';

export interface TipoDocumentoListAppState {
    tipoDocumentoList: TipoDocumentoListState;
}

export const getTipoDocumentoListAppState = createFeatureSelector<TipoDocumentoListAppState>(
    'tipo-documento-list'
);

export const getAppState: any = createSelector(
    getTipoDocumentoListAppState,
    (state: TipoDocumentoListAppState) => state
);

export const reducers: ActionReducerMap<TipoDocumentoListAppState> = {
    tipoDocumentoList: TipoDocumentoListReducer
};

export * from './tipo-documento-list.reducer';
