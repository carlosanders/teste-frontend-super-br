import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {UsuariosListReducer, UsuariosListState} from './usuarios-list.reducer';

export interface UsuariosListAppState
{
    usuariosList: UsuariosListState;
}

export const getUsuariosListAppState = createFeatureSelector<UsuariosListAppState>(
    'coordenador-usuarios-list-app'
);

export const getAppState: any = createSelector(
    getUsuariosListAppState,
    (state: UsuariosListAppState) => state
);

export const reducers: ActionReducerMap<UsuariosListAppState> = {
    usuariosList: UsuariosListReducer
};

export * from './usuarios-list.reducer';
