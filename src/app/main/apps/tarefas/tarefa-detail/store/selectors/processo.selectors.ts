import {getTarefaDetailAppState, ProcessoState, TarefaDetailAppState} from '../reducers';
import {createSelector} from '@ngrx/store';

export const getProcessoState: any = createSelector(
    getTarefaDetailAppState,
    (state: TarefaDetailAppState) => state.processo
);

export const expandirTela: any = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.expandir
);

