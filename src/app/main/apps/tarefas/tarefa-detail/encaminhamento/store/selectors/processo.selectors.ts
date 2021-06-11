import {createSelector} from '@ngrx/store';
import {EncaminhamentoAppState, getEncaminhamentoAppState, ProcessoState} from '../reducers';

export const getProcessoState = createSelector(
    getEncaminhamentoAppState,
    (state: EncaminhamentoAppState) => state.processo
);

export const getIsSaving = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.saving
);

export const getErrors = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.errors
);
