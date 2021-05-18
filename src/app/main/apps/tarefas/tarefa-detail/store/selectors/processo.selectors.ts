import {ProcessoState} from '../reducers';
import {createSelector} from '@ngrx/store';
import {getTarefaDetailAppState, TarefaDetailAppState} from '../reducers';

export const getProcessoState = createSelector(
    getTarefaDetailAppState,
    (state: TarefaDetailAppState) => state.processo
);

export const expandirTela = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.expandir
);

