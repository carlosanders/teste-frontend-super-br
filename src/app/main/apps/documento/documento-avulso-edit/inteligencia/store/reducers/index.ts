import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RepositoriosReducer, RepositoriosState} from './repositorios.reducer';
import {ComponenteDigitalReducer, ComponenteDigitalState} from './componentes-digitais.reducer';

export interface DocumentoAvulsoEditInteligenciaAppState
{
    repositorios: RepositoriosState;
    componentesDigitais: ComponenteDigitalState;
}

export const getDocumentoAvulsoEditInteligenciaAppState = createFeatureSelector<DocumentoAvulsoEditInteligenciaAppState>(
    'documento-avulso-edit-inteligencia-app'
);

export const getAppState: any = createSelector(
    getDocumentoAvulsoEditInteligenciaAppState,
    (state: DocumentoAvulsoEditInteligenciaAppState) => state
);

export const reducers: ActionReducerMap<DocumentoAvulsoEditInteligenciaAppState> = {
    repositorios: RepositoriosReducer,
    componentesDigitais: ComponenteDigitalReducer
};

export * from './repositorios.reducer';
export * from './componentes-digitais.reducer';
