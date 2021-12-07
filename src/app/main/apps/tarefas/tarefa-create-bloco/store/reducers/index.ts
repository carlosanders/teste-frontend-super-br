import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {TarefaCreateBlocoReducer, TarefaCreateBlocoState} from './tarefa-create-bloco.reducer';

// import { TarefaCreateBlocoDocumentosReducer, TarefaCreateBlocoDocumentosState } from './documentos.reducer';

export interface TarefaCreateBlocoAppState
{
    tarefaCreateBloco: TarefaCreateBlocoState;
    // tarefaCreateBlocoDocumentos: TarefaCreateBlocoDocumentosState;
}

export const getTarefaCreateBlocoAppState = createFeatureSelector<TarefaCreateBlocoAppState>(
    'tarefa-create-bloco-app'
);

export const getAppState: any = createSelector(
    getTarefaCreateBlocoAppState,
    (state: TarefaCreateBlocoAppState) => state
);

export const reducers: ActionReducerMap<TarefaCreateBlocoAppState> = {
    tarefaCreateBloco: TarefaCreateBlocoReducer,
    // tarefaCreateBlocoDocumentos: TarefaCreateBlocoDocumentosReducer
};

export * from './tarefa-create-bloco.reducer';
// export * from './documentos.reducer';
