import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {UsuariosExternosListReducer, UsuariosExternosListState} from './usuarios-externos-list.reducer';

export interface UsuariosExternosListAppState {
    usuariosExternosList: UsuariosExternosListState;
}

export const getUsuariosExternosListAppState = createFeatureSelector<UsuariosExternosListAppState>(
    'usuarios-externos-list'
);

export const getAppState: any = createSelector(
    getUsuariosExternosListAppState,
    (state: UsuariosExternosListAppState) => state
);

export const reducers: ActionReducerMap<UsuariosExternosListAppState> = {
    usuariosExternosList: UsuariosExternosListReducer
};

export * from './usuarios-externos-list.reducer';
