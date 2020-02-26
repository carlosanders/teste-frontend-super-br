import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { ResponderComplementarReducer, ResponderComplementarState } from './responder-complementar.reducer';
import { DocumentosReducer, DocumentosState } from './documentos.reducer';
import {ResponderReducer, ResponderState} from './responder.reducer';
import {ComplementarReducer, ComplementarState} from './complementar.reducer';

export interface ResponderComplementarAppState
{
    responderComplementar: ResponderComplementarState;
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
    responderComplementar: ResponderComplementarReducer,
    documentos: DocumentosReducer,
    responder: ResponderReducer,
    complementar: ComplementarReducer
};

export * from './responder-complementar.reducer';
export * from './documentos.reducer';
export * from './responder.reducer';
export * from './complementar.reducer';
