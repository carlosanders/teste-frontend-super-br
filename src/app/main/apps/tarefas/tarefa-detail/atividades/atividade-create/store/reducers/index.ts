import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AtividadeCreateReducer, AtividadeCreateState} from './atividade-create.reducer';
import {AtividadeCreateDocumentosReducer, AtividadeCreateDocumentosState} from './documentos.reducer';
import {ComponenteDigitalReducer, ComponenteDigitalState} from './componentes-digitais.reducer';

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
    atividadeCreate: AtividadeCreateReducer,
    atividadeCreateDocumentos: AtividadeCreateDocumentosReducer,
    componentesDigitais: ComponenteDigitalReducer
};

export * from './atividade-create.reducer';
export * from './documentos.reducer';
export * from './componentes-digitais.reducer';
