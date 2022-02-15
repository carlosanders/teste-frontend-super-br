import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {modelosReducer, ModelosState} from './modelos.reducer';
import {componenteDigitalReducer, ComponenteDigitalState} from './componentes-digitais.reducer';

export interface DocumentoEditModelosAppState
{
    modelos: ModelosState;
    componentesDigitais: ComponenteDigitalState;
}

export const getDocumentoEditModelosAppState = createFeatureSelector<DocumentoEditModelosAppState>(
    'documento-edit-modelos-app'
);

export const getAppState: any = createSelector(
    getDocumentoEditModelosAppState,
    (state: DocumentoEditModelosAppState) => state
);

export const reducers: ActionReducerMap<DocumentoEditModelosAppState> = {
    modelos: modelosReducer,
    componentesDigitais: componenteDigitalReducer
};

export * from './modelos.reducer';
export * from './componentes-digitais.reducer';
