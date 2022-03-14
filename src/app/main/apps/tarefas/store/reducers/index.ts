import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {tarefasReducer, TarefasState} from './tarefas.reducer';
import {FoldersReducer, FoldersState} from './folders.reducer';
import {RootLotacaoListReducer, RootLotacaoListState} from './lotacao.reducer';
import {RootUnidadeReducer, RootUnidadeState} from './unidade.reducer';
import {RootSetorReducer, RootSetorState} from './setor.reducer';
import {assinaturasReducer, AssinaturasState} from './assinaturas.reducer';
import {componenteDigitalReducer, ComponenteDigitalState} from './componentes-digitais.reducer';
import {tarefasDocumentosReducer, TarefasDocumentosState} from './documentos.reducer';
import {documentosVinculadosReducer, DocumentosVinculadosState} from './documentos-vinculados.reducer';

export interface TarefasAppState
{
    tarefas: TarefasState;
    folders: FoldersState;
    lotacaoList: RootLotacaoListState;
    unidades: RootUnidadeState;
    setores: RootSetorState;
    assinaturas: AssinaturasState;
    componentesDigitais: ComponenteDigitalState;
    documentos: TarefasDocumentosState;
    documentosVinculados: DocumentosVinculadosState;
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
    tarefas: tarefasReducer,
    folders: FoldersReducer,
    lotacaoList: RootLotacaoListReducer,
    unidades: RootUnidadeReducer,
    setores: RootSetorReducer,
    assinaturas: assinaturasReducer,
    componentesDigitais: componenteDigitalReducer,
    documentos: tarefasDocumentosReducer,
    documentosVinculados: documentosVinculadosReducer
};

export * from './tarefas.reducer';
export * from './folders.reducer';
export * from './lotacao.reducer';
export * from './unidade.reducer';
export * from './setor.reducer';
export * from './assinaturas.reducer';
export * from './componentes-digitais.reducer';
export * from './documentos.reducer';
export * from './documentos-vinculados.reducer';
