import {createSelector} from '@ngrx/store';
import {getProcessoEtiquetaViewAppState, ProcessoEtiquetaViewAppState, ProcessoEtiquetaViewState} from '../reducers';

export const getProcessoEtiquetaViewState = createSelector(
    getProcessoEtiquetaViewAppState,
    (state: ProcessoEtiquetaViewAppState) => state.processoEtiquetaView
);

export const getBinary = createSelector(
    getProcessoEtiquetaViewState,
    (state: ProcessoEtiquetaViewState) => state.binary
);

export const getHasLoaded = createSelector(
    getProcessoEtiquetaViewState,
    (state: ProcessoEtiquetaViewState) => state.loaded
);

