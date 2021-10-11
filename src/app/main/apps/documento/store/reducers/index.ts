import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {DocumentoReducer, DocumentoState} from './documento.reducer';
import {RepositoriosReducer, RepositoriosState} from './repositorios.reducer';
import {DocumentosVinculadosReducer, DocumentosVinculadosState} from './documentos-vinculados.reducer';
import {ComponenteDigitalReducer, ComponenteDigitalState} from './componentes-digitais.reducer';
import {AssinaturasReducer, AssinaturasState} from './assinaturas.reducer';
import {juntadasReducer, JuntadasState} from './juntadas.reducer';

export interface DocumentoAppState
{
    documento: DocumentoState;
    repositorios: RepositoriosState;
    documentosVinculados: DocumentosVinculadosState;
    componentesDigitais: ComponenteDigitalState;
    assinaturas: AssinaturasState;
    juntadas: JuntadasState;
}

export const getDocumentoAppState = createFeatureSelector<DocumentoAppState>(
    'documento-app'
);

export const getAppState = createSelector(
    getDocumentoAppState,
    (state: DocumentoAppState) => state
);

export const reducers: ActionReducerMap<DocumentoAppState> = {
    documento: DocumentoReducer,
    repositorios: RepositoriosReducer,
    documentosVinculados: DocumentosVinculadosReducer,
    componentesDigitais: ComponenteDigitalReducer,
    assinaturas: AssinaturasReducer,
    juntadas: juntadasReducer
};

export * from './documento.reducer';
export * from './repositorios.reducer';
export * from './documentos-vinculados.reducer';
export * from './componentes-digitais.reducer';
export * from './assinaturas.reducer';
export * from './juntadas.reducer';
