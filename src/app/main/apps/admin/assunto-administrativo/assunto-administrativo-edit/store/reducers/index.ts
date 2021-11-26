import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AssuntoAdministrativoEditReducer, AssuntoAdministrativoEditState} from './assunto-administrativo-edit.reducer';

export interface AssuntoAdministrativoEditAppState {
    assuntoAdministrativo: AssuntoAdministrativoEditState;
}

export const getAssuntoAdministrativoEditAppState = createFeatureSelector<AssuntoAdministrativoEditAppState>(
    'assunto-administrativo-edit-app'
);

export const getAppState: any = createSelector(
    getAssuntoAdministrativoEditAppState,
    (state: AssuntoAdministrativoEditAppState) => state
);

export const reducers: ActionReducerMap<AssuntoAdministrativoEditAppState> = {
    assuntoAdministrativo: AssuntoAdministrativoEditReducer
};

export * from './assunto-administrativo-edit.reducer';
