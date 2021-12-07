import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ClassificacaoVisibilidadeListReducer, ClassificacaoVisibilidadeListState} from './visibilidade-list.reducer';

export interface ClassificacaoVisibilidadeListAppState
{
    classificacaoVisibilidadeList: ClassificacaoVisibilidadeListState;
}

export const getClassificacaoVisibilidadeListAppState = createFeatureSelector<ClassificacaoVisibilidadeListAppState>(
    'classificacao-visibilidade-list-app'
);

export const getAppState: any = createSelector(
    getClassificacaoVisibilidadeListAppState,
    (state: ClassificacaoVisibilidadeListAppState) => state
);

export const reducers: ActionReducerMap<ClassificacaoVisibilidadeListAppState> = {
    classificacaoVisibilidadeList: ClassificacaoVisibilidadeListReducer
};

export * from './visibilidade-list.reducer';
