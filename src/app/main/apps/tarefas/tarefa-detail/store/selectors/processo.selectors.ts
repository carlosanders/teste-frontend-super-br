import {ProcessoState} from '../reducers/processo.reducer';
import {createSelector} from '@ngrx/store';
import {getTarefaDetailAppState, TarefaDetailAppState} from '../reducers';

export const getEtiquetaState = createSelector(
    getTarefaDetailAppState,
    (state: TarefaDetailAppState) => state.processo
);

export const expandirTela = createSelector(
    getEtiquetaState,
    (state: ProcessoState) => state.expandir
);

