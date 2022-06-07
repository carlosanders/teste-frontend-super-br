import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {
    documentoAvulsoEditDadosBasicosReducer,
    DocumentoAvulsoEditDadosBasicosState
} from './documento-avulso-edit.reducer';
import {componenteDigitalReducer, ComponenteDigitalState} from './componentes-digitais.reducer';
import {documentosVinculadosReducer, DocumentosVinculadosState} from './documentos-vinculados.reducer';
import {documentosReducer, DocumentosState} from './documentos.reducer';

export interface DocumentoAvulsoEditDadosBasicosAppState
{
    documentoAvulso: DocumentoAvulsoEditDadosBasicosState;
    componentesDigitais: ComponenteDigitalState;
    documentosVinculados: DocumentosVinculadosState;
    documentos: DocumentosState;
}

export const getDocumentoAvulsoEditDadosBasicosAppState = createFeatureSelector<DocumentoAvulsoEditDadosBasicosAppState>(
    'documento-avulso-edit-dados-basicos-app'
);

export const getAppState: any = createSelector(
    getDocumentoAvulsoEditDadosBasicosAppState,
    (state: DocumentoAvulsoEditDadosBasicosAppState) => state
);

export const reducers: ActionReducerMap<DocumentoAvulsoEditDadosBasicosAppState> = {
    documentoAvulso: documentoAvulsoEditDadosBasicosReducer,
    componentesDigitais: componenteDigitalReducer,
    documentosVinculados: documentosVinculadosReducer,
    documentos: documentosReducer
};

export * from './componentes-digitais.reducer';
export * from './documento-avulso-edit.reducer';
export * from './documentos-vinculados.reducer';
export * from './documentos.reducer';
