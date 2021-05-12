import {createSelector} from '@ngrx/store';
import {ArquivistaDetailAppState, getArquivistaDetailAppState, ProcessoState} from '../reducers';

export const getProcessoState = createSelector(
    getArquivistaDetailAppState,
    (state: ArquivistaDetailAppState) => state.processo
);

export const expandirTela = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.expandir
);

export const getIsSaving = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.saving
);

export const getErrors = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.errors
);

