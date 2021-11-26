import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RepositoriosReducer, RepositoriosState} from './repositorios.reducer';
import {ComponenteDigitalReducer, ComponenteDigitalState} from './componentes-digitais.reducer';

export interface DocumentoEditInteligenciaAppState
{
    repositorios: RepositoriosState;
    componentesDigitais: ComponenteDigitalState;
}

export const getDocumentoEditInteligenciaAppState = createFeatureSelector<DocumentoEditInteligenciaAppState>(
    'documento-edit-inteligencia-app'
);

export const getAppState: any = createSelector(
    getDocumentoEditInteligenciaAppState,
    (state: DocumentoEditInteligenciaAppState) => state
);

export const reducers: ActionReducerMap<DocumentoEditInteligenciaAppState> = {
    repositorios: RepositoriosReducer,
    componentesDigitais: ComponenteDigitalReducer
};

export * from './repositorios.reducer';
export * from './componentes-digitais.reducer';
