import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ModelosReducer, ModelosState} from './modelos.reducer';
import {ComponenteDigitalReducer, ComponenteDigitalState} from './componentes-digitais.reducer';

export interface DocumentoAvulsoEditModelosAppState
{
    modelos: ModelosState;
    componentesDigitais: ComponenteDigitalState;
}

export const getDocumentoAvulsoEditModelosAppState = createFeatureSelector<DocumentoAvulsoEditModelosAppState>(
    'documento-avulso-edit-modelos-app'
);

export const getAppState: any = createSelector(
    getDocumentoAvulsoEditModelosAppState,
    (state: DocumentoAvulsoEditModelosAppState) => state
);

export const reducers: ActionReducerMap<DocumentoAvulsoEditModelosAppState> = {
    modelos: ModelosReducer,
    componentesDigitais: ComponenteDigitalReducer
};

export * from './modelos.reducer';
export * from './componentes-digitais.reducer';
