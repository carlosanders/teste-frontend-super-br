import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {DocumentosVinculadosReducer, DocumentosVinculadosState} from './documentos-vinculados.reducer';
import {DocumentoReducer, DocumentoState} from './documento.reducer';
import {RepositoriosReducer, RepositoriosState} from './repositorios.reducer';
import {ComponenteDigitalReducer, ComponenteDigitalState} from './componentes-digitais.reducer';

export interface DocumentoAvulsoEditAppState {
    documento: DocumentoState;
    documentosVinculados: DocumentosVinculadosState;
    componentesDigitais: ComponenteDigitalState;
    repositorios: RepositoriosState;
}

export const getDocumentoAvulsoEditAppState = createFeatureSelector<DocumentoAvulsoEditAppState>(
    'documento-avulso-edit-app'
);

export const getAppState = createSelector(
    getDocumentoAvulsoEditAppState,
    (state: DocumentoAvulsoEditAppState) => state
);

export const reducers: ActionReducerMap<DocumentoAvulsoEditAppState> = {
    documento: DocumentoReducer,
    documentosVinculados: DocumentosVinculadosReducer,
    componentesDigitais: ComponenteDigitalReducer,
    repositorios: RepositoriosReducer
};

export * from './documento.reducer';
export * from './documentos-vinculados.reducer';
export * from './repositorios.reducer';
export * from './componentes-digitais.reducer';
