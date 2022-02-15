import {createSelector} from '@ngrx/store';
import {getProcessoRelatorioViewAppState, ProcessoRelatorioViewAppState, ProcessoRelatorioViewState} from '../reducers';

export const getProcessoRelatorioViewState: any = createSelector(
    getProcessoRelatorioViewAppState,
    (state: ProcessoRelatorioViewAppState) => state.processoRelatorioView
);

export const getBinary: any = createSelector(
    getProcessoRelatorioViewState,
    (state: ProcessoRelatorioViewState) => state.binary
);

export const getHasLoaded: any = createSelector(
    getProcessoRelatorioViewState,
    (state: ProcessoRelatorioViewState) => state.loaded
);

