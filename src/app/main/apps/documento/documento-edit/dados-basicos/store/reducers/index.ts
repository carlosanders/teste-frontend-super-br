import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {DocumentoEditDadosBasicosReducer, DocumentoEditDadosBasicosState} from './documento-edit.reducer';

export interface DocumentoEditDadosBasicosAppState
{
    documento: DocumentoEditDadosBasicosState;
}

export const getDocumentoEditDadosBasicosAppState = createFeatureSelector<DocumentoEditDadosBasicosAppState>(
    'documento-edit-dados-basicos-app'
);

export const getAppState: any = createSelector(
    getDocumentoEditDadosBasicosAppState,
    (state: DocumentoEditDadosBasicosAppState) => state
);

export const reducers: ActionReducerMap<DocumentoEditDadosBasicosAppState> = {
    documento: DocumentoEditDadosBasicosReducer
};

export * from './documento-edit.reducer';
