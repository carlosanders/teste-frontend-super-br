import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {DocumentosReducer, DocumentosState} from './documentos.reducer';
import {ComponenteDigitalReducer, ComponenteDigitalState} from './componentes-digitais.reducer';

export interface TarefaOficiosAppState
{
    documentos: DocumentosState;
    componentesDigitais: ComponenteDigitalState;
}

export const getTarefaOficiosAppState = createFeatureSelector<TarefaOficiosAppState>(
    'oficios-app'
);

export const getAppState: any = createSelector(
    getTarefaOficiosAppState,
    (state: TarefaOficiosAppState) => state
);

export const reducers: ActionReducerMap<TarefaOficiosAppState> = {
    documentos: DocumentosReducer,
    componentesDigitais: ComponenteDigitalReducer
};

export * from './documentos.reducer';
export * from './componentes-digitais.reducer';
