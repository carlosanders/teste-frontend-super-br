import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {UsuariosExternosEditReducer, UsuariosExternosEditState} from './usuarios-externos-edit.reducer';

export interface UsuariosExternosEditAppState {
    usuariosExternos: UsuariosExternosEditState;
}

export const getUsuariosExternosEditAppState = createFeatureSelector<UsuariosExternosEditAppState>(
    'usuarios-externos-edit-app'
);

export const getAppState: any = createSelector(
    getUsuariosExternosEditAppState,
    (state: UsuariosExternosEditAppState) => state
);

export const reducers: ActionReducerMap<UsuariosExternosEditAppState> = {
    usuariosExternos: UsuariosExternosEditReducer
};

export * from './usuarios-externos-edit.reducer';
