import {getTarefaDetailAppState, ProcessoState, TarefaDetailAppState} from '../reducers';
import {createSelector} from '@ngrx/store';

export const getProcessoState = createSelector(
    getTarefaDetailAppState,
    (state: TarefaDetailAppState) => state.processo
);

export const expandirTela = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.expandir
);

