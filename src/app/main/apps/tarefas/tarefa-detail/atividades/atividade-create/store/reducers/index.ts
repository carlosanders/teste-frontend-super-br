import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {atividadeCreateReducer, AtividadeCreateState} from './atividade-create.reducer';
import {atividadeCreateDocumentosReducer, AtividadeCreateDocumentosState} from './documentos.reducer';
import {componenteDigitalReducer, ComponenteDigitalState} from './componentes-digitais.reducer';

export interface AtividadeCreateAppState
{
    atividadeCreate: AtividadeCreateState;
    atividadeCreateDocumentos: AtividadeCreateDocumentosState;
    componentesDigitais: ComponenteDigitalState;
}

export const getAtividadeCreateAppState = createFeatureSelector<AtividadeCreateAppState>(
    'atividade-create-app'
);

export const getAppState: any = createSelector(
    getAtividadeCreateAppState,
    (state: AtividadeCreateAppState) => state
);

export const reducers: ActionReducerMap<AtividadeCreateAppState> = {
    atividadeCreate: atividadeCreateReducer,
    atividadeCreateDocumentos: atividadeCreateDocumentosReducer,
    componentesDigitais: componenteDigitalReducer
};

export * from './atividade-create.reducer';
export * from './documentos.reducer';
export * from './componentes-digitais.reducer';
