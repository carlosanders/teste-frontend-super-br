import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {VinculacaoUsuarioListReducer, VinculacaoUsuarioListState} from './vinculacao-usuario-list.reducer';

export interface VinculacaoUsuarioListAppState
{
    vinculacaoUsuarioList: VinculacaoUsuarioListState;
}

export const getVinculacaoUsuarioListAppState = createFeatureSelector<VinculacaoUsuarioListAppState>(
    'vinculacao-usuario-list-app'
);

export const getAppState: any = createSelector(
    getVinculacaoUsuarioListAppState,
    (state: VinculacaoUsuarioListAppState) => state
);

export const reducers: ActionReducerMap<VinculacaoUsuarioListAppState> = {
    vinculacaoUsuarioList: VinculacaoUsuarioListReducer
};

export * from './vinculacao-usuario-list.reducer';
