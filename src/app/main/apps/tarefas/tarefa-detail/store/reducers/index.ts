import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromStore from './';

export interface TarefaDetailAppState {
    tarefaDetail: fromStore.TarefaDetailState;
    etiqueta: fromStore.EtiquetaState;
    processo: fromStore.ProcessoState;
    documentos: fromStore.TarefaDetailDocumentosState;
    componentesDigitais: fromStore.ComponenteDigitalState;
    assinaturas: fromStore.AssinaturasState;
    documentosVinculados: fromStore.DocumentosVinculadosState;
}

export const getTarefaDetailAppState = createFeatureSelector<TarefaDetailAppState>(
    'tarefa-detail-app'
);

export const getAppState: any = createSelector(
    getTarefaDetailAppState,
    (state: TarefaDetailAppState) => state
);

export const reducers: ActionReducerMap<TarefaDetailAppState> = {
    tarefaDetail: fromStore.TarefaDetailReducer,
    etiqueta: fromStore.EtiquetaReducer,
    processo: fromStore.ProcessoReducer,
    documentos: fromStore.TarefaDetailDocumentosReducer,
    componentesDigitais: fromStore.ComponenteDigitalReducer,
    assinaturas: fromStore.AssinaturasReducer,
    documentosVinculados: fromStore.DocumentosVinculadosReducer,
};

export * from './tarefa-detail.reducer';
export * from './etiqueta.reducer';
export * from './processo.reducer';
export * from './documentos.reducer';
export * from './componentes-digitais.reducer';
export * from './assinaturas.reducer';
export * from './documentos-vinculados.reducer';
