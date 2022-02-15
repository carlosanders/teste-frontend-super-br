import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ClassificacaoTreeListReducer, ClassificacaoTreeListState} from './classificacao-tree-list.reducer';

export interface ClassificacaoTreeListAppState {
    classificacaoTreeList: ClassificacaoTreeListState;
}

export const getClassificacaoTreeListAppState = createFeatureSelector<ClassificacaoTreeListAppState>(
    'classificacao-tree-list'
);

export const getAppState: any = createSelector(
    getClassificacaoTreeListAppState,
    (state: ClassificacaoTreeListAppState) => state
);

export const reducers: ActionReducerMap<ClassificacaoTreeListAppState> = {
    classificacaoTreeList: ClassificacaoTreeListReducer
};

export * from './classificacao-tree-list.reducer';
