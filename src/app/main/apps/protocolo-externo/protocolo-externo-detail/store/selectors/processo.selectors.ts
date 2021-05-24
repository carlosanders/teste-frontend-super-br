import {ProcessoState} from '../reducers/processo.reducer';
import {createSelector} from '@ngrx/store';
import {getProcessoDetailAppState, ProcessoDetailAppState} from '../reducers';

export const getProcessoState = createSelector(
    getProcessoDetailAppState,
    (state: ProcessoDetailAppState) => state.processo
);

export const expandirTela = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.expandir
);

