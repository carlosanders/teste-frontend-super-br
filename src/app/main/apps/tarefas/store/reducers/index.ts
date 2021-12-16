import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {TarefasReducer, TarefasState} from './tarefas.reducer';
import {FoldersReducer, FoldersState} from './folders.reducer';
import {RootLotacaoListReducer, RootLotacaoListState} from './lotacao.reducer';
import {RootUnidadeReducer, RootUnidadeState} from './unidade.reducer';
import {RootSetorReducer, RootSetorState} from './setor.reducer';
import {AssinaturasReducer, AssinaturasState} from './assinaturas.reducer';
import {componenteDigitalReducer, ComponenteDigitalState} from './componentes-digitais.reducer';

export interface TarefasAppState
{
    tarefas: TarefasState;
    folders: FoldersState;
    lotacaoList: RootLotacaoListState;
    unidades: RootUnidadeState;
    setores: RootSetorState;
    assinaturas: AssinaturasState;
    componentesDigitais: ComponenteDigitalState
}
export const getTarefasAppState = createFeatureSelector<TarefasAppState>(
    'tarefas-app'
);

export const getRootLotacaoListAppState = createFeatureSelector<TarefasAppState>(
    'admin-lotacao-list-app'
);

export const getAppState: any = createSelector(
    getTarefasAppState,
    getRootLotacaoListAppState,
    (state: TarefasAppState) => state
);

export const reducers: ActionReducerMap<TarefasAppState> = {
    tarefas: TarefasReducer,
    folders: FoldersReducer,
    lotacaoList: RootLotacaoListReducer,
    unidades: RootUnidadeReducer,
    setores: RootSetorReducer,
    assinaturas: AssinaturasReducer,
    componentesDigitais: componenteDigitalReducer
};

export * from './tarefas.reducer';
export * from './folders.reducer';
export * from './lotacao.reducer';
export * from './unidade.reducer';
export * from './setor.reducer';
export * from './assinaturas.reducer';
export * from './componentes-digitais.reducer';
