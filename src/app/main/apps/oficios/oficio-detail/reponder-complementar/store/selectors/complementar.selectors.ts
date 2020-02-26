import {createSelector} from '@ngrx/store';
import {ComplementarState, getResponderComplementarAppState, ResponderComplementarAppState} from '../reducers';

export const getComplementarState = createSelector(
    getResponderComplementarAppState,
    (state: ResponderComplementarAppState) => state.complementar
);

export const getIsSaving = createSelector(
    getComplementarState,
    (state: ComplementarState) => state.saving
);

export const getErrors = createSelector(
    getComplementarState,
    (state: ComplementarState) => state.errors
);
