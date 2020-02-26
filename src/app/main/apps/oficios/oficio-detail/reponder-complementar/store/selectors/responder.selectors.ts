import {createSelector} from '@ngrx/store';
import {getResponderComplementarAppState, ResponderComplementarAppState, ResponderState} from '../reducers';

export const getResponderState = createSelector(
    getResponderComplementarAppState,
    (state: ResponderComplementarAppState) => state.responder
);

export const getIsSaving = createSelector(
    getResponderState,
    (state: ResponderState) => state.saving
);

export const getErrors = createSelector(
    getResponderState,
    (state: ResponderState) => state.errors
);
