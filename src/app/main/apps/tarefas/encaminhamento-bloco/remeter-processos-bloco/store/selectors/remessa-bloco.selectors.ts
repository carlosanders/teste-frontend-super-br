import {createSelector} from '@ngrx/store';
import {getRemessaBlocoAppState, RemessaBlocoAppState, RemessaBlocoState} from '../reducers';

export const getRemessaBlocoState: any = createSelector(
    getRemessaBlocoAppState,
    (state: RemessaBlocoAppState) => state.tramitacao
);

export const getIsSaving: any = createSelector(
    getRemessaBlocoState,
    (state: RemessaBlocoState) => state.savingProcessosId.length > 0
);

export const getErrors: any = createSelector(
    getRemessaBlocoState,
    (state: RemessaBlocoState) => state.errors
);
