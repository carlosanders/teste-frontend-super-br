import {createSelector} from '@ngrx/store';
import {getAtividadeCreateAppState, AtividadeCreateAppState, AtividadeCreateState} from '../reducers';

export const getAtividadeCreateState = createSelector(
    getAtividadeCreateAppState,
    (state: AtividadeCreateAppState) => state.atividadeCreate
);

export const getIsSaving = createSelector(
    getAtividadeCreateState,
    (state: AtividadeCreateState) => state.savingTarefasId.length > 0
);

export const getErrors = createSelector(
    getAtividadeCreateState,
    (state: AtividadeCreateState) => state.errors
);
