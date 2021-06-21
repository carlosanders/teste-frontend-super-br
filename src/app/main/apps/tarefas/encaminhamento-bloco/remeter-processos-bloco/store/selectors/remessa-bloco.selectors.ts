import {createSelector} from '@ngrx/store';
import {getRemessaBlocoAppState, RemessaBlocoAppState, RemessaBlocoState} from '../reducers';

export const getRemessaBlocoState = createSelector(
    getRemessaBlocoAppState,
    (state: RemessaBlocoAppState) => state.tramitacao
);

export const getIsSaving = createSelector(
    getRemessaBlocoState,
    (state: RemessaBlocoState) => state.savingProcessosId.length > 0
);

export const getErrors = createSelector(
    getRemessaBlocoState,
    (state: RemessaBlocoState) => state.errors
);
