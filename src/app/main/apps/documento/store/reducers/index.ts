import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {DocumentoReducer, DocumentoState} from './documento.reducer';
import {RepositoriosReducer, RepositoriosState} from './repositorios.reducer';
import {DocumentosVinculadosReducer, DocumentosVinculadosState} from './documentos-vinculados.reducer';
import {ComponenteDigitalReducer, ComponenteDigitalState} from './componentes-digitais.reducer';
import {AssinaturasReducer, AssinaturasState} from './assinaturas.reducer';

export interface DocumentoAppState
{
    documento: DocumentoState;
    repositorios: RepositoriosState;
    documentosVinculados: DocumentosVinculadosState;
    componentesDigitais: ComponenteDigitalState;
    assinaturas: AssinaturasState;
}

export const getDocumentoAppState = createFeatureSelector<DocumentoAppState>(
    'documento-app'
);

export const getAppState: any = createSelector(
    getDocumentoAppState,
    (state: DocumentoAppState) => state
);

export const reducers: ActionReducerMap<DocumentoAppState> = {
    documento: DocumentoReducer,
    repositorios: RepositoriosReducer,
    documentosVinculados: DocumentosVinculadosReducer,
    componentesDigitais: ComponenteDigitalReducer,
    assinaturas: AssinaturasReducer
};

export * from './documento.reducer';
export * from './repositorios.reducer';
export * from './documentos-vinculados.reducer';
export * from './componentes-digitais.reducer';
export * from './assinaturas.reducer';
