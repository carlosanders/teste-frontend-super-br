import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ModelosReducer, ModelosState} from './modelos.reducer';
import {ComponenteDigitalReducer, ComponenteDigitalState} from './componentes-digitais.reducer';

export interface DocumentoEditModelosAppState
{
    modelos: ModelosState;
    componentesDigitais: ComponenteDigitalState;
}

export const getDocumentoEditModelosAppState = createFeatureSelector<DocumentoEditModelosAppState>(
    'documento-edit-modelos-app'
);

export const getAppState = createSelector(
    getDocumentoEditModelosAppState,
    (state: DocumentoEditModelosAppState) => state
);

export const reducers: ActionReducerMap<DocumentoEditModelosAppState> = {
    modelos: ModelosReducer,
    componentesDigitais: ComponenteDigitalReducer
};

export * from './modelos.reducer';
export * from './componentes-digitais.reducer';
