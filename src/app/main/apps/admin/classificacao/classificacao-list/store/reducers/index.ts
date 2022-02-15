import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ClassificacaoListReducer, ClassificacaoListState} from './classificacao-list.reducer';

export interface ClassificacaoListAppState {
    classificacaoList: ClassificacaoListState;
}

export const getClassificacaoListAppState = createFeatureSelector<ClassificacaoListAppState>(
    'classificacao-list'
);

export const getAppState: any = createSelector(
    getClassificacaoListAppState,
    (state: ClassificacaoListAppState) => state
);

export const reducers: ActionReducerMap<ClassificacaoListAppState> = {
    classificacaoList: ClassificacaoListReducer
};

export * from './classificacao-list.reducer';
