import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {DocumentoAvulsoListReducer, DocumentoAvulsoListState} from './documento-avulso-list.reducer';

export interface DocumentoAvulsoListAppState
{
    documentoAvulsoList: DocumentoAvulsoListState;
}

export const getDocumentoAvulsoListAppState = createFeatureSelector<DocumentoAvulsoListAppState>(
    'documento-avulso-list-app'
);

export const getAppState: any = createSelector(
    getDocumentoAvulsoListAppState,
    (state: DocumentoAvulsoListAppState) => state
);

export const reducers: ActionReducerMap<DocumentoAvulsoListAppState> = {
    documentoAvulsoList: DocumentoAvulsoListReducer
};

export * from './documento-avulso-list.reducer';
