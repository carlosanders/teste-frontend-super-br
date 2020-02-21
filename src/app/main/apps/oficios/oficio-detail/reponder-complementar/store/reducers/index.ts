import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { ResponderComplementarReducer, ResponderComplementarState } from './responder-complementar.reducer';
import { ResponderComplementarDocumentosReducer, ResponderComplentarDocumentosState } from './documentos.reducer';

export interface ResponderComplementarAppState
{
    responderComplementar: ResponderComplementarState;
    responderComplementarDocumentos: ResponderComplentarDocumentosState;
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
    responderComplementarDocumentos: ResponderComplementarDocumentosReducer
};

export * from './responder-complementar.reducer';
export * from './documentos.reducer';
