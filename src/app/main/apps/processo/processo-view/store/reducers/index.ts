import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {processoViewReducer, ProcessoViewState} from './processo-view.reducer';
import {componenteDigitalReducer, ComponenteDigitalState} from './componentes-digitais.reducer';
import {processoViewDocumentosReducer, ProcessoViewDocumentosState} from './documentos.reducer';
import {volumesReducer, VolumesState} from './volumes.reducer';
import {documentosVinculadosReducer, DocumentosVinculadosState} from './documentos-vinculados.reducer';
import {bookmarkReducer, BookmarksState} from './bookmark.reducer';
import {assinaturasReducer, AssinaturasState} from './assinaturas.reducer';

export interface ProcessoViewAppState
{
    processoView: ProcessoViewState;
    componentesDigitais: ComponenteDigitalState;
    documentos: ProcessoViewDocumentosState;
    volumes: VolumesState;
    documentosVinculados: DocumentosVinculadosState;
    bookmark: BookmarksState;
    assinaturas: AssinaturasState;
}

export const getProcessoViewAppState = createFeatureSelector<ProcessoViewAppState>(
    'processo-view-app'
);

export const getAppState: any = createSelector(
    getProcessoViewAppState,
    (state: ProcessoViewAppState) => state
);

export const reducers: ActionReducerMap<ProcessoViewAppState> = {
    processoView: processoViewReducer,
    componentesDigitais: componenteDigitalReducer,
    documentos: processoViewDocumentosReducer,
    volumes: volumesReducer,
    documentosVinculados: documentosVinculadosReducer,
    bookmark: bookmarkReducer,
    assinaturas: assinaturasReducer
};

export * from './processo-view.reducer';
export * from './componentes-digitais.reducer';
export * from './documentos.reducer';
export * from './volumes.reducer';
export * from './documentos-vinculados.reducer';
export * from './bookmark.reducer';
export * from './assinaturas.reducer';
