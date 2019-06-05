import {createSelector} from '@ngrx/store';
import {getSegurancaAppState, SegurancaAppState, SegurancaState} from '../reducers';

export const getSegurancaState = createSelector(
    getSegurancaAppState,
    (state: SegurancaAppState) => state.assunto
);

export const getIsSaving = createSelector(
    getSegurancaState,
    (state: SegurancaState) => state.saving
);

export const getErrors = createSelector(
    getSegurancaState,
    (state: SegurancaState) => state.errors
);
