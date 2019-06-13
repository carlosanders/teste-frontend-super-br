import {createSelector} from '@ngrx/store';
import {getCompartilhamentoCreateAppState, CompartilhamentoCreateAppState, CompartilhamentoCreateState} from '../reducers';

export const getCompartilhamentoCreateState = createSelector(
    getCompartilhamentoCreateAppState,
    (state: CompartilhamentoCreateAppState) => state.compartilhamentoCreate
);

export const getIsSaving = createSelector(
    getCompartilhamentoCreateState,
    (state: CompartilhamentoCreateState) => state.savingTarefasId.length > 0
);

export const getErrors = createSelector(
    getCompartilhamentoCreateState,
    (state: CompartilhamentoCreateState) => state.errors
);
