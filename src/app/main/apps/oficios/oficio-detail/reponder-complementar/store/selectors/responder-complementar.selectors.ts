import {createSelector} from '@ngrx/store';
import {getResponderComplementarAppState, ResponderComplementarAppState, ResponderComplementarState} from '../reducers';

export const getResponderComplementarState = createSelector(
    getResponderComplementarAppState,
    (state: ResponderComplementarAppState) => state.responderComplementar
);

export const getIsSaving = createSelector(
    getResponderComplementarState,
    (state: ResponderComplementarState) => state.saving
);

export const getErrors = createSelector(
    getResponderComplementarState,
    (state: ResponderComplementarState) => state.errors
);
