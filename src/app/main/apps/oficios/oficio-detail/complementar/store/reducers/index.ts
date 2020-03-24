import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { DocumentosReducer, DocumentosState } from './documentos.reducer';
import { ComplementarReducer, ComplementarState } from './complementar.reducer';

export interface ComplementarAppState
{
    documentos: DocumentosState;
    complementar: ComplementarState;
}

export const getComplementarAppState = createFeatureSelector<ComplementarAppState>(
    'complementar-app'
);

export const getAppState = createSelector(
    getComplementarAppState,
    (state: ComplementarAppState) => state
);

export const reducers: ActionReducerMap<ComplementarAppState> = {
    documentos: DocumentosReducer,
    complementar: ComplementarReducer
};

export * from './documentos.reducer';
export * from './complementar.reducer';
