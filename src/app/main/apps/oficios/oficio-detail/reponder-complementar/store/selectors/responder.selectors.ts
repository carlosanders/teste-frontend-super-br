import {createSelector} from '@ngrx/store';
import {getResponderComplementarAppState, ResponderComplementarAppState, ResponderState} from '../reducers';

export const getResponderState = createSelector(
    getResponderComplementarAppState,
    (state: ResponderComplementarAppState) => state.responder
);

export const getIsSavingResponder = createSelector(
    getResponderState,
    (state: ResponderState) => state.saving
);

export const getErrorsResponder = createSelector(
    getResponderState,
    (state: ResponderState) => state.errors
);
