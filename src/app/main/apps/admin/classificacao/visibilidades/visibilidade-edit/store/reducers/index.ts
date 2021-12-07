import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ClassificacaoVisibilidadeEditReducer, ClassificacaoVisibilidadeEditState} from './visibilidade-edit.reducer';

export interface ClassificacaoVisibilidadeEditAppState
{
    classificacaoVisibilidade: ClassificacaoVisibilidadeEditState;
}

export const getClassificacaoVisibilidadeEditAppState = createFeatureSelector<ClassificacaoVisibilidadeEditAppState>(
    'classificacao-visibilidade-edit-app'
);

export const getAppState: any = createSelector(
    getClassificacaoVisibilidadeEditAppState,
    (state: ClassificacaoVisibilidadeEditAppState) => state
);

export const reducers: ActionReducerMap<ClassificacaoVisibilidadeEditAppState> = {
    classificacaoVisibilidade: ClassificacaoVisibilidadeEditReducer
};

export * from './visibilidade-edit.reducer';
