import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {DocumentosReducer, DocumentosState} from './documentos.reducer';
import {DocumentosComplementaresReducer, DocumentosComplementaresState} from './documentos-complentares.reducer';

export interface ComplementarAppState
{
    documentos: DocumentosState;
    documentosComplementares: DocumentosComplementaresState;
}

export const getComplementarAppState = createFeatureSelector<ComplementarAppState>(
    'complementar-app'
);

export const getAppState: any = createSelector(
    getComplementarAppState,
    (state: ComplementarAppState) => state
);

export const reducers: ActionReducerMap<ComplementarAppState> = {
    documentos: DocumentosReducer,
    documentosComplementares: DocumentosComplementaresReducer
};

export * from './documentos.reducer';
export * from './documentos-complentares.reducer';
