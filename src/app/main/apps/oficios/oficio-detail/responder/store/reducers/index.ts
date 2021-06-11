import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {DocumentosReducer, DocumentosState} from './documentos.reducer';
import {ResponderReducer, ResponderState} from './responder.reducer';

export interface ResponderAppState
{
    responder: ResponderState;
    documentos: DocumentosState;
}

export const getResponderAppState = createFeatureSelector<ResponderAppState>(
    'responder-app'
);

export const getAppState = createSelector(
    getResponderAppState,
    (state: ResponderAppState) => state
);

export const reducers: ActionReducerMap<ResponderAppState> = {
    documentos: DocumentosReducer,
    responder: ResponderReducer
};

export * from './documentos.reducer';
export * from './responder.reducer';
