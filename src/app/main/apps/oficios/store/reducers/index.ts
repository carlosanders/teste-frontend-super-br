import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {DocumentosAvulsoState, OficiosReducer} from './oficios.reducer';

export interface DocumentoAvulsoAppState
{
    documentosAvulso: DocumentosAvulsoState;
}

export const getDocumentoAvulsoAppState = createFeatureSelector<DocumentoAvulsoAppState>(
    'oficio-app'
);

export const getAppState: any = createSelector(
    getDocumentoAvulsoAppState,
    (state: DocumentoAvulsoAppState) => state
);

export const reducers: ActionReducerMap<DocumentoAvulsoAppState> = {
    documentosAvulso: OficiosReducer
};

export * from './oficios.reducer';
