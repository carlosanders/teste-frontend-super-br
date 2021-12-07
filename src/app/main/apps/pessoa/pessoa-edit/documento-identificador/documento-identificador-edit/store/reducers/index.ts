import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {
    DocumentoIdentificadorEditReducer,
    DocumentoIdentificadorEditState
} from './documento-identificador-edit.reducer';

export interface DocumentoIdentificadorEditAppState
{
    documentoIdentificador: DocumentoIdentificadorEditState;
}

export const getDocumentoIdentificadorEditAppState = createFeatureSelector<DocumentoIdentificadorEditAppState>(
    'documento-identificador-edit-app'
);

export const getAppState: any = createSelector(
    getDocumentoIdentificadorEditAppState,
    (state: DocumentoIdentificadorEditAppState) => state
);

export const reducers: ActionReducerMap<DocumentoIdentificadorEditAppState> = {
    documentoIdentificador: DocumentoIdentificadorEditReducer
};

export * from './documento-identificador-edit.reducer';
