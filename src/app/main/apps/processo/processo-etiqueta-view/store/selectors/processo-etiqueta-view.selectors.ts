import {createSelector} from '@ngrx/store';
import {getProcessoEtiquetaViewAppState, ProcessoEtiquetaViewAppState, ProcessoEtiquetaViewState} from '../reducers';

export const getProcessoEtiquetaViewState: any = createSelector(
    getProcessoEtiquetaViewAppState,
    (state: ProcessoEtiquetaViewAppState) => state.processoEtiquetaView
);

export const getBinary: any = createSelector(
    getProcessoEtiquetaViewState,
    (state: ProcessoEtiquetaViewState) => state.binary
);

export const getHasLoaded: any = createSelector(
    getProcessoEtiquetaViewState,
    (state: ProcessoEtiquetaViewState) => state.loaded
);

