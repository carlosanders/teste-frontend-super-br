import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {documentosVinculadosReducer, DocumentosVinculadosState} from './documentos-vinculados.reducer';
import {ComponenteDigitalReducer, ComponenteDigitalState} from './componentes-digitais.reducer';

export interface DocumentoEditAnexosAppState
{
    documentosVinculados: DocumentosVinculadosState;
    componentesDigitais: ComponenteDigitalState;
}

export const getDocumentoEditAnexosAppState = createFeatureSelector<DocumentoEditAnexosAppState>(
    'documento-edit-anexos-app'
);

export const getAppState: any = createSelector(
    getDocumentoEditAnexosAppState,
    (state: DocumentoEditAnexosAppState) => state
);

export const reducers: ActionReducerMap<DocumentoEditAnexosAppState> = {
    documentosVinculados: documentosVinculadosReducer,
    componentesDigitais: ComponenteDigitalReducer
};

export * from './documentos-vinculados.reducer';
export * from './componentes-digitais.reducer';
