import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { DocumentosReducer, DocumentosState } from './documentos.reducer';
import {ResponderReducer, ResponderState} from './responder.reducer';
import {ComplementarReducer, ComplementarState} from './complementar.reducer';

export interface ResponderComplementarAppState
{
    responder: ResponderState;
    documentos: DocumentosState;
    complementar: ComplementarState;
}

export const getResponderComplementarAppState = createFeatureSelector<ResponderComplementarAppState>(
    'reponder-complementar-app'
);

export const getAppState = createSelector(
    getResponderComplementarAppState,
    (state: ResponderComplementarAppState) => state
);

export const reducers: ActionReducerMap<ResponderComplementarAppState> = {
    documentos: DocumentosReducer,
    responder: ResponderReducer,
    complementar: ComplementarReducer
};

export * from './documentos.reducer';
export * from './responder.reducer';
export * from './complementar.reducer';
