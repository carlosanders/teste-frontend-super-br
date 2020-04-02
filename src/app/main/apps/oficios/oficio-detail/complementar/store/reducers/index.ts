import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { DocumentosReducer, DocumentosState } from './documentos.reducer';
import { DocumentosComplementaresReducer, DocumentosComplementaresState } from './documentos-complentares.reducer';
import { ComplementarReducer, ComplementarState } from './complementar.reducer';

export interface ComplementarAppState
{
    documentos: DocumentosState;
    complementar: ComplementarState;
    documentosComplementares: DocumentosComplementaresState;
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
    complementar: ComplementarReducer,
    documentosComplementares: DocumentosComplementaresReducer
};

export * from './documentos.reducer';
export * from './complementar.reducer';
export * from './documentos-complentares.reducer';
