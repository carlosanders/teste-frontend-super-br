import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {VinculacaoUsuarioEditReducer, VinculacaoUsuarioEditState} from './vinculacao-usuario-edit.reducer';

export interface VinculacaoUsuarioEditAppState
{
    vinculacaoUsuario: VinculacaoUsuarioEditState;
}

export const getVinculacaoUsuarioEditAppState = createFeatureSelector<VinculacaoUsuarioEditAppState>(
    'vinculacao-usuario-edit-app'
);

export const getAppState: any = createSelector(
    getVinculacaoUsuarioEditAppState,
    (state: VinculacaoUsuarioEditAppState) => state
);

export const reducers: ActionReducerMap<VinculacaoUsuarioEditAppState> = {
    vinculacaoUsuario: VinculacaoUsuarioEditReducer
};

export * from './vinculacao-usuario-edit.reducer';
