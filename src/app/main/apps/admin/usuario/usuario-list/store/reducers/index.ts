import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import {UsuarioListReducer, UsuarioListState} from "./usuario-list.reducer";

export interface UsuarioListAppState
{
    usuarioList: UsuarioListState;
}

export const getUsuarioListAppState = createFeatureSelector<UsuarioListAppState>(
    'usuario-list-app'
);

export const getAppState = createSelector(
    getUsuarioListAppState,
    (state: UsuarioListAppState) => state
);

export const reducers: ActionReducerMap<UsuarioListAppState> = {
    usuarioList: UsuarioListReducer
};

export * from './usuario-list.reducer';