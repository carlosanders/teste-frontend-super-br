import {createSelector} from '@ngrx/store';
import {ComplementarState, getComplementarAppState, ComplementarAppState} from '../reducers';

export const getComplementarState = createSelector(
    getComplementarAppState,
    (state: ComplementarAppState) => state.complementar
);

export const getIsSavingComplementar = createSelector(
    getComplementarState,
    (state: ComplementarState) => state.saving
);

export const getErrorsComplementar = createSelector(
    getComplementarState,
    (state: ComplementarState) => state.errors
);
