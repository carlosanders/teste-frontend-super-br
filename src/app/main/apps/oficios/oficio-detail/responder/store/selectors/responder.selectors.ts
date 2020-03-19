import {createSelector} from '@ngrx/store';
import {getResponderAppState, ResponderAppState, ResponderState} from '../reducers';

export const getResponderState = createSelector(
    getResponderAppState,
    (state: ResponderAppState) => state.responder
);

export const getIsSavingResponder = createSelector(
    getResponderState,
    (state: ResponderState) => state.saving
);

export const getErrorsResponder = createSelector(
    getResponderState,
    (state: ResponderState) => state.errors
);
