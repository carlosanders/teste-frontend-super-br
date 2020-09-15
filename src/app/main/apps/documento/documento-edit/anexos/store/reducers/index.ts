import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { DocumentosVinculadosReducer, DocumentosVinculadosState } from './documentos-vinculados.reducer';
import {ComponenteDigitalState, ComponenteDigitalReducer} from '../../../store/reducers';

export interface DocumentoEditAnexosAppState
{
    documentosVinculados: DocumentosVinculadosState;
    componentesDigitais: ComponenteDigitalState;
}

export const getDocumentoEditAnexosAppState = createFeatureSelector<DocumentoEditAnexosAppState>(
    'documento-edit-anexos-app'
);

export const getAppState = createSelector(
    getDocumentoEditAnexosAppState,
    (state: DocumentoEditAnexosAppState) => state
);

export const reducers: ActionReducerMap<DocumentoEditAnexosAppState> = {
    documentosVinculados: DocumentosVinculadosReducer,
    componentesDigitais: ComponenteDigitalReducer
};

export * from './documentos-vinculados.reducer';
export * from './componentes-digitais.reducer';
