import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ProcessoViewReducer, ProcessoViewState} from './processo-view.reducer';
import {ComponenteDigitalReducer, ComponenteDigitalState} from './componentes-digitais.reducer';
import {ProcessoViewDocumentosReducer, ProcessoViewDocumentosState} from './documentos.reducer';
import {volumesReducer, VolumesState} from './volumes.reducer';
import {DocumentosVinculadosReducer, DocumentosVinculadosState} from './documentos-vinculados.reducer';

export interface ProcessoViewAppState
{
    processoView: ProcessoViewState;
    componentesDigitais: ComponenteDigitalState;
    documentos: ProcessoViewDocumentosState;
    volumes: VolumesState;
    documentosVinculados: DocumentosVinculadosState
}

export const getProcessoViewAppState = createFeatureSelector<ProcessoViewAppState>(
    'processo-view-app'
);

export const getAppState = createSelector(
    getProcessoViewAppState,
    (state: ProcessoViewAppState) => state
);

export const reducers: ActionReducerMap<ProcessoViewAppState> = {
    processoView: ProcessoViewReducer,
    componentesDigitais: ComponenteDigitalReducer,
    documentos: ProcessoViewDocumentosReducer,
    volumes: volumesReducer,
    documentosVinculados: DocumentosVinculadosReducer
};

export * from './processo-view.reducer';
export * from './componentes-digitais.reducer';
export * from './documentos.reducer';
export * from './volumes.reducer';
export * from './documentos-vinculados.reducer';
