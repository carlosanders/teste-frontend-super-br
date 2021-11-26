import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AssuntoAdministrativoListReducer, AssuntoAdministrativoListState} from './assunto-administrativo-list.reducer';

export interface AssuntoAdministrativoListAppState {
    assuntoAdministrativoList: AssuntoAdministrativoListState;
}

export const getAssuntoAdministrativoListAppState = createFeatureSelector<AssuntoAdministrativoListAppState>(
    'assunto-administrativo-list'
);

export const getAppState: any = createSelector(
    getAssuntoAdministrativoListAppState,
    (state: AssuntoAdministrativoListAppState) => state
);

export const reducers: ActionReducerMap<AssuntoAdministrativoListAppState> = {
    assuntoAdministrativoList: AssuntoAdministrativoListReducer
};

export * from './assunto-administrativo-list.reducer';
