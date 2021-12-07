import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ProcessoEtiquetaViewReducer, ProcessoEtiquetaViewState} from './processo-etiqueta-view.reducer';

export interface ProcessoEtiquetaViewAppState
{
    processoEtiquetaView: ProcessoEtiquetaViewState;
}

export const getProcessoEtiquetaViewAppState = createFeatureSelector<ProcessoEtiquetaViewAppState>(
    'processo-etiqueta-view-app'
);

export const getAppState: any = createSelector(
    getProcessoEtiquetaViewAppState,
    (state: ProcessoEtiquetaViewAppState) => state
);

export const reducers: ActionReducerMap<ProcessoEtiquetaViewAppState> = {
    processoEtiquetaView: ProcessoEtiquetaViewReducer
};

export * from './processo-etiqueta-view.reducer';
