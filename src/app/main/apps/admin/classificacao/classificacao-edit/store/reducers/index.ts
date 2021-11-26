import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ClassificacaoEditReducer, ClassificacaoEditState} from './classificacao-edit.reducer';

export interface ClassificacaoEditAppState {
    classificacao: ClassificacaoEditState;
}

export const getClassificacaoEditAppState = createFeatureSelector<ClassificacaoEditAppState>(
    'classificacao-edit-app'
);

export const getAppState: any = createSelector(
    getClassificacaoEditAppState,
    (state: ClassificacaoEditAppState) => state
);

export const reducers: ActionReducerMap<ClassificacaoEditAppState> = {
    classificacao: ClassificacaoEditReducer
};

export * from './classificacao-edit.reducer';
