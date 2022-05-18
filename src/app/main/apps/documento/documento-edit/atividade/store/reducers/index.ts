import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {atividadeDocumentoReducer, AtividadeDocumentoState} from './atividade-documento.reducer';
import {componenteDigitalReducer, ComponenteDigitalState} from './componentes-digitais.reducer';
import {documentosReducer, DocumentosState} from './documentos.reducer';
import {documentosVinculadosReducer, DocumentosVinculadosState} from './documentos-vinculados.reducer';

export interface DocumentoEditAtividadeAppState
{
    atividadeDocumento: AtividadeDocumentoState;
    componentesDigitais: ComponenteDigitalState;
    documentos: DocumentosState;
    documentosVinculados: DocumentosVinculadosState;
}

export const getDocumentoEditAtividadeAppState = createFeatureSelector<DocumentoEditAtividadeAppState>(
    'documento-edit-atividade-app'
);

export const getAppState: any = createSelector(
    getDocumentoEditAtividadeAppState,
    (state: DocumentoEditAtividadeAppState) => state
);

export const reducers: ActionReducerMap<DocumentoEditAtividadeAppState> = {
    atividadeDocumento: atividadeDocumentoReducer,
    componentesDigitais: componenteDigitalReducer,
    documentos: documentosReducer,
    documentosVinculados: documentosVinculadosReducer,
};

export * from './atividade-documento.reducer';
export * from './componentes-digitais.reducer';
export * from './documentos.reducer';
export * from './documentos-vinculados.reducer';
