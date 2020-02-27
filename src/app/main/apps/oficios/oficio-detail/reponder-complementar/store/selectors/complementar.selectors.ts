import {createSelector} from '@ngrx/store';
import {ComplementarState, getResponderComplementarAppState, ResponderComplementarAppState} from '../reducers';

export const getComplementarState = createSelector(
    getResponderComplementarAppState,
    (state: ResponderComplementarAppState) => state.complementar
);

export const getIsSavingComplementar = createSelector(
    getComplementarState,
    (state: ComplementarState) => state.saving
);

export const getErrorsComplementar = createSelector(
    getComplementarState,
    (state: ComplementarState) => state.errors
);
