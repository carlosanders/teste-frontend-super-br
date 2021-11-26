import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {UsuarioEditReducer, UsuarioEditState} from './usuario-edit.reducer';

export interface UsuarioEditAppState
{
    usuario: UsuarioEditState;
}

export const getUsuarioEditAppState = createFeatureSelector<UsuarioEditAppState>(
    'usuario-edit-app'
);

export const getAppState: any = createSelector(
    getUsuarioEditAppState,
    (state: UsuarioEditAppState) => state
);

export const reducers: ActionReducerMap<UsuarioEditAppState> = {
    usuario: UsuarioEditReducer
};

export * from './usuario-edit.reducer';
