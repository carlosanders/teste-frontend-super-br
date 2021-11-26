import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {
    AssuntoAdministrativoTreeListReducer,
    AssuntoAdministrativoTreeListState
} from './assunto-administrativo-tree-list.reducer';

export interface AssuntoAdministrativoTreeListAppState {
    assuntoAdministrativoTreeList: AssuntoAdministrativoTreeListState;
}

export const getAssuntoAdministrativoTreeListAppState = createFeatureSelector<AssuntoAdministrativoTreeListAppState>(
    'assunto-administrativo-tree-list'
);

export const getAppState: any = createSelector(
    getAssuntoAdministrativoTreeListAppState,
    (state: AssuntoAdministrativoTreeListAppState) => state
);

export const reducers: ActionReducerMap<AssuntoAdministrativoTreeListAppState> = {
    assuntoAdministrativoTreeList: AssuntoAdministrativoTreeListReducer
};

export * from './assunto-administrativo-tree-list.reducer';
