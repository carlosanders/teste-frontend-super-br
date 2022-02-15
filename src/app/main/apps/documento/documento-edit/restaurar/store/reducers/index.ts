import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {DocumentoEditRestaurarReducer, DocumentoEditRestaurarState} from './documento-edit.reducer';

export interface DocumentoEditRestaurarAppState
{
    documento: DocumentoEditRestaurarState;
}

export const getDocumentoEditRestaurarAppState = createFeatureSelector<DocumentoEditRestaurarAppState>(
    'documento-edit-restaurar-app'
);

export const getAppState: any = createSelector(
    getDocumentoEditRestaurarAppState,
    (state: DocumentoEditRestaurarAppState) => state
);

export const reducers: ActionReducerMap<DocumentoEditRestaurarAppState> = {
    documento: DocumentoEditRestaurarReducer
};

export * from './documento-edit.reducer';
