import {createSelector} from '@ngrx/store';
import {ComplementarAppState, ComplementarState, getComplementarAppState} from '../reducers';

export const getComplementarState: any = createSelector(
    getComplementarAppState,
    (state: ComplementarAppState) => state.complementar
);

export const getIsSavingComplementar: any = createSelector(
    getComplementarState,
    (state: ComplementarState) => state.saving
);

export const getErrorsComplementar: any = createSelector(
    getComplementarState,
    (state: ComplementarState) => state.errors
);
