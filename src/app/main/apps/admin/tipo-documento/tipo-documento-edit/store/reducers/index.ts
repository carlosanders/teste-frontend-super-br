import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {TipoDocumentoEditReducer, TipoDocumentoEditState} from './tipo-documento-edit.reducer';

export interface TipoDocumentoEditAppState {
    tipoDocumento: TipoDocumentoEditState;
}

export const getTipoDocumentoEditAppState = createFeatureSelector<TipoDocumentoEditAppState>(
    'tipo-documento-edit-app'
);

export const getAppState: any = createSelector(
    getTipoDocumentoEditAppState,
    (state: TipoDocumentoEditAppState) => state
);

export const reducers: ActionReducerMap<TipoDocumentoEditAppState> = {
    tipoDocumento: TipoDocumentoEditReducer
};

export * from './tipo-documento-edit.reducer';
