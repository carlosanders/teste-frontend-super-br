import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {DocumentoAvulsoEditReducer, DocumentoAvulsoEditState} from './documento-avulso-edit.reducer';

export interface DocumentoAvulsoEditAppState
{
    documentoAvulso: DocumentoAvulsoEditState;
}

export const getDocumentoAvulsoEditAppState = createFeatureSelector<DocumentoAvulsoEditAppState>(
    'documento-avulso-edit-app'
);

export const getAppState: any = createSelector(
    getDocumentoAvulsoEditAppState,
    (state: DocumentoAvulsoEditAppState) => state
);

export const reducers: ActionReducerMap<DocumentoAvulsoEditAppState> = {
    documentoAvulso: DocumentoAvulsoEditReducer
};

export * from './documento-avulso-edit.reducer';
