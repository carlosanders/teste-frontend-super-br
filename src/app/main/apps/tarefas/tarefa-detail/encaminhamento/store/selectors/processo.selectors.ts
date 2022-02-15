import {createSelector} from '@ngrx/store';
import {EncaminhamentoAppState, getEncaminhamentoAppState, ProcessoState} from '../reducers';

export const getProcessoState: any = createSelector(
    getEncaminhamentoAppState,
    (state: EncaminhamentoAppState) => state.processo
);

export const getIsSaving: any = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.saving
);

export const getErrors: any = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.errors
);
