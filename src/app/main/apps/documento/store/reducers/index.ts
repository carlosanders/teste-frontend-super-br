import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { DocumentoReducer, DocumentoState } from './documento.reducer';
import { RepositoriosReducer, RepositoriosState } from './repositorios.reducer';
import { DocumentoAvulsoReducer, DocumentoAvulsoState } from './documento-avulso.reducer';
import { DocumentosVinculadosReducer, DocumentosVinculadosState } from './documentos-vinculados.reducer';
import { ComponenteDigitalReducer, ComponenteDigitalState } from './componentes-digitais.reducer';
import { AtividadeDocumentoReducer, AtividadeDocumentoState } from './atividade-documento.reducer';
import {VisibilidadeReducer, VisibilidadeState} from './visibilidade.reducer';
import {SigilosReducer, SigilosState} from './sigilos.reducer';
import {AssinaturasReducer, AssinaturasState} from './assinaturas.reducer';
import {JuntadaReducer, JuntadaState} from './juntada.reducer';

export interface DocumentoAppState
{
    documento: DocumentoState;
    repositorios: RepositoriosState;
    documentoAvulso: DocumentoAvulsoState;
    documentosVinculados: DocumentosVinculadosState;
    componentesDigitais: ComponenteDigitalState;
    atividadeDocumento: AtividadeDocumentoState;
    visibilidades: VisibilidadeState;
    sigilos: SigilosState;
    assinaturas: AssinaturasState;
    juntada: JuntadaState;
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
    documentoAvulso: DocumentoAvulsoReducer,
    documentosVinculados: DocumentosVinculadosReducer,
    componentesDigitais: ComponenteDigitalReducer,
    atividadeDocumento: AtividadeDocumentoReducer,
    visibilidades: VisibilidadeReducer,
    sigilos: SigilosReducer,
    assinaturas: AssinaturasReducer,
    juntada: JuntadaReducer
};

export * from './documento.reducer';
export * from './repositorios.reducer';
export * from './documento-avulso.reducer';
export * from './documentos-vinculados.reducer';
export * from './componentes-digitais.reducer';
export * from './atividade-documento.reducer';
export * from './visibilidade.reducer';
export * from './sigilos.reducer';
export * from './assinaturas.reducer';
export * from './juntada.reducer';
