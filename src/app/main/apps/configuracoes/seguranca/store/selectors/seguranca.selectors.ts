import {createSelector} from '@ngrx/store';
import {getSegurancaAppState, SegurancaAppState, SegurancaState} from '../reducers';

export const getSegurancaState: any = createSelector(
    getSegurancaAppState,
    (state: SegurancaAppState) => state.assunto
);

export const getIsSaving: any = createSelector(
    getSegurancaState,
    (state: SegurancaState) => state.saving
);

export const getErrors: any = createSelector(
    getSegurancaState,
    (state: SegurancaState) => state.errors
);
