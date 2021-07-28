import {createSelector} from '@ngrx/store';
import {getProcessoRelatorioViewAppState, ProcessoRelatorioViewAppState, ProcessoRelatorioViewState} from '../reducers';

export const getProcessoRelatorioViewState = createSelector(
    getProcessoRelatorioViewAppState,
    (state: ProcessoRelatorioViewAppState) => state.processoRelatorioView
);

export const getBinary = createSelector(
    getProcessoRelatorioViewState,
    (state: ProcessoRelatorioViewState) => state.binary
);

export const getHasLoaded = createSelector(
    getProcessoRelatorioViewState,
    (state: ProcessoRelatorioViewState) => state.loaded
);

