import {createSelector} from '@ngrx/store';
import {ArquivistaDetailAppState, getArquivistaDetailAppState, ProcessoState} from '../reducers';

export const getProcessoState: any = createSelector(
    getArquivistaDetailAppState,
    (state: ArquivistaDetailAppState) => state.processo
);

export const expandirTela: any = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.expandir
);

export const getIsSaving: any = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.saving
);

export const getErrors: any = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.errors
);

