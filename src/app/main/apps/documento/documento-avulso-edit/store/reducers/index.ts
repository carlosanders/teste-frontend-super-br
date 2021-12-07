import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {DocumentoReducer, DocumentoState} from './documento.reducer';

export interface DocumentoAvulsoEditAppState {
    documento: DocumentoState;
}

export const getDocumentoAvulsoEditAppState = createFeatureSelector<DocumentoAvulsoEditAppState>(
    'documento-avulso-edit-app'
);

export const getAppState: any = createSelector(
    getDocumentoAvulsoEditAppState,
    (state: DocumentoAvulsoEditAppState) => state
);

export const reducers: ActionReducerMap<DocumentoAvulsoEditAppState> = {
    documento: DocumentoReducer,
};

export * from './documento.reducer';
