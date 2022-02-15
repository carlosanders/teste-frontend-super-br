import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {SigilosReducer, SigilosState} from './sigilos.reducer';


export interface DocumentoEditSigilosAppState
{
    sigilos: SigilosState;
}

export const getDocumentoEditSigilosAppState = createFeatureSelector<DocumentoEditSigilosAppState>(
    'documento-edit-sigilos-app'
);

export const getAppState: any = createSelector(
    getDocumentoEditSigilosAppState,
    (state: DocumentoEditSigilosAppState) => state
);

export const reducers: ActionReducerMap<DocumentoEditSigilosAppState> = {
    sigilos: SigilosReducer
};

export * from './sigilos.reducer';
