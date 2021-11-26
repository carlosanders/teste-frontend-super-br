import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {documentosReducer, DocumentosState} from './documentos.reducer';
import {responderReducer, ResponderState} from './responder.reducer';
import {complementaresReducer, ComplementaresState} from './complementares.reducer';

export interface ResponderAppState
{
    responder: ResponderState;
    documentos: DocumentosState;
    complementares: ComplementaresState;
}

export const getResponderAppState = createFeatureSelector<ResponderAppState>(
    'responder-app'
);

export const getAppState: any = createSelector(
    getResponderAppState,
    (state: ResponderAppState) => state
);

export const reducers: ActionReducerMap<ResponderAppState> = {
    documentos: documentosReducer,
    responder: responderReducer,
    complementares: complementaresReducer
};

export * from './documentos.reducer';
export * from './responder.reducer';
export * from './complementares.reducer';
