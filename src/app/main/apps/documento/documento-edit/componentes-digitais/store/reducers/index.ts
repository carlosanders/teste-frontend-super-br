import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {componenteDigitalReducer, ComponenteDigitalState} from './componentes-digitais.reducer';

export interface DocumentoEditComponentesDigitaisAppState
{
    componentesDigitais: ComponenteDigitalState;
}

export const getDocumentoEditComponentesDigitaisAppState = createFeatureSelector<DocumentoEditComponentesDigitaisAppState>(
    'documento-edit-componentes-digitais-app'
);

export const getAppState: any = createSelector(
    getDocumentoEditComponentesDigitaisAppState,
    (state: DocumentoEditComponentesDigitaisAppState) => state
);

export const reducers: ActionReducerMap<DocumentoEditComponentesDigitaisAppState> = {
    componentesDigitais: componenteDigitalReducer
};

export * from './componentes-digitais.reducer';
