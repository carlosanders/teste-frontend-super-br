import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { TarefasReducer, TarefasState } from './tarefas.reducer';
import { FoldersReducer, FoldersState } from './folders.reducer';
import { RootLotacaoListReducer, RootLotacaoListState } from './lotacao.reducer';
import {RootUnidadeReducer, RootUnidadeState} from "./unidade.reducer";
import {RootSetorReducer, RootSetorState} from "./setor.reducer";


export interface TarefasAppState
{
    tarefas: TarefasState;
    folders: FoldersState;
    lotacaoList: RootLotacaoListState;
    unidades: RootUnidadeState;
    setores: RootSetorState;

}
export const getTarefasAppState = createFeatureSelector<TarefasAppState>(
    'tarefas-app'
);


export const getRootLotacaoListAppState = createFeatureSelector<TarefasAppState>(
    'admin-lotacao-list-app'
);

export const getAppState = createSelector(
    getTarefasAppState,
    getRootLotacaoListAppState,
    (state: TarefasAppState) => state
);

export const reducers: ActionReducerMap<TarefasAppState> = {
    tarefas: TarefasReducer,
    folders: FoldersReducer,
    lotacaoList: RootLotacaoListReducer,
    unidades: RootUnidadeReducer,
    setores: RootSetorReducer
};


export * from './tarefas.reducer';
export * from './folders.reducer';
export * from './lotacao.reducer';
export * from './unidade.reducer';
export * from './setor.reducer';
