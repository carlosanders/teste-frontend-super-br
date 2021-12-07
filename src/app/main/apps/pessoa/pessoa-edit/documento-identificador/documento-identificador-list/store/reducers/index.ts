import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {
    DocumentoIdentificadorListReducer,
    DocumentoIdentificadorListState
} from './documento-identificador-list.reducer';

export interface DocumentoIdentificadorListAppState
{
    documentoIdentificadorList: DocumentoIdentificadorListState;
}

export const getDocumentoIdentificadorListAppState = createFeatureSelector<DocumentoIdentificadorListAppState>(
    'documento-identificador-list-app'
);

export const getAppState: any = createSelector(
    getDocumentoIdentificadorListAppState,
    (state: DocumentoIdentificadorListAppState) => state
);

export const reducers: ActionReducerMap<DocumentoIdentificadorListAppState> = {
    documentoIdentificadorList: DocumentoIdentificadorListReducer
};

export * from './documento-identificador-list.reducer';
